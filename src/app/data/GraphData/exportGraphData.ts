"use client";
import { useState, useEffect } from "react";
import { useCoinPriceDetails } from "../coinPriceDetails";
// import { saveGraphValues } from "@components/actions/useraction";

const MAX_ARRAY_SIZE = 5;

interface GraphData {
    date: string;
    amount: number;
}

const UseGraphData = () => {
    const { mergedCoins = [] } = useCoinPriceDetails();
    const totalBalance = mergedCoins.reduce(
        (acc, coin) => acc + coin.totalInvestment + coin.profit,
        0
    );
    const [graphValues, setGraphValues] = useState<GraphData[]>([]);
    console.log(graphValues)
    useEffect(() => {
        if (totalBalance !== undefined) {
            console.log("Current total balance:", totalBalance);

            const interval = setInterval(() => {
                const dateNow = new Date().toISOString(); // Get current date and time in ISO format

                setGraphValues((prevValues) => {
                    const newValues = [
                        ...prevValues,
                        {
                            date: dateNow,
                            amount: totalBalance, // Use the `totalBalance` value
                        },
                    ];

                    if (newValues.length > MAX_ARRAY_SIZE) {
                        newValues.shift(); // Remove the oldest entry if the array exceeds the maximum size
                    }

                    return newValues;
                });
            }, 60000); // 60 seconds interval

            return () => clearInterval(interval); // Cleanup the interval on unmount
        } else {
            console.log("No total balance available");
        }
    }, [totalBalance]); // Re-run the effect when the `totalBalance` changes
};

export function exportGraphData(data: YourSpecificType) {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'graphData.json';
    a.click();
    URL.revokeObjectURL(url);
}

export default UseGraphData;
