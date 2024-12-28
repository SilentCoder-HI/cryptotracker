import { useState, useEffect } from 'react';

interface Coin {
    amount: number;
    totalInvestment: number;
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    image: string;
    transactions: { date: string; amount: number; price: number }[];
}

export const useFetchCoins = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=pepe,bonk,wink,tether,terra-luna,FLOKI,1000sats-ordinals,shiba-inu,bittorrent,peanut-the-squirrel,dogecoin,measurable-data-token,amber&vs_currencies=usd'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCoins(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch
        fetchCoins();

        // Set up interval for fetching data every 30 seconds (30000 milliseconds)
        const interval = setInterval(() => {
            fetchCoins();
        }, 30000); // 30 seconds interval

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return { coins, loading, error };
};

export const useCoins = () => {
    const { coins, loading, error } = useFetchCoins();
    return { coins, loading, error };
};
