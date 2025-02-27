import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCoinPriceDetails } from "app/data/coinPriceDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

type SortDirection = "asc" | "desc" | "normal";

const Coins: React.FC = () => {
    const { mergedCoins, loading: initialLoading, error } = useCoinPriceDetails();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("normal");

    const coinsPerPage = 5;

    const tableHeaders = [
        { label: "Coin", key: "name", sortable: true },
        { label: "Current Price", key: "current_price", sortable: true },
        { label: "Amount", key: "amount", sortable: true },
        { label: "Profit/Loss", key: "profit", sortable: true },
    ];

    const handleSort = (key: string) => {
        setSortDirection((prevDirection) => {
            if (sortColumn === key) {
                return prevDirection === "asc" ? "desc" : prevDirection === "desc" ? "normal" : "asc";
            }
            setSortColumn(key);
            return "asc";
        });
    };

    const sortedCoins = [...mergedCoins].sort((a, b) => {
        if (!sortColumn || sortDirection === "normal") return 0;

        const aValue = a[sortColumn] ?? "";
        const bValue = b[sortColumn] ?? "";

        if (typeof aValue === "string" && typeof bValue === "string") {
            return sortDirection === "asc"
                ? aValue.localeCompare(bValue, undefined, { sensitivity: "base" })
                : bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
    });
    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = sortedCoins.slice(indexOfFirstCoin, indexOfLastCoin);

    const totalPages = Math.ceil(mergedCoins.length / coinsPerPage);

    // Simulate loading for 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Stop loading after 2 seconds
        }, 2000); // 2-second delay

        return () => clearTimeout(timer); // Cleanup timer
    }, []);

    return (
        <motion.div
            className="p-6 flex flex-col gap-4 bg-gray-800 rounded-lg text-center shadow-lg w-full max-md:w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-semibold text-white">Cryptocurrency Holdings</h2>
            <div className="overflow-auto">
                <div className="min-w-max bg-gray-900 rounded-lg">
                    <div className="grid grid-cols-4 bg-gray-700 text-white">
                        {tableHeaders.map((header) => (
                            <div
                                key={header.key}
                                className="p-4 w-[160px] flex justify-center items-center cursor-pointer"
                                onClick={() => header.sortable && handleSort(header.key)}
                            >
                                <span>{header.label}</span>
                                <div className="flex flex-col w-4 h-full ml-2 relative">
                                    <FontAwesomeIcon
                                        icon={faCaretUp}
                                        className="absolute top-0"
                                        color={sortColumn === header.key && sortDirection === "asc" ? "green" : ""}
                                    />
                                    <FontAwesomeIcon
                                        icon={faCaretDown}
                                        className="absolute top-[6px]"
                                        color={sortColumn === header.key && sortDirection === "desc" ? "green" : ""}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        {loading && (
                            <div className="p-4">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-4 border-b border-gray-600 animate-pulse"
                                    >
                                        <div className="p-4 flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-700 mr-2"></div>
                                            <div className="h-4 bg-gray-700 rounded w-24"></div>
                                        </div>
                                        <div className="p-4">
                                            <div className="h-4 bg-gray-700 rounded w-16"></div>
                                        </div>
                                        <div className="p-4">
                                            <div className="h-4 bg-gray-700 rounded w-12"></div>
                                        </div>
                                        <div className="p-4">
                                            <div className="h-4 bg-gray-700 rounded w-16"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!loading && !error && currentCoins.length > 0 ? (
                            currentCoins.map((coin: { id: string, name: string, image: string, current_price: number, amount: number, profit: number }) => (
                                <div
                                    key={coin.id}
                                    className="grid grid-cols-4 border-b border-gray-600"
                                >
                                    <div className="p-4 flex items-center">
                                        <Image
                                            src={coin.image || "https://example.com/fallback-image-url.png"}
                                            alt={coin.name}
                                            className="w-10 h-10 rounded-full mr-2"
                                            width={40}
                                            height={40}
                                        />
                                        <span className="text-white">{coin.name}</span>
                                    </div>
                                    <div className="p-4 text-white">
                                        ${coin.current_price || "N/A"}
                                    </div>
                                    <div className="p-4 text-white">{coin.amount || 0}</div>
                                    <div
                                        className={`p-4 ${coin.profit >= 0 ? "text-green-400" : "text-red-400"
                                            }`}
                                    >
                                        {coin.profit?.toFixed(5) || "N/A"}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                {!loading && (
                                    <div className="p-4 text-white">No holdings available.</div>
                                )}
                            </>

                        )}
                    </div>

                </div>
            </div>


            <div className="flex justify-between mt-4 items-center">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span className="text-white flex items-center gap-2">
                    <button
                        className={`text-white w-10 h-10 bg-gray-900 p-2 hover:text-gray-400 focus:outline-none ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        {currentPage === 1 ? '' : currentPage - 1}
                    </button>

                    <span className="font-semibold bg-gray-900 p-2 w-10 h-10 text-center">{currentPage}</span>

                    <button
                        className="bg-gray-900 w-10 h-10 p-2 text-white hover:text-gray-400 focus:outline-none"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        {currentPage + 1}
                    </button>
                </span>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

        </motion.div>
    );
};

export default Coins;
