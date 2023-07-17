import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";


const LineChart = ({ weeklyData, changeData }: any) => {
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
        name:"total",
        data: weeklyData?.map((e:any) => e.total),
      },
      {
        name:`${changeData}`,
        data: weekData?.[0]?.map((e: any) => e[changeData])
      }
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
