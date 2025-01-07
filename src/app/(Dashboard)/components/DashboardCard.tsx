import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar, faCoins, faArrowUp } from "@fortawesome/free-solid-svg-icons"; // Import the icons you need

// Define the Lordicon custom element
interface DashboardCardProps {
  title: string;
  amount: string | number; // Amount can be either string or number
  percentage: number; // Percentage as a number
  icon: "faDollar" | "faCoins" | "faArrowUp"; // Restrict to known icon strings
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, amount, percentage, icon }) => {
  useEffect(() => {
    // Ensure Lordicon elements are properly initialized when the component is mounted
    const elements = document.querySelectorAll("lord-icon");
    elements.forEach((element) => {
      if (!element.hasAttribute("trigger")) {
        element.setAttribute("trigger", "hover");
      }
    });
  }, []);

  // Map the icon string to actual FontAwesome icon
  const renderIcon = () => {
    switch (icon) {
      case "faDollar":
        return <FontAwesomeIcon icon={faDollar} />;
      case "faCoins":
        return <FontAwesomeIcon icon={faCoins} />;
      case "faArrowUp":
        return <FontAwesomeIcon icon={faArrowUp} />;
      default:
        return <FontAwesomeIcon icon={faDollar} />; // Default icon if none is provided
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Upper section with Title and Amount */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-300">{title}</h3>
          <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mt-1 sm:mt-2">
            {typeof amount === "number" ? amount.toFixed(2) : amount} {/* Format the amount as needed */}
          </p>
        </div>
        {/* Icon section */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-3 rounded-lg">
          {renderIcon()} {/* Display the icon dynamically */}
        </div>
      </div>

      {/* Lower section with Percentage Change */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700">
        <p className="text-xs sm:text-sm text-gray-400">
          <span
            className={`${percentage >= 0 ? "text-green-400" : "text-red-400"} font-medium`}
          >
            {percentage.toFixed(2)}% {/* Ensure percentage is formatted to 2 decimal places */}
          </span>{" "}
          than last Month
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
