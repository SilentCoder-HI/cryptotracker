"use client";

import React, { useEffect } from "react";
import DashboardCard from "../DashboardCard";
import Coins from "../CoinsSection";
import RecentTransactions from "../RecentTransactions";
import EarningsChart from "../GraphComponent";
import { useCoinPriceDetails } from "app/data/coinPriceDetails";
import { longterm } from "app/data/longterm";
import UseGraphData from "app/data/GraphData/exportGraphData";
import useChartData from "app/data/chartdata";

const Dashboard = () => {
    const { mergedCoins = [] } = useCoinPriceDetails();
    const data = useChartData({ timestamp: '30' });


    // Calculate total balance
    const totalBalance = mergedCoins.reduce(
        (acc, coin) => acc + coin.totalInvestment + coin.profit,
        0
    );

    // Get the latest data from the long-term investment data
    const latestMonth = longterm?.[longterm.length - 1];
    const latestAmount = latestMonth?.days?.[latestMonth.days.length - 1]?.amount || 0;

    // Calculate total investment and total number of coins
    const totalInvestment = mergedCoins.reduce(
        (acc, coin) => acc + coin.totalInvestment,
        0
    );
    const totalCoins = mergedCoins.length;
    const amount = data[0].earnings;

    // Calculate percentage change
    const percentageChange = latestAmount
        ? (totalBalance / amount) * 100
        : 0;

    useEffect(() => {
        // Update the chart data when the component mounts
        const chartData = () => {
            UseGraphData();
            console.log("hello1")
        }
        const interval = setInterval(() => {
            chartData();
        }, 10000);
        return () => clearInterval(interval);
    }, [])
    return (
        <>
            <h1 className="text-3xl font-bold text-gray-50">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <DashboardCard
                    title="Total Balance"
                    amount={`$${totalBalance.toFixed(2)}`}
                    percentage={percentageChange}
                    icon="faDollar"
                />
                <DashboardCard
                    title="Total Coins"
                    amount={totalCoins.toString()}
                    percentage={3} // Example static value
                    icon="faCoins"
                />
                <DashboardCard
                    title="Total Investment"
                    amount={`$${totalInvestment.toFixed(2)}`}
                    percentage={3} // Example static value
                    icon="faArrowUp"
                />
            </div>
            <div className="mt-6">
                <EarningsChart />
            </div>
            <div className="flex gap-6 justify-between max-md:flex-col">
                <Coins />
                <RecentTransactions />
            </div>
        </>
    );
};

export default Dashboard;
