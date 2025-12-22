"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

export const Chart = ({ used = 0 }: { used: number }) => {
  const percent = Number(calculatePercentage(used));
  const safePercent = Number.isFinite(percent) ? percent : 0;

  const chartData = [{ used: safePercent, fill: "white" }];

  return (
    <Card className="flex items-center rounded-xl bg-brand p-5 text-white md:flex-col xl:flex-row gap-0!">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-45 text-white xl:w-62.5"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={Number(calculatePercentage(used)) + 90}
            innerRadius={75}
            outerRadius={130}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-white/20 last:fill-brand"
              polarRadius={[86, 64]}
            />
            <RadialBar
              dataKey="used"
              background
              cornerRadius={10}
              isAnimationActive={false}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-4xl font-bold"
                        >
                          {used && calculatePercentage(used)
                            ? calculatePercentage(used).toString()
                            : "0"}
                          %
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white/70"
                        >
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardHeader className="w-full! xl:w-auto! text-center xl:text-left flex-1 items-start px-3 pt-4! py-0 sm:px-5 lg:p-3 xl:pr-5">
        <CardTitle className="h3 font-bold">Available Storage</CardTitle>
        <CardDescription className="subtitle-1 mt-0 lg:mt-2 w-full text-white/70">
          {used ? convertFileSize(used) : "2GB"} / 2 GB
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
