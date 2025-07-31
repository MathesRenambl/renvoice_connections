import React from 'react'
import FeatureCard from './feature-card'
import { BarChart3, LayoutGrid, Phone } from 'lucide-react'

function FeatureSection() {
  return (
    <div id='features'>
        <section className="w-full py-20  bg-muted/40">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to build powerful AI agents with telephonic capabilities
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <FeatureCard
              icon={<Phone  className="h-6 w-6 text-white " />}
              title="AI Agents via Telephonic Interface"
              description="Enable users to create and configure AI agents that interact via phone numbers with various built-in roles and utilities."
            />
            <FeatureCard
              icon={<LayoutGrid className="h-6 w-6 text-white" />}
              title="Agentic Workflow Editor"
              description="A visual editor for building logic and behavior of agents using node-based flows (like N8N or Zapier)."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-white" />}
              title="Analytics Dashboard"
              description="Track and monitor your AI agents' performance and engagement through interactive visualizations."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeatureSection
