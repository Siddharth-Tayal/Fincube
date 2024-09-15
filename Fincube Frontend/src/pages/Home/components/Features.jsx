import * as React from "react";
import ServiceCard from "../../../components/ServiceCard";
import Servicing from "../../../assets/Servicing.jpg";
import Repairing from "../../../assets/Repairing.jpg";
import Diagnosis from "../../../assets/Diagnosis.jpg";
import Bodyrepair from "../../../assets/Bodyrepair.jpg";
import BatteryChange from "../../../assets/BatteryChange.jpg";
import Tyre from "../../../assets/Tyre.jpg";
import Accessories from "../../../assets/Accessories.jpg";
import Offers from "../../../assets/Offers.jpg";
import ServiceBoy from "../../../assets/ServiceBoy.png";
import { Typography } from "@mui/material";
const items = [
  {
    image: Servicing,
    text: "Servicing",
  },
  {
    image: Repairing,
    text: "Repairing",
  },
  {
    image: Diagnosis,
    text: "Diagnostic",
  },
  {
    image: BatteryChange,
    text: "Battery Change",
  },
  {
    image: Bodyrepair,
    text: "Body Repair",
  },
  {
    image: Tyre,
    text: "Tyre Change",
  },
  {
    image: Accessories,
    text: "Buy Accessories",
  },
  {
    image: Offers,
    text: "Top Offers",
  },
];

export default function Features() {
  return (
    <div className=" flex flex-col items-center justify-center bg-gray-200 py-[50px] relative overflow-hidden">
      <div className="  flex items-center justify-center ">
        <img
          src={ServiceBoy}
          className=" bg-transparent h-[150px] w-[100px] object-contain absolute top-[-20px] left-0 md:relative md:h-fit md:w-fit"
          alt=""
        />
        <p className=" text-2xl md:text-4xl w-[100vw] p-3 text-neutral-800 md:w-[60vw] uppercase text-center font-light py-[50px]">
          get service estimate, search workshop and book your appointment online
        </p>
      </div>
      <div className=" flex items-center p-4 flex-wrap  justify-center ">
        {" "}
        {items.map((item, index) => (
          <ServiceCard image={item.image} text={item.text} />
        ))}
      </div>
    </div>
  );
}
