'use client';
import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, LineChart, Line,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { chartAnimation, fadeIn } from 'app/constants/animations';
import { MotionDiv } from './shared/MotionComponent';
import { AnimationProvider } from 'app/providers/AnimationProvider';
import { saving, Days, Month } from 'app/data/store';
import useChartData from 'app/data/chartdata';

export default function EarningsChart() {
  const [chartType, setChartType] = useState<'area' | 'bar' | 'line'>('area'); // State to manage chart type
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day'); // State for time range
  const data = useChartData();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  console.log(data)
  // Data loader with filtering based on time range
  useEffect(() => {
    let transformedData = saving.flatMap((month: Month) =>
      month.days.map((day: Days) => ({
        date: `${month.name} ${day.date}`, // Format date
        earnings: day.finalPrice - day.initialPrice, // Calculate earnings
        transactions: day.transactions + 10 || 0, // Transactions count
      }))
    );

    // Filter data based on selected time range
    if (timeRange === 'week') {
      transformedData = transformedData.slice(-7); // Last 7 days
    } else if (timeRange === 'month') {
      transformedData = transformedData.slice(-30); // Last 30 days
    } else if (timeRange === 'year') {
      transformedData = transformedData.slice(-365); // Last 365 days
    }

    setIsLoading(false); // Set loading to false once data is ready
  }, [timeRange]);

  // Handle chart type change
  const handleChartTypeChange = (type: 'area' | 'bar' | 'line') => {
    setChartType(type);
  };

  // Handle time range change
  const handleTimeRangeChange = (range: 'day' | 'week' | 'month' | 'year') => {
    setTimeRange(range);
  };

  // If the data is still loading, show a placeholder
  if (isLoading) {
    return <div className="h-[400px] flex items-center justify-center">Loading...</div>;
  }

  return (
    <AnimationProvider>
      <MotionDiv variants={fadeIn} className="space-y-4 sm:space-y-6">
        {/* Chart Type Switcher */}
        <div className="flex justify-center space-x-4">
          {['area', 'bar', 'line'].map(type => (
            <button
              key={type}
              onClick={() => handleChartTypeChange(type as 'area' | 'bar' | 'line')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${chartType === type ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Chart
            </button>
          ))}
        </div>

        {/* Time Range Switcher */}
        <div className="flex justify-center space-x-4">
          {['day', 'week', 'month', 'year'].map(range => (
            <button
              key={range}
              onClick={() => handleTimeRangeChange(range as 'day' | 'week' | 'month' | 'year')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${timeRange === range ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Chart */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${chartType}-${timeRange}`}
            variants={chartAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-[300px] sm:h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="timestamp" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="#10B981"
                    fillOpacity={0.1}
                    fill="url(#earnings)"
                    name="Earnings"
                  />
                  <Area
                    type="monotone"
                    dataKey="transactions"
                    stroke="#0000FF"  // Red stroke color
                    fill="#0000FF"    // Red fill color
                    fillOpacity={0.1} // Make fill slightly transparent for a better effect
                    filter="url(#blurEffect)"  // Apply blur filter
                    name="transactions"
                  />
                </AreaChart>
              ) : chartType === 'bar' ? (
                <BarChart data={data}>
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }} />
                  <Legend />
                  <Bar dataKey="earnings" name="Earnings" fill="#10B981" />
                </BarChart>
              ) : (
                <LineChart data={data}>
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="Earnings"
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </MotionDiv>
    </AnimationProvider>
  );
}
