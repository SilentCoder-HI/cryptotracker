import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCoinPriceDetails } from 'app/data/coinPriceDetails'; // Import the custom hook for coin details

const RecentTransactions: React.FC = () => {
    const { mergedCoins, loading, error } = useCoinPriceDetails();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Display 5 items per page

    // Handle loading state
    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div className="text-center text-red-500">Error fetching data: {error}</div>;
    }

    // Extract and sort transactions by date
    const transactions = mergedCoins
        .flatMap((coin) =>
            coin.transactions?.map((transaction) => ({
                description: `Bought ${transaction.amount} ${coin.name?.toUpperCase() || 'UNKNOWN'} @ $${transaction.price?.toFixed(2) || 'N/A'}`,
                date: transaction.date || 'Unknown Date', // Ensures date is not undefined
            })) || []
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date (newest first)

    // Pagination logic
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const paginatedTransactions = transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <motion.div
            className="bg-gray-800 shadow-xl h-full rounded-lg p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
            <motion.ul
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((transaction) => (
                        <motion.li
                            key={transaction.description}
                            className="flex items-center justify-between p-4 bg-gray-900 rounded-md shadow-lg hover:bg-gray-700 transition-all"
                            initial={{ scale: 0.95 }}
                            whileHover={{ scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="text-white font-medium">{transaction.description}</div>
                            <div className="text-green-200 text-sm">{transaction.date}</div>
                        </motion.li>
                    ))
                ) : (
                    <li className="text-white text-center">No recent transactions found.</li>
                )}
            </motion.ul>

            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
                >
                    Previous
                </button>
                <span className="text-white">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
};

export default RecentTransactions;
