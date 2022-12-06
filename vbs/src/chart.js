import { useState } from "react";
import "./App.css";
// import BarChart from "./chart-components/BarChart";
import LineChart from "./chart-components/LineChart";
// import PieChart from "./chart-components/PieChart";
import { UserData } from "./Data";

export function Chart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

  return (
    <div className="App">
      {/* <div style={{ width: 700 }}>
        <BarChart chartData={userData} />
      </div> */}
      <div style={{ width: 700 }}>
        <LineChart chartData={userData} />
      </div>
      {/* <div style={{ width: 700 }}>
        <PieChart chartData={userData} />
      </div> */}
    </div>
  );
}

// export default Chart;