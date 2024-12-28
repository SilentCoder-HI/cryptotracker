import { useEffect, useState } from 'react';

// Interface for the data structure
interface EarningData {
    timestamp: string; // Timestamp in milliseconds (current time)
    earnings: number; // Earnings value
    transactions: number; // Number of transactions
}

// Function to generate and export data for charting
const useChartData = (): EarningData[] => {
    const [data, setData] = useState<EarningData[]>([]); // Store chart data
    const [earnings, setEarnings] = useState(10); // Starting earnings value (e.g., 10)
    const [startTime] = useState(new Date()); // Track the start time

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Calculate elapsed minutes
            const elapsedMinutes = Math.floor((new Date().getTime() - startTime.getTime()) / 10000);
            
            // Earnings increase by 1 every minute
            const newEarnings = earnings + elapsedMinutes; // Increment earnings based on elapsed time

            // Random transaction count generation
            const newTransactions = Math.floor(Math.random() * 50);

            // Create new data entry
            const newDataPoint: EarningData = {
                timestamp: new Date().toLocaleTimeString(), // Current time for the timestamp
                earnings: newEarnings+10,
                transactions: newTransactions,
            };

            // Update the data state with the new data point
            setData((prevData) => {
                const updatedData = [...prevData, newDataPoint];
                if (updatedData.length >= 10) {
                    // Send data (can be an API call or console log here)
                    console.log("Sending data:", updatedData);
                    // Keep last 10 data points in memory
                    return updatedData.slice(-10);
                }
                return updatedData;
            });
        }, 10000); // Update every minute

        // Cleanup function to clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [earnings, startTime]); // Dependencies are earnings and startTime

    return data;
};

export default useChartData;
