import React from "react";
import ReactApexChart from "react-apexcharts";
export default class RadialChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [50],
      options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          }
        },
      },
      labels: ['Points'],
      },

    };
  }

  

    render() {
      return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={200} />
      </div>

      );
}
}