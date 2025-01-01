import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faArrowLeft, faArrowRight, faCoins, faBars, faX } from '@fortawesome/free-solid-svg-icons';

// Union type for active components
type ActiveComponent = 'dashboard' | 'crypto' | 'settings';

// Props type for Sidebar
interface SidebarProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponent>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

    return (
        <>
            {/* Sidebar */}
            <div className="w-full h-[80px] text-center relative bg-gray-800 flex justify-center p-2 z-50 md:hidden items-center">
                {/* Sidebar Toggle Button */}
                <button
                    onClick={toggleMobileSidebar}
                    className="bg-gray-700 text-2xl p-2 rounded absolute top-5 left-5"
                >
                    <FontAwesomeIcon icon={isMobileOpen ? faX : faBars} />
                </button>
                <h2 className='text-bold text-gray-50 text-2xl'>Crypto Tracker</h2>
                
            </div>

            <div
                className={`bg-gray-800 text-white fixed top-0 max-md:top-[80px] left-0 z-50 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 md:relative md:translate-x-0 ${isCollapsed ? 'w-16' : 'w-64'
                    } min-h-screen p-4`}
            >
                {/* Desktop Sidebar Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="max-md:hidden md:block bg-gray-700 p-2 rounded mb-4"
                >
                    <FontAwesomeIcon icon={isCollapsed ? faArrowRight : faArrowLeft} />
                </button>
                {/* Menu Title */}
                {!isCollapsed && (
                    <h2 className="text-lg font-semibold hidden md:block">Menu</h2>
                )}

                {/* Menu Items */}
                <ul className="mt-4 flex flex-col gap-5">
                    <li
                        className="py-2 hover:bg-gray-700 rounded flex items-center cursor-pointer"
                        onClick={() => {
                            setActiveComponent('dashboard');
                            setIsMobileOpen(false); // Close on mobile view
                        }}
                    >
                        <FontAwesomeIcon icon={faHome} />
                        <span className={`ml-2 ${isCollapsed ? 'hidden' : ''}`}>
                            Dashboard
                        </span>
                    </li>
                    <li
                        className="py-2 hover:bg-gray-700 rounded flex items-center cursor-pointer"
                        onClick={() => {
                            setActiveComponent('crypto');
                            setIsMobileOpen(false); // Close on mobile view
                        }}
                    >
                        <FontAwesomeIcon icon={faCoins} />
                        <span className={`ml-2 ${isCollapsed ? 'hidden' : ''}`}>
                            Crypto Holdings
                        </span>
                    </li>
                    <li
                        className="py-2 hover:bg-gray-700 rounded flex items-center cursor-pointer"
                        onClick={() => {
                            setActiveComponent('settings');
                            setIsMobileOpen(false); // Close on mobile view
                        }}
                    >
                        <FontAwesomeIcon icon={faCog} />
                        <span className={`ml-2 ${isCollapsed ? 'hidden' : ''}`}>
                            Settings
                        </span>
                    </li>
                </ul>
            </div>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleMobileSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
