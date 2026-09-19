import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { Card } from '@/components/ui/Card';

interface PerformanceChartProps {
  type?: 'bar' | 'line';
  title: string;
  data: { name: string; value: number; color?: string }[];
  yLabel?: string;
  className?: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  type = 'bar',
  title,
  data,
  yLabel = '%',
  className,
}) => {
  return (
    <Card className={className}>
      <h4 className="text-base font-bold text-brand-text-primary mb-4">{title}</h4>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6EAF0" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#667085', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#E6EAF0' }}
              />
              <YAxis
                unit={yLabel}
                domain={[0, 100]}
                tick={{ fill: '#667085', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E6EAF0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              />
              <Bar dataKey="value" fill="#7C4DFF" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6EAF0" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#667085', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#E6EAF0' }}
              />
              <YAxis
                unit={yLabel}
                domain={[50, 100]}
                tick={{ fill: '#667085', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E6EAF0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#FFC800"
                strokeWidth={3}
                dot={{ fill: '#172033', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
