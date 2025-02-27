import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar, faCoins, faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface DashboardCardProps {
  title: string;
  amount: number;
  percentage: number;
  icon: "faDollar" | "faCoins" | "faArrowUp";
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, amount, percentage, icon }) => {
  useEffect(() => {
    const elements = document.querySelectorAll("lord-icon");
    elements.forEach((element) => {
      if (!element.hasAttribute("trigger")) {
        element.setAttribute("trigger", "hover");
      }
    });
  }, []);

  const renderIcon = () => {
    switch (icon) {
      case "faDollar":
        return <FontAwesomeIcon icon={faDollar} />;
      case "faCoins":
        return <FontAwesomeIcon icon={faCoins} />;
      case "faArrowUp":
        return <FontAwesomeIcon icon={faArrowUp} />;
      default:
        return <FontAwesomeIcon icon={faDollar} />;
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Upper section with Title and Amount */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-300">{title}</h3>
          <p
            className={`text-xl sm:text-3xl font-bold bg-clip-text text-transparent mt-1 sm:mt-2 
              ${percentage >= 0 ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-red-400 to-red-500"}`}
          >
            {icon !== "faCoins" ? `$${amount.toFixed(2)}` : amount.toFixed(2)}
          </p>
        </div>

        {/* Icon section */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-3 rounded-lg">
          {renderIcon()}
        </div>
      </div>

      {/* Lower section with Percentage Change */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700">
        <p className="text-xs sm:text-sm text-gray-400">
          <span className={`${percentage >= 0 ? "text-green-400" : "text-red-400"} font-medium`}>
            {Math.abs(percentage).toFixed(2)}%
          </span>{" "}
          than last Month
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
