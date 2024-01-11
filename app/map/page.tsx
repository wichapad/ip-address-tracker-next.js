"use client";
import Image from "next/image";
import patternMobile from "@/public/pattern-bg-mobile.png";
import patternDesktop from "@/public/pattern-bg-desktop.png";
import arrowBtn from "@/public/icon-arrow.svg";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import Markerposition from "../markerposition/page";

interface ApiResponse {
  ip: string;
  city: string;
  country_name: string;
  latitude: number;
  longitude: number;
  isp: string;
  time_zone: {
    current_time: string;
  };
}

const Map = () => {
  const [ipInput, setIpInput] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);

  const fetchData = async (ip: string) => {
    try {
      const apiKey = "8486414383d74704bbb0640c9d5677a1";
      const res = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`
      );
      if (!res.ok) {
        throw new Error("Error fetch data");
      }
      const result: ApiResponse = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    fetchData(ipInput);
  };

  return (
    <div className="relative">
      <div>
        <Image
          className="bg-mobile"
          src={patternMobile}
          alt=""
          width={0}
          height={0}
        />
        <Image
          className="bg-desktop"
          src={patternDesktop}
          alt=""
          width={0}
          height={0}
        />
      </div>
      <div className="cotainer">
        <h1 className="text-white font-bold text-[24px] pb-[0.8rem]">
          IP Address Tracker
        </h1>
        <div className="flex items-center justify-center">
          <div>
            <input
              className="inputSearch"
              type="text"
              placeholder="Search for any IP or domain"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
            />
          </div>

          <div className="arrowsBG" onClick={handleClick}>
            {" "}
            <Image src={arrowBtn} alt="" width={8} height={8} />
          </div>
        </div>

        {data && (
          <div className="content">
            <div>
              <p>Ip address</p>
              <p>{data.ip}</p>
            </div>
            <div>
              <p>Location</p>
              <p>
                {data.city},{data.country_name}
              </p>
            </div>
            <div>
              <p>Timezone</p>
              <p>{data.time_zone.current_time}</p>
            </div>
            <div>
              <p>Isp</p>
              <p>{data.isp}</p>
            </div>
          </div>
        )}
      </div>
      {data && (
        <div>
          <MapContainer
            className="mapContent"
            center={[data.latitude, data.longitude]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markerposition data={data} />
          </MapContainer>
        </div>
      )}
    </div>
  );
};
export default Map;
