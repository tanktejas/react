import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../Card/card";
import Poppop from "../popupwindow/poppop";
import Bottom from "./bottom_add_button";
import "./images.css";
import { useAuth0 } from "@auth0/auth0-react";

function Images() {
  const { user } = useAuth0();

  const [search, setsearch] = useState("");

  const [arr_of_img, setarr] = useState([]);
  const [temp, settep] = useState([]);
  const [status, setstatus] = useState(false);
  const [url, seturl] = useState("");
  const [stateforadd, setadd] = useState(false);
  const [curruser, setcurruser] = useState("");

  const fetchimages = () => {
    fetch("https://api.spacexdata.com/v3/launches?limit=100", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (data) => data.json())
      .then((data) => {
        setarr(data);
        console.log(data);
        settep(data);
        // console.log(data.Contents[0].Key);
        setstatus(true);
      });
  };

  useEffect(async () => {
    fetchimages();
  }, []);

  if (arr_of_img?.length == 0) {
    return (
      <>
        <h1 className="load">Loading...</h1>
      </>
    );
  }
  if (arr_of_img?.length != 0) {
    if (user != undefined && user != curruser) {
      setcurruser(user);
    }

    return (
      <>
        <div className="fil">
          <h1>Filter</h1>
          <input
            value={search}
            type="text"
            onChange={(e) => {
              setsearch(e.target.value);
              let aaa = temp;
              const aa = aaa.filter((item) => {
                return item.mission_name
                  .toUpperCase()
                  .includes(search.toUpperCase());
              });
              if (search === "") {
                aa = temp;
              } else if (aa.length == 0) {
                aa = temp[0];
              }
              setarr(aa);
            }}
            placeholder="search by name"
          ></input>
        </div>
        <div className="pages">
          {arr_of_img.map((item) => {
            return (
              <>
                <Card
                  name={item.mission_name.toUpperCase()}
                  rocketinfo={item.rocket}
                  year={item.launch_year}
                  flight_number={item.flight_number}
                  links={item.links}
                />
              </>
            );
          })}
        </div>
        {/* <Bottom state={stateforadd} setstate={setadd} /> */}
        {/* <Poppop state={stateforadd} setstate={setadd} user={user} /> */}
      </>
    );
  }
}

export default Images;
