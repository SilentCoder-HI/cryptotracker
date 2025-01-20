import { useEffect, useState, useCallback } from 'react';
import { ImportGraphData } from '@components/actions/useraction';

// Interface for the data structure
type EarningData = {
    timestamp: string; // Timestamp in milliseconds (current time)
    earnings: number;
    transactions: number;
};

// Interface for the graph data structure
interface GraphData {
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

const useChartData = ({ timestamp }: { timestamp: string }) => {
    const [data, setData] = useState<EarningData[]>([
        {
            timestamp,
            earnings: Math.floor(Math.random() * 500),
            transactions: Math.floor(Math.random() * 500)
        },
        {
            timestamp,
            earnings: Math.floor(Math.random() * 500),
            transactions: Math.floor(Math.random() * 500)
        },
        {
            timestamp,
            earnings: Math.floor(Math.random() * 500),
            transactions: Math.floor(Math.random() * 500)
        },
        {
            timestamp,
            earnings: Math.floor(Math.random() * 500),
            transactions: Math.floor(Math.random() * 500)
        }
    ]); // Initially empty data
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const userid = "user123";

    const fetchGraphData = useCallback(async () => {
        try {
            const response: GraphData | null = await ImportGraphData(userid);
            if (response) {
                setGraphData(response);
            }
        } catch (error) {
            console.error("Error fetching graph data", error);
        }
    }, [userid]);

    useEffect(() => {
        fetchGraphData(); // Fetch data on component mount
    }, [fetchGraphData]);

    // Calculate the range (in days) based on the 'timestamp' prop value
    const getRangeInDays = (range: string): number => {
        switch (range) {
            case 'Day': return 2;       // 1 day
            case 'Week': return 7;      // 7 days
            case '1M': return 30;      // 30 days
            case '6M': return 180;     // 6 months
            case 'Year': return 365;   // 1 year
            default: return 30;        // Default to 30 days if no valid range
        }
    };

    // Function to filter data based on the range
    const filterDataByRange = (data: EarningData[], rangeInDays: number): EarningData[] => {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Set the time part to 00:00:00 to ensure we're comparing dates without time interference

        return data.filter((entry) => {
            const entryDate = new Date(entry.timestamp);
            entryDate.setHours(0, 0, 0, 0); // Set the time part of the entry date to 00:00:00 as well

            const diff = now.getTime() - entryDate.getTime();
            return diff <= rangeInDays * 24 * 60 * 60 * 1000; // Include entries that fall within the range
        });
    };

    // Generate the chart data based on the current graph data
    const generateData = useCallback(() => {
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

        const dailyEarnings: EarningData[] = Object.values(combinedData).map((dataPoint) => ({
            timestamp: dataPoint.date, // Use the actual date as the timestamp
            earnings: dataPoint.amount, // Total cumulative earnings
            transactions: dataPoint.add === 0 ? dataPoint.add : dataPoint.add - 0.05, // Number of transactions so far
        }));

        const rangeInDays = getRangeInDays(timestamp); // Get the range in days based on the timestamp prop
        const filteredData = filterDataByRange(dailyEarnings, rangeInDays); // Filter the data based on the time range

        setData(filteredData); // Update the data state with the filtered data
    }, [graphData, timestamp]);

    useEffect(() => {
        generateData(); // Run immediately on the first load

        const intervalId = setInterval(generateData, 60000); // Set up the interval for subsequent updates
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [generateData]); // Re-run if generateData changes

    return data;
};

export default useChartData;
