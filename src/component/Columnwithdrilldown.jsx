import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Import drilldown module
import drilldown from "highcharts/modules/drilldown";
drilldown(Highcharts);

const Columnwithdrilldown = () => {
  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      align: "left",
      text: "University Data with College Fees",
    },
    subtitle: {
      align: "left",
      text: 'Click the columns to view college data. Source: <a href="http://example.com" target="_blank">University Stats</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Total Fees (in $)",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          // eslint-disable-next-line no-template-curly-in-string
          format: "${point.y:.2f}",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        // eslint-disable-next-line no-template-curly-in-string
        '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:.2f}</b><br/>',
    },
    series: [
      {
        name: "Universities",
        colorByPoint: true,
        data: [
          { name: "University A", y: 50000, drilldown: "university-a" },
          { name: "University B", y: 75000, drilldown: "university-b" },
          { name: "University C", y: 60000, drilldown: "university-c" },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          name: "University A",
          id: "university-a",
          data: [
            ["College of Science", 20000],
            ["College of Arts", 15000],
            ["College of Engineering", 15000],
          ],
        },
        {
          name: "University B",
          id: "university-b",
          data: [
            ["College of Business", 30000],
            ["College of Medicine", 25000],
            ["College of Law", 20000],
          ],
        },
        {
          name: "University C",
          id: "university-c",
          data: [
            ["College of Education", 25000],
            ["College of Music", 20000],
            ["College of Technology", 15000],
          ],
        },
      ],
    },
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900">  
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
};

export default Columnwithdrilldown;
