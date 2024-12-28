import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCoinPriceDetails } from 'app/data/coinPriceDetails'; // Import the custom hook for coin details
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Coins: React.FC = () => {
    const { mergedCoins, loading, error } = useCoinPriceDetails(); // Get coin data from the custom hook
    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 5;
    const [showFilterModal, setShowFilterModal] = useState(false); // State to control filter modal visibility
    const [filter, setFilter] = useState({
        price: '',
        amount: '',
        profitLoss: '',
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error}</div>;


    // Calculate which coins to display on the current page
    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = mergedCoins.slice(indexOfFirstCoin, indexOfLastCoin);


    // Pagination handlers
    const nextPage = () => {
        if (currentPage < Math.ceil(mergedCoins.length / coinsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <motion.div
            className="p-6 bg-gray-800 rounded-lg shadow-lg w-3/4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Cryptocurrency Holdings</h2>
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                        icon={faFilter}
                        className="text-white cursor-pointer"
                        onClick={() => setShowFilterModal(true)}
                    />
                    {/* Filter Modal */}
                    {showFilterModal && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-1/3">
                                <h3 className="text-2xl font-semibold mb-4">Filter Coins</h3>
                                <form>
                                    <div className="mb-4">
                                        <label className="block">Max Price</label>
                                        <input
                                            type="number"
                                            value={filter.price}
                                            onChange={(e) => setFilter({ ...filter, price: e.target.value })}
                                            className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                                            placeholder="Enter max price"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block">Min Amount</label>
                                        <input
                                            type="number"
                                            value={filter.amount}
                                            onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
                                            className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                                            placeholder="Enter minimum amount"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block">Min Profit/Loss</label>
                                        <input
                                            type="number"
                                            value={filter.profitLoss}
                                            onChange={(e) => setFilter({ ...filter, profitLoss: e.target.value })}
                                            className=" text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                                            placeholder="Enter minimum profit/loss"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowFilterModal(false)}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowFilterModal(false)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <table className="min-w-full bg-gray-900 rounded-lg text-center">
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className="p-4">Coin</th>
                        <th className="p-4">Current Price</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Profit/Loss</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCoins.length > 0 ? currentCoins.map((coin) => {
                        const profitLoss = coin.profit;
                        const profitLossColor = profitLoss >= 0 ? 'text-green-400' : 'text-red-400';
                        const formattedProfitLoss = profitLoss !== null ? profitLoss.toFixed(5) : 'N/A';

                        return (
                            <tr key={coin.id} className="border-b border-gray-600">
                                <td className="p-4 flex items-center">
                                    <img
                                        src={coin.image || 'https://example.com/fallback-image-url.png'} // Fallback image
                                        alt={coin.name}
                                        className="w-10 h-10 rounded-full object-cover mr-2"
                                    />
                                    <span className="text-white">{coin.name}</span>
                                </td>
                                <td className="p-4 text-white">${coin.current_price || 'N/A'}</td>
                                <td className="p-4 text-white">{coin.amount || 0}</td>
                                <td className={`p-4 ${profitLossColor}`}>
                                    {formattedProfitLoss < 0 ? (formattedProfitLoss * -1) : formattedProfitLoss}
                                </td>
                            </tr>
                        );
                    }) : (
                        <tr>
                            <td colSpan={4} className="p-4 text-center text-white">No holding coins available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={prevPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-white">
                    Page {currentPage} of {Math.ceil(mergedCoins.length / coinsPerPage)}
                </span>
                <button
                    onClick={nextPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    disabled={currentPage === Math.ceil(mergedCoins.length / coinsPerPage)}
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
};

export default Coins;
