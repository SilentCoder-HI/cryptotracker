import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCoinPriceDetails } from 'app/data/coinPriceDetails';


const RecentTransactions: React.FC = () => {
    const { mergedCoins, loading: initialLoading, error } = useCoinPriceDetails();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const transactions = mergedCoins
        .flatMap((coin) =>
            coin.transactions?.map((transaction) => ({
                description: `Bought ${transaction.amount} ${coin.name?.toUpperCase() || 'UNKNOWN'} @ $${transaction.price?.toFixed(2) || 'N/A'}`,
                date: transaction.date || 'Unknown Date',
            })) || []
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

    // Simulate loading for 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Stop loading after 2 seconds
        }, 2000); // 2-second delay

        return () => clearTimeout(timer); // Cleanup timer
    }, []);

    return (
        <motion.div
            className="bg-gray-800 shadow-lg w-full max-w-3xl mx-auto h-auto rounded-lg p-6 md:p-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
            <motion.ul
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                {loading ? (
                    // Loading effect with skeleton loader
                    Array.from({ length: 5 }).map((_, index) => (
                        <motion.li
                            key={index}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-900 rounded-md shadow-lg animate-pulse"
                        >
                            <div className="h-4 bg-gray-700 rounded w-64 mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-32"></div>
                        </motion.li>
                    ))
                ) : transactions.length > 0 ? (
                    // Display transactions
                    paginatedTransactions.map((transaction, index) => (
                        <motion.li
                            key={`${transaction.description}-${index}`}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-900 rounded-md shadow-lg hover:bg-gray-700 transition-all"
                            initial={{ scale: 0.95 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="text-white font-medium">{transaction.description}</div>
                            <div className="text-green-200 text-sm mt-2 md:mt-0">{transaction.date}</div>
                        </motion.li>
                    ))
                ) : error && (
                    // No transactions available
                    <motion.li
                        className="text-white text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        No recent transactions found.
                    </motion.li>
                )}
            </motion.ul>

            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-all`}
                    aria-label="Previous Page"
                >
                    Previous
                </button>
                <span className="text-white text-sm md:text-base">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-all`}
                    aria-label="Next Page"
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
};

export default RecentTransactions;
