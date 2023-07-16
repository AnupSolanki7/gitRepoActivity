import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import moment from "moment";
import { useState } from "react";
import LineChart from "./LineChart";
import { Button, Menu, MenuItem, Popover } from "@mui/material";

const DisplayComp = ({ api }: any) => {
  const [graph, setGraph] = useState(false);
  const [open,setOpen] = useState(false)
  const [changeData, setChangeData] = useState("")
  const [weeklyData, setWeeklyData]: any = useState([]);
  const getCommitApi = () => {
    setGraph(!graph);
    if (!graph) {
      axios
        .get(
          `https://api.github.com/repos/${api.full_name}/stats/commit_activity`
        )
        .then((res: any) => {
          setWeeklyData(res?.data);
        });

      axios
        .get(`https://api.github.com/repos/${api.full_name}/stats/contributors`)
        .then((res: any) => {
          setWeeklyData(res.data);
        });
    }
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

  const HandleChangeStatus = (change:any) => {
    setChangeData(change)
    setOpen(false)
  }

  const newDate: any = new Date();

  const dateSubmited = newDate - Date.parse(api.created_at);
  const Days = Math.floor(dateSubmited / (1000 * 60 * 60 * 24));

  return (
    <div className="my-2 hover:bg-gray-300 p-4 rounded-xl bg-gray-400  cursor-pointer relative">
      <div className="flex " onClick={() => getCommitApi()}>
        <img
          width={"100px"}
          className="mr-4 rounded-lg"
          src={api.owner.avatar_url}
        />
        <div className="flex flex-col">
          <p className="text-left font-mono font-semibold text-lg">
            {api.name}
          </p>
          <p className="font-mono text-sm text-left flex justify-between items-center">
            {api.description}
            <span className="absolute right-6 top-2">
              {!graph ? (
                <span className="text-xl">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              ) : (
                <span className="text-xl">
                  <IoIosArrowDown />
                </span>
              )}
            </span>
          </p>
          <p className="flex font-semibold gap-8">
            <span>
              Issues reported :-{" "}
              <span className="text-black">{api.open_issues}</span>
            </span>
            <span>
              Star count-{" "}
              <span className="text-red-400">{api.stargazers_count}</span>
            </span>
            <p className="font-normal">
              {" "}
              Last pushed {moment(api.created_at).fromNow()} by{" "}
              {api.owner.login}
            </p>
          </p>
        </div>
      </div>
      {graph ? (
        <div className="h-max my-4 bg-white">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={() => setOpen(true)}
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            open={open}
            onClose={() => setOpen(false)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={(e:any) => HandleChangeStatus("a")}>Profile</MenuItem>
            <MenuItem onClick={(e:any) => HandleChangeStatus("d")}>My account</MenuItem>
            <MenuItem onClick={(e:any) => HandleChangeStatus("c")}>Logout</MenuItem>
          </Menu>
          <LineChart weeklyData={weeklyData} />
          <div className="h-4 bg-gray-400" />
          <div className="py-2">
            {/* <HighchartsReact
              className="h-full"
              highcharts={Highcharts}
              options={optionsContri}
            /> */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DisplayComp;
