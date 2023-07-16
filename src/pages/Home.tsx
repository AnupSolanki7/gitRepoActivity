import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayComp from "../component/DisplayComp";

const Home = () => {
  const [gitApi, setGitApi]: any = useState();

  const apiCall = async () => {
    await axios
      .get(
        "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"
      )
      .then((res: any) => {
        setGitApi(res.data);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);



  return (
    <>
    <h1 className="font-sans text-3xl font-bold text-white bg-gray-700 py-6" >Most Stared Git Repos</h1>
    <div className="px-40 py-20 flex flex-col ">
      {gitApi?.items?.map((api: any) => {
        // console.log(api);

        return (
            <DisplayComp api={api}  />
        );
      })}
    </div>
    </>
  );
};

export default Home;
