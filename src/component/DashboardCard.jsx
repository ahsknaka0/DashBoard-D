import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DashboardGrid = () => {
  // Data for Employee Pie Chart
  const employeeData = {
    teaching: 120,
    nonTeaching: 80,
  };
  const employeeChartOptions = {
    chart: { type: "pie" },
    title: { text: "Employee Breakdown" },
    series: [
      {
        name: "Employees",
        data: [
          { name: "Teaching", y: employeeData.teaching },
          { name: "Non-Teaching", y: employeeData.nonTeaching },
        ],
      },
    ],
  };

  // Data for Admissions Drilldown Pie Chart
  const admissionData = [
    {
      name: "College A",
      total: 500,
      departments: [
        { name: "Dept 1", total: 200 },
        { name: "Dept 2", total: 300 },
      ],
    },
    {
      name: "College B",
      total: 700,
      departments: [
        { name: "Dept 1", total: 400 },
        { name: "Dept 2", total: 300 },
      ],
    },
  ];
  const admissionChartOptions = {
    chart: { type: "pie" },
    title: { text: "Admissions by College and Department" },
    series: [
      {
        name: "Admissions",
        data: admissionData.map((college) => ({
          name: college.name,
          y: college.total,
          drilldown: college.name,
        })),
      },
    ],
    drilldown: {
      series: admissionData.map((college) => ({
        name: college.name,
        id: college.name,
        data: college.departments.map((dept) => [dept.name, dept.total]),
      })),
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* Active Students Card */}
      <div className="flex-1 h-[250px] bg-white dark:bg-gray-800 rounded-md shadow-md flex">
        <div className="w-full sm:w-1/2 p-4 border-r border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold">Active Students</h2>
          <p>Total Students: 5000</p>
        </div>
        <div className="w-full sm:w-1/2 p-4">
          <p>College-wise Data</p>
        </div>
      </div>

      {/* Total Revenue Card */}
      <div className="flex-1 h-[250px] bg-white dark:bg-gray-800 rounded-md shadow-md flex">
        <div className="w-full sm:w-1/2 p-4 border-r border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold">Total Revenue</h2>
          <p>Total: $1,000,000</p>
        </div>
        <div className="w-full sm:w-1/2 p-4 flex flex-col justify-between">
          <div>To: [Date], Till: [Date]</div>
          <div>Balance: $200,000</div>
        </div>
      </div>

      {/* Total Employees Card */}
      <div className="flex-1 h-[250px] bg-white dark:bg-gray-800 rounded-md shadow-md flex">
        <div className="w-full sm:w-1/2 p-4 border-r border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold">Total Employees</h2>
          <p>Total Employees: 200</p>
        </div>
        <div className="w-full sm:w-1/2 p-4">
          <p>Teaching: 120</p>
          <p>Non-Teaching: 80</p>
          <HighchartsReact highcharts={Highcharts} options={employeeChartOptions} />
        </div>
      </div>

      {/* Admissions Card */}
      <div className="flex-1 h-[250px] bg-white dark:bg-gray-800 rounded-md shadow-md flex">
        <div className="w-full sm:w-1/2 p-4 border-r border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold">Admissions</h2>
          <p>Total Admissions: 1200</p>
        </div>
        <div className="w-full sm:w-1/2 p-4">
          <HighchartsReact highcharts={Highcharts} options={admissionChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
