import { useState } from "react"

export const  useMultistepForm = (steps) =>  {
            const [currentStepIndex, setCurrentStepIndex] = useState(0)
            function next() {
              setCurrentStepIndex(i => {
                if (i >= steps.length - 1) return i
                return i + 1
              })
            }
            function back() {
              setCurrentStepIndex(i => {
                if (i <= 0) return i
                return i - 1
              })
            }
            function backfirst() {
              setCurrentStepIndex(0)
            }
            return {
              currentStepIndex,
              step: steps[currentStepIndex],
              steps,
              isFirstStep: currentStepIndex === 0,
              isLastStep: currentStepIndex === steps.length - 1,
              next,
              back,
              backfirst,
            }
          }