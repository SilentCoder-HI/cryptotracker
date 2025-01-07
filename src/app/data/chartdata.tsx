import { useEffect, useState } from 'react';
import { useCoinPriceDetails } from './coinPriceDetails';
import ImportGraphDataFunc from './GraphData/importGraphData';

// Interface for the data structure
type EarningData = {
    timestamp: string; // Timestamp in milliseconds (current time)
};

// Interface for the graph data structure
interface GraphData {
    _id: string;
    userId: string;
    months: {
        month: string;
        values: {
            amount: number;
            date: string;
            add: number;
        }[]; 
    }[];
}

interface data {
    value: {
        date: string;
        amount: number;
    }[];
}

const useChartData = ({ timestamp }: { timestamp: string }) => {
    const [data, setData] = useState<EarningData[]>([]); // Store chart data
    const [graphData, setGraphData] = useState<GraphData | null>(null);

    const Graphdata = ImportGraphDataFunc();
    useEffect(() => {
        setGraphData(Graphdata); // Assuming Graphdata is fetched here
    }, [Graphdata]);

    // Calculate the range (in days) based on the 'timestamp' prop value
    const getRangeInDays = (range: string): number => {
        switch (range) {
            case 'Day': return 1;       // 1 day
            case 'Week': return 7;       // 7 days
            case '1M': return 30;      // 30 days
            case '6M': return 180;     // 6 months
            case 'Year': return 365;     // 1 year
            default: return 30;        // Default to 30 days if no valid range
        }
    };

    // Function to filter data based on the range
    const filterDataByRange = (data: EarningData[], rangeInDays: number): EarningData[] => {
        const now = new Date();
        // Set the time part to 00:00:00 to ensure we're comparing dates without time interference
        now.setHours(0, 0, 0, 0);

        return data.filter((entry) => {
            const entryDate = new Date(entry.timestamp);
            // Set the time part of the entry date to 00:00:00 as well
            entryDate.setHours(0, 0, 0, 0);

            const diff = now.getTime() - entryDate.getTime();
            // Include entries that fall within the range
            return diff <= rangeInDays * 24 * 60 * 60 * 1000;
        });
    };

    // Generate the chart data based on the current graph data
    const generateData = () => {
        if (!graphData) return; // Ensure graphData is loaded

        const combinedData: { [key: string]: { amount: number; add: number; date: string } } = {};

        graphData.months.forEach((month) => {
            month.values.forEach((value) => {
                const { amount, add, date } = value;
                combinedData[date] = combinedData[date]
                    ? {
                        amount: combinedData[date].amount + amount,
                        add: combinedData[date].add + add,
                        date,
                    }
                    : { amount, add, date };
            });
        });

        const dailyEarnings: EarningData[] = Object.values(combinedData).map((dataPoint) => {
            return {
                timestamp: dataPoint.date, // Use the actual date as the timestamp
                earnings: dataPoint.amount, // Total cumulative earnings
                transactions: dataPoint.add, // Number of transactions so far
            };
        });

        // Get the range in days based on the timestamp prop
        const rangeInDays = getRangeInDays(timestamp); // timestamp is passed as '1d', '1w', etc.

        // Filter the data based on the time range (e.g., 1 day, 1 week, etc.)
        const filteredData = filterDataByRange(dailyEarnings, rangeInDays);

        // Update the data state with the filtered data
        setData(filteredData);
    };

    useEffect(() => {
        // Run immediately on the first load
        generateData();

        // Set up the interval for subsequent updates
        const intervalId = setInterval(() => {
            generateData();
        }, 60000); // 1 MIN interval

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [graphData, timestamp]); // Re-run if graphData or timestamp changes

    console.log(data);
    return data;
};

export default useChartData;
