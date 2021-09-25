import {useState} from "react";
import ReactApexChart from "react-apexcharts";
export default function RadialChart(props) {
  // articles target set by user
  const target =props.target || 4;
  // converting articles read in percentage wrt targetset
  const articlePercentage= Number( (props.articles/target)*100 )|| 70;
  // points is just half of article percentage
  const pts = articlePercentage / 2;
  let [chart, setChart] =useState(
    {
      series: [pts, articlePercentage],
      options: {
        chart: {
          height: 200,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '20px',
              },
              value: {
                fontSize: '25px',
              },
              total: {
                show: true,
                label: 'Points',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return pts
                }
              }
            }
          }
        },
        labels: ['Points', 'Articles'],
      },
    }
  );

  return (
    <div id="chart" style={{width:'85%', marginRight:'15%', marginLeft:'auto'}}>
      <ReactApexChart options={chart.options} series={chart.series} type="radialBar" height={250} />
    </div>
  );
  
}

