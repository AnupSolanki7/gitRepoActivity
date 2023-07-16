import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";

const LineChart = ({ weeklyData }: any) => {
  const weekData = weeklyData?.map((e: any) => e.weeks);

  const options = {
    title: {
      text: "Total Changes",
    },
    yAxis: {
      title: {
        text: "change",
      },
    },

    xAxis: {
      title: {
        text: "week",
      },
    },
    series: [
      {
        data: weekData?.[0]?.map((e: any) => e.a),
      },
    ],
  };
  return (
    <div className="py-2">
      <HighchartsReact
        className="h-full"
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default LineChart;
