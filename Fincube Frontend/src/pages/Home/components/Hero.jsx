import * as React from "react";
import { alpha, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel";
import {
  HighQuality,
  LocationCity,
  LocationOn,
  Mail,
  Map,
  Phone,
  VerifiedOutlined,
} from "@mui/icons-material";
import HomeImage from "../../../assets/HomeImage.png";
export default function Hero() {
  var items = [
    {
      img: HomeImage,
      description: "Probably the most random thing you have ever seen!",
    },
    {
      img: "https://dezerv-strapi-test.s3.ap-south-1.amazonaws.com/front_view_finance_business_elements_assortment_4a5903ab2d.jpg",
      description: "Hello World!",
    },
  ];
  return (
    <div className=" relative">
      <Carousel
        interval={2000}
        indicators={false}
        animation="fade"
        swipe="true"
        stopAutoPlayOnHove={false}
      >
        {items.map((item, i) => (
          <div className=" bg-white" key={i} item={item}>
            <img
              src={item.img}
              className=" h-screen w-screen bg-white"
              alt=""
            />
          </div>
        ))}
      </Carousel>
      <div>
        <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 text-center -translate-y-1/2 text-white backdrop:blur-3xl text-4xl font-bold bg-opacity">
          <h1 className=" text-8xl font-semibold text-white ">FINCUBE</h1>{" "}
          <p className=" text-zinc-300">Let's take you one step forward</p>
        </div>
      </div>
      {/* <div className=" bg-indigo-700 absolute bottom-0 left-0 md:left-[15vw] z-50 h-fit w-screen  md:w-[70vw] flex items-center justify-evenly p-3  lg:text-xl gap-4 flex-wrap">
        <div className=" text-white flex flex-col items-center justify-center ">
          <VerifiedOutlined fontSize="large" />
          <p>Trusted Workshops</p>
        </div>{" "}
        <div className=" text-white flex flex-col items-center justify-center ">
          <Mail fontSize="large" />
          <p>Free Appointment</p>
        </div>{" "}
        <div className=" text-white flex flex-col items-center justify-center ">
          <Phone fontSize="large" />
          <p>24hr Hotline</p>
        </div>{" "}
        <div className=" text-white flex flex-col items-center justify-center ">
          <LocationOn fontSize="large" />
          <p>Location Access</p>
        </div>
      </div> */}
    </div>
  );
}
