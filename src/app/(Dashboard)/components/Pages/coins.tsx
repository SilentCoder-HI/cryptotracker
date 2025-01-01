import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCoinPriceDetails } from "app/data/coinPriceDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

type SortDirection = "asc" | "desc" | "normal";

const coins: React.FC = () => {
    const { mergedCoins, loading: initialLoading, error } = useCoinPriceDetails();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("normal");

    const coinsPerPage = 10;

    const tableHeaders = [
        { label: "Coin", key: "name", sortable: true, place: "justify-start p-4 ps-6" },
        { label: "Current Price", key: "current_price", sortable: true, place: "justify-end p-4" },
        { label: "Amount", key: "amount", sortable: true ,place:"justify-center p-4"},
        { label: "Profit/Loss", key: "profit", sortable: true,place:"justify-center p-4" },
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
    if (error) {
        console.log("plz add coins")
    }
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
                <div className="min-w-max bg-gray-900 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 bg-gray-700 text-white">
                        {tableHeaders.map((header) => (
                            <div
                                key={header.key}
                                className={`w-full flex ${header.place} items-center cursor-pointer`}
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
                            currentCoins.map((coin) => (
                                <div
                                    key={coin.id}
                                    className="grid grid-cols-4 border-b border-gray-600"
                                >
                                    <div className="p-4 ps-6 justify-start flex items-center">
                                        <img
                                            src={coin.image || "https://example.com/fallback-image-url.png"}
                                            alt={coin.name}
                                            className="w-10 h-10 rounded-full mr-2"
                                        />
                                        <span className="text-white">{coin.name}</span>
                                    </div>
                                    <div className="p-4 text-right text-white">
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

            <div className="flex justify-center items-center text-center gap-4 mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <span className="text-white">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    disabled={currentPage === totalPages}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </motion.div>
    );
};

export default coins;
