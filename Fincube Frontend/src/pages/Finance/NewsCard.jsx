import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

export default function NewsCard({ data }) {
  return (
    <a href={data?.url}>
      <Card sx={{ width: 345, height: 450 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
          }
          action={<p>{data?.overall_sentiment_score}</p>}
          title={data?.source}
          subheader={data?.time_published}
        />
        <img
          className=" bg-white w-[345px] flex items-center justify-center object-cover h-[200px]"
          style={{
            objectFit: data.banner_image ? "cover" : "contain",
          }}
          src={
            data?.banner_image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdGodbj0sF1AYkdbc9LsjL1FDgHVGf0jHV_g&s"
          }
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="" className=" line-clamp-2">
            {data?.title}
          </Typography>
        </CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          className=" line-clamp-3 m-2 mb-6 px-3"
        >
          {data?.summary}
        </Typography>
      </Card>
    </a>
  );
}
