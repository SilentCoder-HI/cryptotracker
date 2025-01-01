import React from 'react';
import DashboardCard from '../DashboardCard';
import Coins from '../CoinsSection';
import RecentTransactions from '../RecentTransactions';
import EarningsChart from '../GraphComponent';
import { useCoinPriceDetails } from 'app/data/coinPriceDetails';

const Dashboard = () => {
    const { mergedCoins } = useCoinPriceDetails();
    const totalBalance = mergedCoins.reduce((acc: number, coin: { totalInvestment: number; profit: number; }) => acc + coin.totalInvestment + coin.profit, 0);
    const totalInvestment = mergedCoins.reduce((acc: number, coin: { totalInvestment: number; }) => acc + coin.totalInvestment, 0);
    const totalCoins = mergedCoins.length;

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-50">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <DashboardCard title="Total Balance" amount={`$${totalBalance.toFixed(5)}`} percentage="+15%" icon="faDollar" />
                <DashboardCard title="Total Coins" amount={totalCoins.toString()} percentage="+3%" icon="faCoins" />
                <DashboardCard title="Monthly Profit" amount={`${totalInvestment.toFixed(5)}`} percentage="+7%" icon="faArrowUp" />
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
}

export default Dashboard;
