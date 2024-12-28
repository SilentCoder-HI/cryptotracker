import { useState, useEffect } from 'react';
import { holdings } from './holdings';  // Assuming holdings is imported here
import { useCoins } from '../(Dashboard)/hook/useCoins';

export const useCoinPriceDetails = () => {
    const { coins, loading, error } = useCoins();  // Fetch data using useCoins
    const [mergedData, setMergedData] = useState([]); // Manage merged data

    // Function to calculate profit/loss
    const calculateProfitLoss = (holding: { date: string; amount: number; price: number; }[] | undefined, currentPrice: number) => {
        let totalInvestment = 0;
        let totalAmount = 0;
        if (holding) {
            holding.forEach((item) => {
                totalInvestment += item.amount * item.price;
                totalAmount += item.amount;
            });
        }
        const profitLoss = (currentPrice * totalAmount) - totalInvestment;
        return profitLoss;
    };

    const calculateInvestment = (holding: { date: string; amount: number; price: number; }[] | undefined) => {
        let totalInvestment = 0;
        if (holding) {
            holding.forEach((item) => {
                totalInvestment += item.amount * item.price;
            });
        }
        return totalInvestment;
    };

    useEffect(() => {
        // Function to update the merged data
        const dataUpdate = () => {
            const newMergedData = [];

            holdings.forEach(holding => {
                if (!holding.transactions || holding.transactions.length === 0) {
                    console.warn(`No transactions found for holding: ${JSON.stringify(holding)}`);
                    return; // Skip if no transactions
                }

                // Find the coin from the API data
                const coinFromAPI = coins[holding.symbol.toLowerCase()];

                if (!coinFromAPI) {
                    console.warn(`Coin data not found for symbol: ${holding.symbol}`);
                    return; // Skip if no coin data found
                }

                // Extract current price from the API response (assuming `usd` is the field you need)
                const currentPrice = coinFromAPI?.usd || 0;

                // Calculate profit/loss and total investment
                const profitLoss = calculateProfitLoss(holding.transactions, currentPrice);
                const totalInvestment = calculateInvestment(holding.transactions);

                // Merge the coin data with the holding data
                const newCoinObject = {
                    current_price: currentPrice,
                    image: holding.image,
                    id: holding.id,
                    amount: holding.transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
                    name: holding.name,
                    symbol: holding.symbol,
                    totalInvestment: totalInvestment,
                    transactions: holding.transactions,
                    profit: profitLoss,
                };

                // Add the merged data to the new array
                newMergedData.push(newCoinObject);
            });

            // Update the merged data state
            setMergedData(newMergedData);
        };

        // Initial data fetch
        dataUpdate();

        // Interval for fetching data every 30 seconds (30000 milliseconds)
        const interval = setInterval(() => {
            dataUpdate(); // Update merged data
        }, 30000); // 30 seconds interval

        // Cleanup the interval on component unmount or when coins change
        return () => clearInterval(interval);
    }, [coins]); // Re-run when coins change

    return { mergedCoins: mergedData, loading, error };
};
