import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faArrowLeft, faArrowRight, faCoins } from '@fortawesome/free-solid-svg-icons';

// Union type for active components
type ActiveComponent = 'dashboard' | 'crypto' | 'settings';

// Props type for Sidebar
interface SidebarProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponent>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={`bg-gray-800 text-white ${isCollapsed ? 'w-16' : 'w-64'} min-h-screen p-4 transition-width duration-300`}
        >
            <button onClick={toggleSidebar} className="bg-gray-700 p-2 rounded mb-4">
                {!isCollapsed ? <FontAwesomeIcon icon={faArrowLeft} /> : <FontAwesomeIcon icon={faArrowRight} />}
            </button>
            <h2 className={`text-lg font-semibold ${isCollapsed ? 'hidden' : ''}`}>Menu</h2>
            <ul className="mt-4 flex flex-col gap-5">
                <li
                    className={`py-2 hover:bg-gray-700 rounded flex items-center cursor-pointer ${
                        isCollapsed ? 'justify-center' : ''
                    }`}
                    onClick={() => setActiveComponent('dashboard')}
                >
                    <FontAwesomeIcon icon={faHome} />
                    <span className={`ml-2 ${isCollapsed ? 'hidden' : ''}`}>Dashboard</span>
                </li>
                <li
                    className={`py-2 hover:bg-gray-700 rounded flex items-center cursor-pointer ${
                        isCollapsed ? 'justify-center' : ''
                    }`}
                    onClick={() => setActiveComponent('crypto')}
                >
                    <FontAwesomeIcon icon={faCoins} />
                    <span className={`ml-2 ${isCollapsed ? 'hidden' : ''}`}>Crypto Holdings</span>
                </li>
                <li
                    className={`py-2 hover:bg-gray-700 rounded flex items-center cursor-pointer ${
                        isCollapsed ? 'justify-center' : ''
                    }`}
                    onClick={() => setActiveComponent('settings')}
                >
                    <FontAwesomeIcon icon={faCog} />
                    <span className={`ml-2 ${isCollapsed ? 'hidden' : ''}`}>Settings</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
