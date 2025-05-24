import { Config, Driver, driver } from "driver.js";
import "driver.js/dist/driver.css";
import type { ITourGuide } from "./tourGuideProvider.model";

export class TourGuideProvider {

    private tour: ITourGuide;
    private steps: Map<string, any[]> = new Map();
    private configs: {};
    private currentPageId: string | null = null;

    constructor(tour: ITourGuide) {
        this.tour = tour;
    }

    setCurrentComponent(componentId: string) {
        this.currentPageId = componentId;
        this.destroy();
        return this;
    }

    registerStep(step, componentId: string) {
        if (!step) return;

        if (!this.steps.has(componentId)) {
            this.steps.set(componentId, [])
        }


        const componentSteps = this.steps.get(componentId);

        const exists = componentSteps?.some(existingStep =>
            existingStep.element === step.element
        );
        if (!exists && componentSteps) {
            componentSteps.push(step);
        }
    }
    startTour() {
        if (!this.currentPageId) return;

        const currentSteps = this.steps.get(this.currentPageId) || [];
        this.clearStep();

        this.tour.addSteps(currentSteps);
        this.tour.startTour();
    }

    refresh() {
        this.tour.refresh();
    }
    destroy() {
        this.tour.destroy();
    }
    clearStep() {
        if (this.currentPageId) {

            this.tour.clearSteps();
            this.steps.set(this.currentPageId, []);
        }
    }

    setConfigs(configs: any) {
        this.tour.setConfigs(configs);
        return this;
    }
}


export class DriverTourGuideManager implements ITourGuide {

    private driver: Driver
    private steps: any[];

    constructor() {
        this.initDriver();
        this.steps = [];
    }

    private initDriver() {
        this.driver = driver({
            animate: false, // Disable animation initially
            allowClose: false,
            smoothScroll: false,
        });
    }

    addStep(step: any) {
        if (!this.steps?.find((stepItem) => stepItem.element === step.element)) {
            this.steps.push({ element: step.element, popover: { title: step.title, description: step.description } })
        }
    }

    refresh() {
        this.driver.refresh();
    }

    destroy() {
        this.driver.destroy();
    }

    addSteps(steps: any[]) {
        this.destroy();
        this.initDriver();
        steps.forEach(s => this.addStep(s));
    }

    startTour() {
        this.driver.setSteps(this.steps);
        this.driver.drive();
    }

    clearSteps() {
        this.steps = [];
    }
    setConfigs(configs: Config) {
        this.driver.setConfig({ ...configs });
    }
}