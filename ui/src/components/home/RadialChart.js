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
      width={200}
      height={200}
      cx={120}
      cy={100}
      innerRadius={50}
      outerRadius={100}
      barSize={12}
      data={data}
    >
      <RadialBar
        minAngle={10}
        background
        clockWise
        dataKey="value"
      />
      {/* <Legend
        iconSize={8}
        width={100}
        height={80}
        layout="vertical"
        verticalAlign="middle"
        wrapperStyle={style}
      /> */}
    </RadialBarChart>
    {/* <Space direction="vertical" style={{marginLeft:'auto', marginRight:'5%', width:'90%'}}> */}
      <Text strong style={{color:'#1c54b2', marginLeft:'50px'}}>{"Target "+target}</Text>
      <Text strong style={{color:'#b22c5a', marginLeft:'10px'}}>{"Read "+read}</Text>
    {/* </Space> */}
    </>
  );
  
}

