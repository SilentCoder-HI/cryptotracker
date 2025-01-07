'use client';
import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, LineChart, Line,
} from 'recharts';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';
import { chartAnimation, fadeIn } from 'app/constants/animations';
import { MotionDiv } from './shared/MotionComponent';
import { AnimationProvider } from 'app/providers/AnimationProvider';
import useChartData from 'app/data/chartdata';

const chartTypeOptions = [
  { value: 'area', label: 'Area Chart' },
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Chart' },
];

const timeRangeOptions = [
  { value: 'Day', label: 'Day' },
  { value: 'Week', label: 'Week' },
  { value: '1M', label: '1 Month' },
  { value: '6M', label: '6 Months' },
  { value: 'Year', label: 'Year' },
];

export default function EarningsChart() {
  const [chartType, setChartType] = useState<'area' | 'bar' | 'line'>(
    localStorage.getItem('chartType') as 'area' | 'bar' | 'line' || 'area'
  );
  const [timeRange, setTimeRange] = useState<'Day' | 'Week' | '1M' | '6M' | 'Year'>(
    localStorage.getItem('timeRange') as 'Day' | 'Week' | '1M' | '6M' | 'Year' || 'Day'
  );
  const [showEarnings, setShowEarnings] = useState<boolean>(
    JSON.parse(localStorage.getItem('showEarnings') || 'true')
  );
  const [showTransactions, setShowTransactions] = useState<boolean>(
    JSON.parse(localStorage.getItem('showTransactions') || 'true')
  );

  const data = useChartData({ timestamp: timeRange });

  useEffect(() => {
    localStorage.setItem('chartType', chartType);
    localStorage.setItem('timeRange', timeRange);
    localStorage.setItem('showEarnings', JSON.stringify(showEarnings));
    localStorage.setItem('showTransactions', JSON.stringify(showTransactions));
  }, [chartType, timeRange, showEarnings, showTransactions]);

  // Calculate Y-Axis range based on data
  const getYAxisDomain = () => {
    if (!data || data.length === 0) return [0, 100];
    const allValues = data.flatMap((d) => [
      showEarnings ? d.earnings : null,
      showTransactions ? d.transactions : null,
    ]).filter((v) => v !== null);

    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    return [Math.floor(min), Math.ceil(max)];
  };

  const [yMin, yMax] = getYAxisDomain();

  // Custom function to limit the X-Axis ticks
  const formatXAxisTicks = (data: any[]) => {
    const length = data.length;
    return data.map((d, i) => {
      if (i === 0 || i === length - 1 || i % Math.ceil(length / 5) === 0) {
        return d.timestamp || d.date;
      }
      return '';
    });
  };

  // Render the chart based on the selected type
  const renderChart = () => {
    const formattedData = formatXAxisTicks(data || []);
    if (chartType === 'area') {
      return (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" tickFormatter={(tick, i) => formattedData[i]} stroke="#9CA3AF" />
          <YAxis domain={[yMin, yMax]} stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
          />
          <Legend />
          {showEarnings && (
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#10B981"
              fillOpacity={0.1}
              fill="url(#earnings)"
              name="Earnings"
            />
          )}
          {showTransactions && (
            <Area
              type="monotone"
              dataKey="transactions"
              stroke="#0000FF"
              fill="#0000FF"
              fillOpacity={0.1}
              name="Transactions"
            />
          )}
        </AreaChart>
      );
    }

    if (chartType === 'bar') {
      return (
        <BarChart data={data}>
          <XAxis dataKey="date" tickFormatter={(tick, i) => formattedData[i]} stroke="#9CA3AF" />
          <YAxis domain={[yMin, yMax]} stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
          />
          <Legend />
          {showEarnings && <Bar dataKey="earnings" name="Earnings" fill="#10B981" />}
          {showTransactions && <Bar dataKey="transactions" name="Transactions" fill="#0000FF" />}
        </BarChart>
      );
    }

    return (
      <LineChart data={data}>
        <XAxis dataKey="date" tickFormatter={(tick, i) => formattedData[i]} stroke="#9CA3AF" />
        <YAxis domain={[yMin, yMax]} stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
        />
        <Legend />
        {showEarnings && (
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#10B981"
            strokeWidth={3}
            name="Earnings"
          />
        )}
        {showTransactions && (
          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#0000FF"
            strokeWidth={3}
            name="Transactions"
          />
        )}
      </LineChart>
    );
  };
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#1F2937', // Dropdown background
      border: state.isFocused ? '2px solid #10B981' : '1px solid #4B5563', // Border color
      boxShadow: state.isFocused ? '0 0 4px #10B981' : 'none', // Shadow on focus
      borderRadius: '8px',
      padding: '2px',
      color: '#F3F4F6', // Text color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1F2937', // Dropdown options background
      borderRadius: '8px',
      padding: '4px',
      zIndex: 999, // Ensures dropdown stays above other elements
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#10B981' : state.isFocused ? '#374151' : '#1F2937', // Background on hover/selection
      color: state.isSelected ? '#F9FAFB' : '#D1D5DB', // Text color
      padding: '8px 12px',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#F3F4F6', // Selected value color
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9CA3AF', // Placeholder text color
    }),
  };
  return (
    <AnimationProvider>
      <MotionDiv variants={fadeIn} className="flex flex-col space-y-4 sm:space-y-6">
        <div className="flex justify-around">
          {/* Chart Type Switcher */}
          <div className="flex justify-around bg-gray-900 space-x-4 sm:space-x-8 items-center text-center">
            <label className="text-sm text-gray-300">Chart Type:</label>
            <Select
              options={chartTypeOptions}
              value={chartTypeOptions.find(option => option.value === chartType)}
              onChange={(option) => setChartType(option?.value || 'area')}
              styles={customSelectStyles}
              className="w-48"
            />
          </div>

          {/* Time Range Switcher */}
          <div className="flex justify-center space-x-4 sm:space-x-8 items-center text-center">
            <label className="text-sm text-gray-300">Time Range:</label>
            <Select
              options={timeRangeOptions}
              value={timeRangeOptions.find(option => option.value === timeRange)}
              onChange={(option) => setTimeRange(option?.value || 'Day')}
              className="w-48"
              styles={ customSelectStyles}
            />
          </div>
        </div>

        {/* Visibility Toggles */}
        <div className="flex justify-center space-x-8">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={showEarnings}
              onChange={() => setShowEarnings(!showEarnings)}
              className="mr-2"
            />
            <label className="text-gray-300">Show Earnings</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={showTransactions}
              onChange={() => setShowTransactions(!showTransactions)}
              className="mr-2"
            />
            <label className="text-gray-300">Show Transactions</label>
          </div>
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
              {renderChart()}
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </MotionDiv>
    </AnimationProvider>
  );
}
