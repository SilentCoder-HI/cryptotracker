import { useState, useEffect } from 'react';

export const useFetchCoins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Constant array of coin IDs used in the API call
    const coinIds = [
        'bio-protocol', 'first-digital-usd', 'pepe', 'ethereum', 'solana', 
        'binancecoin', 'ripple', 'terra-luna-2', 'vechain', 'bonk', 'wink', 
        'tether', 'terra-luna', 'FLOKI', '1000sats-ordinals', 'shiba-inu', 
        'bittorrent', 'peanut-the-squirrel', 'adventure-gold', 'dogecoin', 
        'measurable-data-token', 'amber', 'the-open-network','bitcoin','aixbt'
        ,'chaingpt','chaingpt'
    ];

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd`
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
        }, 600000); // 600(s) = 10 MIN

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return { coins, loading, error };
};

export const useCoins = () => {
    const { coins, loading, error } = useFetchCoins();
    return { coins, loading, error };
};
