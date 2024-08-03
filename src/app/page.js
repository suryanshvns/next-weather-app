"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [condition, setCondition] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.weatherapi.com/v1/current.json?key=c07541b169b948328f2200852240308&q=Mumbai&aqi=no",
        );
        const data = response.data;
        setCity(data.location.name);
        setDate(data.location.localtime);
        setCondition(data.current.condition.text);
        setTemperature(data.current.temp_c);
        setWindSpeed(data.current.wind_kph);
        setHumidity(data.current.humidity);
        setVisibility(data.current.vis_km);
        setImage(data.current.condition.icon);
        setLoading(false);
      } catch (error) {
        console.log("error in fetching api", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-700">
      <div className="min-h-screen flex items-center justify-center">
        {loading ? (
          <div className="text-white text-2xl">Loading...</div>
        ) : (
          <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
            <div className="font-bold text-xl text-black">{city}</div>
            <div className="text-sm text-gray-500">{date}</div>
            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
              <img src={image} alt={condition} className="w-32 h-32" />
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
              <div className="font-medium text-6xl text-black">
                {temperature}°C
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
                <div className="text-sm text-gray-500">{windSpeed} k/h</div>
              </div>
              <div className="flex flex-col items-center text-black">
                <div className="font-medium text-sm">Humidity</div>
                <div className="text-sm text-gray-500">{humidity}%</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm text-black">Visibility</div>
                <div className="text-sm text-gray-500">{visibility} km</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
