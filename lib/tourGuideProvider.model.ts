export interface ITourGuide {
    addStep: (step: any) => void;
    addSteps: (steps: any[]) => void;
    setConfigs: (configs: any) => void
    startTour: () => void;
    destroy: () => void;
    refresh: () => void
    clearSteps: () => void
}

export interface IStep {
    element: HTMLDivElement | null;
    stepId: string
}

export interface ILocalStep {
    id: string;
    title: string;
    description: string;
    isVisited?: boolean
}
export interface TourGuideContainer {
    nextBtnTitle: string;
    prevBtnTitle: string;
    doneBtnTitle: string;
    steps: ILocalStep[]
}