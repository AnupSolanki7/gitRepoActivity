import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";

const DisplayComp = ({ api }: any) => {
  const [graph, setGraph] = useState(false);
  const [weeklyData, setWeeklyData]:any = useState([])
  const getCommitApi = () => {
    setGraph(!graph);
    if (!graph) {
      axios
        .get(
          `https://api.github.com/repos/${api.full_name}/stats/commit_activity`
        )
        .then((res: any) => {
          console.log(res.data);
        });

      axios
        .get(`https://api.github.com/repos/${api.full_name}/stats/contributors`)
        .then((res: any) => {
            setWeeklyData(res.data);
        });
    }
  };

  console.log(weeklyData);
  

  const options = {
    title: {
      text: "Total Changes",
    },

    series: [
      {
        data: weeklyData?.weeks?.map((e:any) => e?.w),
      },
    ],
  };

  const optionsContri = {
    title: {
      text: "Contributor Changes",
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };

  const newDate:any = new Date();

  const dateSubmited = newDate - Date.parse(api.created_at);
  const Days = Math.floor(dateSubmited / (1000 * 60 * 60 * 24));



  return (
    <div className="my-2 hover:bg-gray-300 p-4 rounded-xl bg-gray-400  cursor-pointer">
      <div className="flex " onClick={() => getCommitApi()}>
        <img
          width={"100px"}
          className="mr-4 rounded-lg"
          src={api.owner.avatar_url}
        />
        <div className="flex flex-col">
          <p className="text-left font-mono font-semibold text-lg">
            {api.owner.login}
          </p>
          <p className="font-mono text-sm text-left">{api.description}</p>
          <p className="flex font-semibold">
            Issues reported :-{" "}
            <span className="text-black">{api.open_issues}</span>
          </p>
          <p className="flex font-semibold">
            Star count-{" "}
            <span className="text-red-400">{api.stargazers_count}</span>
          </p>
        </div>
      </div>
      {graph ? (
        <div className="h-max my-4 bg-white">
          <div className="py-2">
            <HighchartsReact
              className="h-full"
              highcharts={Highcharts}
              options={options}
            />
          </div>
          <div className="h-4 bg-gray-400" />
          <div className="py-2">
            <HighchartsReact
              className="h-full"
              highcharts={Highcharts}
              options={optionsContri}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DisplayComp;
