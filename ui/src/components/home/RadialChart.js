import {useState} from "react";
import ReactApexChart from "react-apexcharts";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import { Space, Typography } from "antd";
const {Text, Title} = Typography;

export default function RadialChart(props) {
  // articles target set by user
  const target =props.target || 10;
  const read =props.read || 4
  const data = [
    {
      name: "Target "+target.toString(),
      value: target,
      fill: "#1c54b2"
    },
    {
      name: "Read "+ read.toString(),
      value: read,
      fill: "#b22c5a"
    }
  ];
  
  const style = {
    top: 70,
    left: 230,
    lineHeight: "22px"
  };

  return (
    <>
    <RadialBarChart
      width={180}
      height={180}
      cx={100}
      cy={90}
      innerRadius={40}
      outerRadius={90}
      barSize={12}
      data={data}
    >
      <RadialBar
        minAngle={10}
        background
        clockWise
        dataKey="value"
      />
    </RadialBarChart>
      <Text strong style={{color:'#1c54b2', marginLeft:'50px'}}>{"Target "+target}</Text>
      <Text strong style={{color:'#b22c5a', marginLeft:'10px'}}>{"Read "+read}</Text>
    </>
  );
  
}

