import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Drilldown from "highcharts/modules/drilldown";

// Initialize drilldown module
Drilldown(Highcharts);
const DashboardMetrics = () => {
  const pieChartOptions = (data, title) => ({
    chart: {
      type: "pie",
      height: 200,
      width: 200,
    },
    title: { text: title, style: { fontSize: "10px" } },
    series: [
      {
        data,
        size: "60%",
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y}%",
          style: { fontSize: "8px" },
        },
      },
    ],
    tooltip: { pointFormat: "{point.name}: <b>{point.y}%</b>" },
  });
  // Active Students Data
  const activeStudentsData = [
    { name: "College A", y: 40, drilldown: "collegeA" },
    { name: "College B", y: 30, drilldown: "collegeB" },
    { name: "College C", y: 30, drilldown: "collegeC" },
  ];
  const activeStudentsDrilldown = [
    {
      id: "collegeA",
      name: "College A Departments",
      data: [
        ["Dept 1", 15],
        ["Dept 2", 15],
        ["Dept 3", 10],
      ],
    },
    {
      id: "collegeB",
      name: "College B Departments",
      data: [
        ["Dept 1", 10],
        ["Dept 2", 10],
        ["Dept 3", 10],
      ],
    },
    {
      id: "collegeC",
      name: "College C Departments",
      data: [
        ["Dept 1", 20],
        ["Dept 2", 5],
        ["Dept 3", 5],
      ],
    },
  ];

  // Admissions Data
  const admissionsData = [
    { name: "College A", y: 50, drilldown: "admissionsA" },
    { name: "College B", y: 30, drilldown: "admissionsB" },
    { name: "College C", y: 20, drilldown: "admissionsC" },
  ];
  const admissionsDrilldown = [
    {
      id: "admissionsA",
      name: "College A Departments",
      data: [
        ["Dept X", 25],
        ["Dept Y", 15],
        ["Dept Z", 10],
      ],
    },
    {
      id: "admissionsB",
      name: "College B Departments",
      data: [
        ["Dept X", 10],
        ["Dept Y", 15],
        ["Dept Z", 5],
      ],
    },
    {
      id: "admissionsC",
      name: "College C Departments",
      data: [
        ["Dept X", 5],
        ["Dept Y", 10],
        ["Dept Z", 5],
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* Active Students */}
      <div className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 rounded-md shadow-md p-4">
        <HighchartsReact
          highcharts={Highcharts}
          options={pieChartOptions(
            activeStudentsData,
            "Active Students",
            activeStudentsDrilldown
          )}
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold">Active Students</h2>
          <p>Total: 1,200</p>
        </div>
      </div>

      {/* Total Admissions */}
      <div className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 rounded-md shadow-md p-4">
        <HighchartsReact
          highcharts={Highcharts}
          options={pieChartOptions(
            admissionsData,
            "Total Admissions",
            admissionsDrilldown
          )}
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold">Total Admissions</h2>
          <p>Total: 500</p>
        </div>
      </div>


      {/* Total Revenue */}
      <div className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 rounded-md shadow-md p-4">
        <HighchartsReact
          highcharts={Highcharts}
          options={pieChartOptions(
            [
              { name: "Fees Collected", y: 90 },
              { name: "Balance Due", y: 10 },
            ],
            "Revenue Breakdown"
          )}
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold">Total Revenue</h2>
          <p>Total: ₹2,000,000</p>
          <p>Fees: ₹1,800,000</p>
          <p>Balance: ₹200,000</p>
        </div>
      </div>

      {/* Total Employees */}
      <div className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 rounded-md shadow-md p-4">
        <HighchartsReact
          highcharts={Highcharts}
          options={pieChartOptions(
            [
              { name: "Teaching", y: 67 },
              { name: "Non-Teaching", y: 33 },
            ],
            "Employee Breakdown"
          )}
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold">Total Employees</h2>
          <p>Total: 300</p>
          <p>Teaching: 200</p>
          <p>Non-Teaching: 100</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
