'use client'

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useState } from 'react'
// const chartData = [{ month: 'january', desktop: 1260 }]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function RadialStacked({ percentage = 60, title = '' }) {
  const [chartData] = useState([
    { month: 'january', desktop: percentage, mobile: 100 - percentage },
  ])
  //   const totalVisitors = chartData[0].desktop

  return (
    <ChartContainer config={chartConfig} className='mx-auto aspect-square'>
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className='fill-foreground text-2xl font-bold'
                    >
                      {`${percentage}%`}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className='fill-muted-foreground'
                    >
                      {title}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey='desktop'
          stackId='a'
          cornerRadius={5}
          fill='var(--color-desktop)'
          className='stroke-transparent stroke-2'
        />
        <RadialBar
          dataKey='mobile'
          fill='var(--color-mobile)'
          stackId='a'
          cornerRadius={5}
          className='stroke-transparent stroke-2'
        />
      </RadialBarChart>
    </ChartContainer>
  )
}
