import { useEffect, useState } from 'react';
import { useCoinPriceDetails } from './coinPriceDetails';

// Interface for the data structure
interface EarningData {
    timestamp: string; // Timestamp in milliseconds (current time)
    earnings: number; // Earnings value
    transactions: number; // Number of transactions
}

// Function to generate data for charting
interface ChartDataOptions {
    userId?: string;
}

const useChartData = (options?: ChartDataOptions): EarningData[] => {
    const userId = options?.userId;
    const [data, setData] = useState<EarningData[]>([]); // Store chart data
    const { mergedCoins } = useCoinPriceDetails();

    const [startTime] = useState(new Date()); // Track the start time

    // Function to calculate and add data
    const generateData = () => {
        // Calculate total balance (investment + profit for all coins)
        const totalBalance = mergedCoins.reduce(
            (acc: number, coin: { totalInvestment: number; profit: number }) =>
                acc + coin.totalInvestment + coin.profit,
            0
        );

        // Format the total balance to 2 decimal places
        const formattedTotalBalance = parseFloat(totalBalance.toFixed(5));

        // Calculate total number of transactions (count of transactions across all coins)
        const totalTransactions = mergedCoins
            .flatMap((coin) => coin.transactions?.length || 0) // Count the number of transactions
            .reduce((acc, count) => acc + count, 0); // Sum the number of transactions

        // Create new data entry with additional details
        const newDataPoint: EarningData = {
            timestamp: new Date().toLocaleTimeString(), // Current time for the timestamp
            earnings: formattedTotalBalance, // Total balance as earnings
            transactions: totalTransactions, // Just the count of transactions (integer)
        };

        // Update the data state with the new data point
        setData((prevData) => {
            const updatedData = [...prevData, newDataPoint];

            // Keep last 10 data points in memory
            if (updatedData.length >= 10) {
                return updatedData.slice(-10); // Keep the last 10 data points
            }
            return updatedData;
        });
    };

    useEffect(() => {
        // Run immediately on the first load
        generateData();

        // Set up the interval for subsequent updates
        const intervalId = setInterval(() => {
            generateData();
        }, 10000); // Update every 10 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [ mergedCoins, userId]); // Re-run if mergedCoins or userId changes

    return data;
};

export default useChartData;
