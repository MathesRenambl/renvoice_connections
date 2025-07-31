'use client'

import { ReactNode } from 'react'
import { Legend, TooltipProps } from 'recharts'

export type ChartConfig = Record<
  string,
  {
    label: string
    color: string
  }
>

// Container that injects chart colors into CSS variables
export function ChartContainer({
  children,
  config,
}: {
  children: ReactNode
  config: ChartConfig
}) {
  const cssVars: Record<string, string> = {}

  Object.entries(config).forEach(([key, value], index) => {
    cssVars[`--color-${key}`] = value.color
  })

  return <div style={cssVars as React.CSSProperties}>{children}</div>
}

// Legend wrapper (pass as `content={<ChartLegendContent />}` inside <Legend />)
export const ChartLegend = Legend

export const ChartLegendContent = ({ payload }: { payload?: any[] }) => (
  <ul className="space-y-1">
    {payload?.map((entry, index) => (
      <li key={`item-${index}`} className="flex items-center space-x-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-sm text-gray-600">{entry.value}</span>
      </li>
    ))}
  </ul>
)

// Custom tooltip used in your chart
export const ChartTooltipContent = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.name}:</span>
            <span className="text-sm font-medium text-gray-800">
              {entry.name === 'Duration (min)' ? `${entry.value} min` : entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}
