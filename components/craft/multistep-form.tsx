"use client";

import { ReactNode, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  description: string;
}

const STEPS: Step[] = [
  {
    label: "Step 1",
    description:
      "This is the first step of the form. Usually, this step collects basic information from the user.",
  },
  {
    label: "Step 2",
    description:
      "This is the second step of the form. This step usually collects more detailed information from the user.",
  },
  {
    label: "Step 3",
    description:
      "This is the third step of the form. This step usually collects additional information from the user.",
  },
];

function renderXOffset(currentStep: number, index: number) {
  if (index > currentStep) return "110%";
  if (index < currentStep) return "-110%";
  return "0%";
}

export function MultiStepForm() {
  const prefersReducedMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="bg-foreground flex size-full items-center justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl ring-1 ring-[#E4E5E7]">
        <div className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-6">
          <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />
          <div className="flex flex-col items-center justify-between gap-5 sm:gap-12">
            <div className="grid">
              {STEPS.map((_, index) => {
                const isActive = index === currentStep;
                const xOffset = renderXOffset(currentStep, index);

                return (
                  <motion.div
                    key={index}
                    inert={!isActive}
                    aria-hidden={!isActive}
                    className="col-start-1 row-start-1"
                    initial={false}
                    animate={
                      isActive
                        ? { x: "0%", opacity: 1, visibility: "visible" }
                        : {
                            x: prefersReducedMotion ? "0%" : xOffset,
                            opacity: 0,
                            transitionEnd: { visibility: "hidden" },
                          }
                    }
                    transition={
                      prefersReducedMotion ? {} : { duration: 0.5, type: "spring", bounce: 0 }
                    }
                  >
                    {renderStepContent(index)}
                  </motion.div>
                );
              })}
            </div>

            <div className="flex w-full items-center justify-between">
              <button
                className="text-background cursor-pointer rounded-full border border-[#E4E5E7] px-4 py-1.5 text-xs transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:py-2 sm:text-sm"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
              >
                Back
              </button>

              <button
                className="cursor-pointer rounded-full bg-purple-600 px-7 py-1.5 text-xs font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:px-10 sm:py-2 sm:text-sm"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === STEPS.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepLayoutProps {
  step: Step;
  children: ReactNode;
}

function StepLayout({ step, children }: StepLayoutProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-5">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h2 className="text-background text-sm leading-none font-semibold sm:text-base">
          {step.label}
        </h2>
        <p className="text-muted-inverse text-xs sm:text-base">{step.description}</p>
      </div>
      <div className="flex flex-col gap-1.5 sm:gap-2">{children}</div>
    </div>
  );
}

function renderStepContent(currentStep: number) {
  const step = STEPS[currentStep];

  if (currentStep === 0) {
    return (
      <StepLayout step={step}>
        <Skeleton />
        <Skeleton />
        <Skeleton style={{ width: "50%" }} />
      </StepLayout>
    );
  }

  if (currentStep === 1) {
    return (
      <StepLayout step={step}>
        <Skeleton style={{ width: "85%" }} />
        <Skeleton style={{ width: "65%" }} />
        <Skeleton style={{ width: "92%" }} />
        <Skeleton className="hidden sm:block" style={{ width: "72%" }} />
      </StepLayout>
    );
  }

  if (currentStep === 2) {
    return (
      <StepLayout step={step}>
        <Skeleton style={{ width: "70%" }} />
        <Skeleton style={{ width: "95%" }} />
        <Skeleton style={{ width: "80%" }} />
      </StepLayout>
    );
  }
}

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const fillAmount = Math.min(((currentStep + 1) / totalSteps) * 100, 100); // +1 to account for 0-based index

  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full">
      <div
        className="absolute inset-y-0 z-2 rounded-full bg-zinc-300 transition-[width] duration-350 ease-[ease] motion-reduce:duration-0"
        style={{ width: `${fillAmount}%` }}
      />
      <div className="absolute inset-0 bg-[#F4F4F5]" />
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn("h-3 animate-pulse rounded-md bg-[#F2F1F0] sm:h-4", className)}
      style={{ width: "100%", ...style }}
    />
  );
}
