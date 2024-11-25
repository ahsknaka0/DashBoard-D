import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";

// Initialize the drilldown module
drilldown(Highcharts);

const Piewithdrilldown = () => {
  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "University vs Courses",
      align: "left",
    },
    subtitle: {
      text: 'Click the slices to view colleges. Source: <a href="http://example.com" target="_blank">University Stats</a>',
      align: "left",
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>',
    },
    series: [
      {
        name: "Universities",
        colorByPoint: true,
        data: [
          { name: "University A", y: 40, drilldown: "university-a" },
          { name: "University B", y: 35, drilldown: "university-b" },
          { name: "University C", y: 25, drilldown: "university-c" },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          id: "university-a",
          name: "University A - Courses",
          data: [
            { name: "College of Science", y: 20, drilldown: "science-a" },
            { name: "College of Arts", y: 10, drilldown: "arts-a" },
            { name: "College of Engineering", y: 10, drilldown: "engineering-a" },
          ],
        },
        {
          id: "university-b",
          name: "University B - Courses",
          data: [
            { name: "College of Business", y: 15, drilldown: "business-b" },
            { name: "College of Medicine", y: 10, drilldown: "medicine-b" },
            { name: "College of Law", y: 10, drilldown: "law-b" },
          ],
        },
        {
          id: "university-c",
          name: "University C - Courses",
          data: [
            { name: "College of Education", y: 15, drilldown: "education-c" },
            { name: "College of Music", y: 5, drilldown: "music-c" },
            { name: "College of Technology", y: 5, drilldown: "tech-c" },
          ],
        },
        {
          id: "science-a",
          name: "Science - University A",
          data: [["Physics", 8], ["Chemistry", 6], ["Biology", 6]],
        },
        {
          id: "arts-a",
          name: "Arts - University A",
          data: [["History", 4], ["Literature", 3], ["Philosophy", 3]],
        },
        {
          id: "engineering-a",
          name: "Engineering - University A",
          data: [["Mechanical", 4], ["Civil", 3], ["Electrical", 3]],
        },
        {
          id: "business-b",
          name: "Business - University B",
          data: [["Marketing", 5], ["Finance", 5], ["HR", 5]],
        },
        {
          id: "medicine-b",
          name: "Medicine - University B",
          data: [["General", 6], ["Dentistry", 4]],
        },
        {
          id: "law-b",
          name: "Law - University B",
          data: [["Criminal", 5], ["Corporate", 5]],
        },
        {
          id: "education-c",
          name: "Education - University C",
          data: [["Math", 7], ["Science", 5], ["English", 3]],
        },
        {
          id: "music-c",
          name: "Music - University C",
          data: [["Composition", 3], ["Performance", 2]],
        },
        {
          id: "tech-c",
          name: "Technology - University C",
          data: [["IT", 3], ["Networking", 2]],
        },
      ],
    },
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default Piewithdrilldown;
