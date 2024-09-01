import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface StackedBarChartProps {
  data: { [key: string]: any }[];
  categories: string[];
  colors: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

/**
 * StackedBarChart component
 * @param param.data
 * @param param.categories
 * @param param.colors
 * @param param.xAxisLabel
 * @param param.yAxisLabel
 * @returns
 */
export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  categories,
  colors,
  xAxisLabel,
  yAxisLabel,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          label={{
            value: xAxisLabel,
            position: "insideBottomRight",
            offset: 0,
          }}
          style={{ fontSize: 12 }}
        />
        <YAxis
          label={{
            value: yAxisLabel,
            angle: -90,
            position: "insideLeft",
            offset: -10,
          }}
          style={{ fontSize: 12 }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {categories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            stackId="a"
            fill={colors[index]}
            fontSize={12}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
