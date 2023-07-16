import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayComp from "../component/DisplayComp";
import moment from "moment";
import { setRepo } from "../redux/repo";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const {repos}  = useSelector((state: any) => state.repos);
  const dispatch = useDispatch();

  const apiCall = async () => {
    const days = moment().subtract(30, "days").format("YYYY-MM-DD");
    await axios
      .get(
        `https://api.github.com/search/repositories?q=created:>${days}&sort=stars&order=desc`
      )
      .then((res: any) => {
        dispatch(setRepo(res.data));
      });
  };


  useEffect(() => {
    apiCall();
  }, []);

  return (
    <>
      <h1 className="font-sans text-3xl font-bold text-white bg-gray-700 py-6">
        Most Stared Git Repos
      </h1>
      <div className="px-4 py-20 flex flex-col ">
        {repos?.items?.map((api: any) => {
          // console.log(api);

          return <DisplayComp api={api} />;
        })}
      </div>
    </>
  );
};

export default Home;
