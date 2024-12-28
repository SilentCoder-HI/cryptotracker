import React, { useState } from 'react';
import { useCoins } from '../../hook/useCoins'; // Importing the useCoins hook
import { motion } from 'framer-motion';

// Define the structure for crypto details
interface Coin {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    image: string; // Coin image URL from API
    transactions: { date: string; amount: number }[]; // Added transactions property
}

const Coins: React.FC = () => {
    const [selectedCrypto, setSelectedCrypto] = useState<Coin | null>(null);

    const coinsPerPage = 10; // Define how many coins to display per page
    const currentPage = 1; // Current page number
    const { coins, loading, error } = useCoins(coinsPerPage, currentPage); // Using the useCoins hook

    // Handle crypto card click
    const handleCryptoClick = (crypto: Coin) => { // Change type to Coin
        // Toggle selection: If the same crypto is clicked, hide transactions, else show them
        setSelectedCrypto(crypto === selectedCrypto ? null : crypto);
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <h2 className="text-3xl font-bold mb-4 text-center text-indigo-400">Crypto Holdings</h2>

            <div className="flex flex-col gap-6">
                {loading && <p className="text-white">Loading coins...</p>} {/* Loading state */}
                {error && <p className="text-red-500">{error}</p>} {/* Error state */}
                {coins.map((crypto) => (
                    <div key={crypto.name}>
                        <motion.div
                            className="bg-gray-800 flex justify-between py-8 px-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-700"
                            onClick={() => handleCryptoClick(crypto)}
                            whileHover={{ scale: 1.05 }} // Scale animation on hover
                            transition={{ duration: 0.3 }}
                        >
                            <div className='flex'>
                                <img src={crypto.image || 'fallback-image-url.png'} alt={crypto.name} /> {/* Fallback image */}
                                <h3 className="text-xl font-semibold text-white">{crypto.name}</h3>
                            </div>
                            <p className="text-gray-300">Price: ${crypto.current_price.toLocaleString()}</p>
                        </motion.div>

                        {/* Display transaction details only for the selected crypto */}
                        {selectedCrypto && selectedCrypto.name === crypto.name && (
                            <motion.div
                                className="bg-gray-900 p-4 rounded-lg shadow-md mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-xl font-semibold text-white">{crypto.name} Transactions</h3>
                                <ul className="text-gray-300">
                                    {crypto.transactions.map((transaction: { date: string; amount: number }, index: number) => (
                                        <motion.li
                                            key={index}
                                            className="border-b border-gray-700 py-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: index * 0.2 }}
                                        >
                                            Date: {transaction.date} | Amount: {transaction.amount}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Coins;
