import { useEffect, useRef, useState } from "react";
import { DriverTourGuideManager, TourGuideProvider } from "./toudGuideProvider";
import { type TourGuideContainer, type ILocalStep, type IStep, type ITourGuide } from "./tourGuideProvider.model";
import type { DriveStep } from "driver.js";

export let localSteps: ILocalStep[] = [];
export let toureGuideInstance: TourGuideProvider;
export let onReadyTour: any



export const useTourGuideContainer = ({ steps, nextBtnTitle, prevBtnTitle, doneBtnTitle }: TourGuideContainer) => {
    const [tourInstance, setTourInstance] = useState<TourGuideProvider | null>(null);
    localSteps = steps;
    const onReadyTourHandlers = useRef<any[]>([]);

    onReadyTour = (cb) => {
        if (toureGuideInstance) {
            cb(toureGuideInstance);
        } else {

            onReadyTourHandlers.current.push(cb);
        }
    }
    useEffect(() => {
        toureGuideInstance = new TourGuideProvider(new DriverTourGuideManager()).setConfigs({
            animate: true,
            disableActiveInteraction: true,
            showButtons: ["previous", "next", "close"],
            showProgress: true,
            nextBtnText: nextBtnTitle,
            prevBtnText: prevBtnTitle,
            doneBtnText: doneBtnTitle,
            onHighlighted: (element, step: DriveStep, opts) => {
                toureGuideInstance.refresh();
                const currentStep = localSteps.find(localStep =>
                    localStep.title === step.popover?.title &&
                    localStep.description === step.popover?.description
                );

                if (currentStep) {
                    currentStep.isVisited = true;
                }


            },

        })

        setTourInstance(toureGuideInstance);


        onReadyTourHandlers.current.forEach(onReadyTourHanlder => onReadyTourHanlder(toureGuideInstance))
        return () => {
            toureGuideInstance.destroy();
        }
    }, [])
}


export const useTourGuide = (componentId: string) => {

    const registerSteps = (steps: IStep[]) => {
        onReadyTour((tourConfig: TourGuideProvider) => {
            tourConfig.setCurrentComponent(componentId);

            if (!localSteps.length) return;

            debugger
            tourConfig.destroy();
            const mappedSteps = steps.map((stepItem) => {
                const localStep = localSteps.find((localStepItem: ILocalStep) => localStepItem.id === stepItem.stepId && !localStepItem.isVisited);
                if (localStep) {
                    return { element: stepItem?.element, title: localStep?.title, description: localStep?.description }
                }
            })
            tourConfig.refresh();
            if (mappedSteps.length) {
                mappedSteps.forEach((step) => {
                    tourConfig.registerStep(step, componentId);
                });
                tourConfig.startTour();
            }
        })
    }

    return { registerSteps }
}