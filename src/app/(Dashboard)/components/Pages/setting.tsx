import React, { useState, useEffect } from 'react';

interface SettingsState {
    timeZone: string;
    defaultCurrency: string;
}

interface SettingsProps {
    onSettingsChange: (settings: SettingsState) => void;
}

function Settings(props: SettingsProps) {
    const [settings, setSettings] = useState<SettingsState>({
        timeZone: 'UTC+00:00', // Default to UTC
        defaultCurrency: 'BTC',
    });

    useEffect(() => {
        const savedSettings = localStorage.getItem('settings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
        props.onSettingsChange(settings); // Send updated settings to parent
    }, [settings]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Settings</h1>
            <div className="mt-4">
                <label className="block mb-2">Time Zone:</label>
                <select name="timeZone" value={settings.timeZone} onChange={handleChange} className="border p-2">
                    <option value="UTC-12:00">UTC-12:00 - Baker Island</option>
                    <option value="UTC-11:00">UTC-11:00 - American Samoa</option>
                    <option value="UTC-10:00">UTC-10:00 - Hawaii</option>
                    <option value="UTC-09:00">UTC-09:00 - Alaska</option>
                    <option value="UTC-08:00">UTC-08:00 - Pacific Time (Los Angeles)</option>
                    <option value="UTC-07:00">UTC-07:00 - Mountain Time (Denver)</option>
                    <option value="UTC-06:00">UTC-06:00 - Central Time (Chicago)</option>
                    <option value="UTC-05:00">UTC-05:00 - Eastern Time (New York)</option>
                    <option value="UTC+00:00">UTC+00:00 - London</option>
                    <option value="UTC+01:00">UTC+01:00 - Berlin</option>
                    <option value="UTC+02:00">UTC+02:00 - Cairo</option>
                    <option value="UTC+03:00">UTC+03:00 - Moscow</option>
                    <option value="UTC+04:00">UTC+04:00 - Dubai</option>
                    <option value="UTC+05:00">UTC+05:00 - Islamabad</option>
                    <option value="UTC+06:00">UTC+06:00 - Dhaka</option>
                    <option value="UTC+07:00">UTC+07:00 - Bangkok</option>
                    <option value="UTC+08:00">UTC+08:00 - Beijing</option>
                    <option value="UTC+09:00">UTC+09:00 - Tokyo</option>
                    <option value="UTC+10:00">UTC+10:00 - Sydney</option>
                    <option value="UTC+11:00">UTC+11:00 - Magadan</option>
                    <option value="UTC+12:00">UTC+12:00 - Fiji</option>
                    <option value="UTC+01:30">UTC+01:30 - Example City</option>
                    <option value="UTC+02:30">UTC+02:30 - Example City</option>
                </select>
            </div>
            <div className="mt-4">
                <label className="block mb-2">Default Currency:</label>
                <select name="defaultCurrency" value={settings.defaultCurrency} onChange={handleChange} className="border p-2">
                    <option value="BTC">BTC</option>
                    <option value="USDT">USDT</option>
                    <option value="ETH">ETH</option>
                    <option value="SD">SD</option>
                </select>
            </div>
        </div>
    );
}

export default Settings;
