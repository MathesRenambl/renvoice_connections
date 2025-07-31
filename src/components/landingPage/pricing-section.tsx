import React from 'react'
import { PricingCalculator } from '../landing/pricing-calculator'

function PricingSection() {
  return (
        
     <section className="w-full   glass-morphism py-10">
      
            <div className="container md:px-4 mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Estimate Your Cost!</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Adjust your usage, LLM, engine, and telephony to see real time pricing for our AI voice agent solution.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                
                <PricingCalculator/>
              </div>
            </div>
          </section>
  )
}

export default PricingSection

