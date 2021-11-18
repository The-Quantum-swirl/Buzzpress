import {useState} from "react";
import ReactApexChart from "react-apexcharts";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import { Space, Typography } from "antd";
const {Text, Title} = Typography;

export default function RadialChart(props) {
  // articles target set by user
  const target = Number(props.target) || 10;
  const read = Number(props.read) || 0;
  
  const data = [
    {
      name: "Target "+target.toString(),
      value: target,
      fill: "#1c54b2"
    },
    {
      name: "Read "+ read.toString(),
      value: Math.min(target, read),
      fill: "#b22c5a"
    }
  ];
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
    <br />
    <Text strong style={{color:'#ff6d00', marginLeft:'70px'}}>
      {read>=target? "Congrats 😋!" : ""}
    </Text>
    </>
  );
  
}

