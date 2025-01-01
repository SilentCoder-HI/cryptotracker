'use client'; // Required for client-side rendering in Next.js 13+

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Coins from './components/Pages/coins';
import Dashboard from './components/Pages/dashboard';
import Setting from './components/Pages/setting'; // Importing the Settings component
import ImportGraphDataFunc from 'app/data/GraphData/importGraphData';
// Type for activeComponent values
type ActiveComponent = 'dashboard' | 'crypto' | 'settings';

const DashboardPage: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<ActiveComponent>('dashboard');
    const [currency, setCurrency] = useState<string>('BTC');
    const [timeZone, setTimeZone] = useState<string>('UTC+00:00');
    // Function to handle settings change
    const handleSettingsChange = (settings: { defaultCurrency: string; timeZone: string }) => {
        setCurrency(settings.defaultCurrency);
        setTimeZone(settings.timeZone);
    };
    ImportGraphDataFunc();
    // Function to render components dynamically based on activeComponent
    const renderComponent = () => {
        switch (activeComponent) {
            case 'dashboard':
                return <Dashboard />
            case 'crypto':
                return <Coins />;
            case 'settings':
                return <Setting onSettingsChange={handleSettingsChange} />; // Pass the function as a prop
            default:
                return null;
        }
    };
    return (
        <div className="flex min-h-screen max-md:flex-col">
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="flex-1 p-6">
                {renderComponent()}
            </div>
        </div>
    );
};

export default DashboardPage;
