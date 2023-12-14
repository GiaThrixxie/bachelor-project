import React from "react";


//Custom hook for multistep forms

export function useMultistepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i; //if last step, do nothing
      return i + 1; //else, go to next step
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i; //if first step, do nothing
      return i - 1; //else, go to next step
    });
  }

  function goTo(index) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    isSecondToLastStep: currentStepIndex === steps.length - 2,
    next,
    back,
    goTo,
  };
}