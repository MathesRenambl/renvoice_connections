import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

function WaitingList() {
  return (
   <section className="w-full my-10 md:my-14 py-12 bg-primary text-primary-foreground ">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our waitlist to be among the first to experience the power
                of AI telephonic agents
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                variant="outline"
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link href="">Join Waitlist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default WaitingList
