"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "./config";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    city: "",
    date: "",
    condition: "",
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    visibility: 0,
    image: null,
    current: { condition: { icon: null } },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${config.domain}/v1/current.json?key=c07541b169b948328f2200852240308&q=Mumbai&aqi=no`,
        );
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log("error in fetching api", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    city,
    temperature,
    date,
    condition,
    windSpeed,
    humidity,
    visibility,
    current: {
      condition: { icon: image },
    },
  } = data;
  console.log("data", data);

  return (
    <div className="bg-gray-700">
      <div className="min-h-screen flex items-center justify-center">
        {loading ? (
          <div className="text-white text-2xl">Loading...</div>
        ) : (
          <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
            <div className="font-bold text-xl text-black">
              {data.location.name}
            </div>
            <div className="text-sm text-gray-500">
              {data.current.last_updated}
            </div>
            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
              <img
                src={data.current.condition.icon}
                alt={condition}
                className="w-32 h-32"
              />
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
              <div className="font-medium text-6xl text-black">
                {data.current.temp_c}°C
              </div>
              <div className="flex flex-col items-center ml-6 text-black">
                <div>{condition}</div>
                <div className="mt-1">
                  <span className="text-sm">
                    <i className="far fa-long-arrow-up"></i>
                  </span>
                  <span className="text-sm font-light text-gray-500">28°C</span>
                </div>
                <div>
                  <span className="text-sm">
                    <i className="far fa-long-arrow-down"></i>
                  </span>
                  <span className="text-sm font-light text-gray-500">20°C</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm text-black">Wind</div>
                <div className="text-sm text-gray-500">
                  {data.current.wind_kph} k/h
                </div>
              </div>
              <div className="flex flex-col items-center text-black">
                <div className="font-medium text-sm">Humidity</div>
                <div className="text-sm text-gray-500">
                  {data.current.humidity}%
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm text-black">Visibility</div>
                <div className="text-sm text-gray-500">
                  {data.current.vis_km} km
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
