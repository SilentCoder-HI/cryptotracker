'use client'; // Required for client-side rendering in Next.js 13+

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Coins from './components/Pages/coins';
import Dashboard from './components/Pages/dashboard';
import Setting from './components/Pages/setting'; // Importing the Settings component

// Type for activeComponent values
type ActiveComponent = 'dashboard' | 'crypto' | 'settings';

const DashboardPage: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<ActiveComponent>('dashboard');
    
    // State for currency and time zone
    const [currency, setCurrency] = useState<string>('BTC');
    const [timeZone, setTimeZone] = useState<string>('UTC+00:00');

    // Function to handle settings change
    const handleSettingsChange = (settings: { defaultCurrency: string; timeZone: string }) => {
        setCurrency(settings.defaultCurrency);
        setTimeZone(settings.timeZone);
    };
    console.log(currency,timeZone)
    // Function to render components dynamically based on activeComponent
    const renderComponent = () => {
        switch (activeComponent) {
            case 'dashboard':
                return <Dashboard/>
            case 'crypto':
                return <Coins />;
            case 'settings':
                return <Setting onSettingsChange={handleSettingsChange} />; // Pass the function as a prop
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="flex-1 p-6">
                {renderComponent()}
            </div>
        </div>
    );
};

export default DashboardPage;
