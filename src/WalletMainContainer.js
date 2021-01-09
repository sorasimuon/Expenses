import React, { useState } from "react";

import WalletExpenseGrid from "./WalletExpenseGrid";
import WalletTotalExpenses from "./WalletTotalExpenses";
import WalletTotalEarnings from "./WalletTotalEarnings";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Loader from "./Loader";

//Import Styling + Material-UI
import styles from "./WalletMainContainer.module.css";

function WalletMainContainer() {
  // useState variables
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={styles.mainContainer}>
      {/* Big Focus */}
      <WalletTotalExpenses />
      <WalletTotalEarnings />
      {/* Chart Expenses */}
      <BarChart />
      <PieChart />
      {/* Grid Expenses */}
      {isLoading ? <Loader /> : <WalletExpenseGrid />}
    </div>
  );
}

export default WalletMainContainer;
