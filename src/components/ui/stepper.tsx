import * as React from "react"
import { cn } from "@/lib/utils"

export type StepperContextValue = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  nextStep: () => void
  prevStep: () => void
  isNextDisabled: boolean
  isPrevDisabled: boolean
}

const StepperContext = React.createContext<StepperContextValue | undefined>(
  undefined
)

function useStepperContext() {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error("useStepperContext must be used within a StepperProvider")
  }
  return context
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  children?: React.ReactNode
}

// Define the type for the children element with setMaxSteps
type StepperChildProps = {
  setMaxSteps: React.Dispatch<React.SetStateAction<number>>
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      value,
      defaultValue = 1,
      onValueChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [step, setStep] = React.useState(value || defaultValue)
    const [maxSteps, setMaxSteps] = React.useState(1)

    const nextStep = React.useCallback(() => {
      if (step < maxSteps) {
        const next = step + 1
        setStep(next)
        onValueChange?.(next)
      }
    }, [step, maxSteps, onValueChange])

    const prevStep = React.useCallback(() => {
      if (step > 1) {
        const prev = step - 1
        setStep(prev)
        onValueChange?.(prev)
      }
    }, [step, onValueChange])

    React.useEffect(() => {
      if (value !== undefined && value !== step) {
        setStep(value)
      }
    }, [value, step])

    return (
      <StepperContext.Provider
        value={{
          step,
          setStep,
          nextStep,
          prevStep,
          isNextDisabled: step >= maxSteps,
          isPrevDisabled: step <= 1,
        }}
      >
        <div
          ref={ref}
          className={cn("flex flex-col space-y-4", className)}
          {...props}
        >
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<StepperChildProps>, {
                setMaxSteps,
              })
            : children}
        </div>
      </StepperContext.Provider>
    )
  }
)
Stepper.displayName = "Stepper"

// Define the possible states as a type
type StepperState = "completed" | "active" | "inactive"

interface StepperItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  step: number
  children?: React.ReactNode | ((props: { state: StepperState }) => React.ReactNode)
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ step, className, children, ...props }, ref) => {
    const { step: activeStep } = useStepperContext()

    let state: StepperState = "inactive"

    if (activeStep === step) {
      state = "active"
    } else if (activeStep > step) {
      state = "completed"
    }

    return (
      <div
        ref={ref}
        data-state={state}
        className={cn(
          "relative flex w-full flex-col items-center justify-center",
          className
        )}
        {...props}
      >
        {typeof children === "function" ? children({ state }) : children}
      </div>
    )
  }
)
StepperItem.displayName = "StepperItem"

const StepperSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted data-[state=completed]:bg-primary",
      className
    )}
    {...props}
  />
))
StepperSeparator.displayName = "StepperSeparator"

interface StepperTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const StepperTrigger = React.forwardRef<
  HTMLButtonElement,
  StepperTriggerProps
>(({ asChild = false  , className, children, ...props }, ref) => {
  if (asChild) {
    // When asChild is true, we expect children to be a single React element
    if (React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement,
        {
          ...props,
          // Do not pass ref here; it will be handled by React.forwardRef
        }
      )
    }
    // Fall back to standard button if children isn't a valid element
    console.warn("StepperTrigger with asChild prop expects a single React element child")
    return <button ref={ref} className={className} {...props}>{children}</button>
  }
  
  return <button ref={ref} className={className} {...props}>{children}</button>
})
StepperTrigger.displayName = "StepperTrigger"

const StepperTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-sm font-semibold transition lg:text-base data-[state=active]:text-primary",
        className
      )}
      {...props}
    />
  )
)
StepperTitle.displayName = "StepperTitle"

const StepperDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm data-[state=active]:text-primary",
      className
    )}
    {...props}
  />
))
StepperDescription.displayName = "StepperDescription"

export {
  Stepper,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
  StepperTitle,
  StepperDescription,
  useStepperContext,
}