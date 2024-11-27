import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Drilldown from "highcharts/modules/drilldown";

// Initialize drilldown module
Drilldown(Highcharts);

const DashboardMetrics = () => {
  const generatePieChartOptions = (data, title, drilldownData) => ({
    chart: {
      type: "pie",
      height: 200,
      width: 250,
    },
    title: { text: title, style: { fontSize: "10px" } },
    series: [
      {
        name: title,
        data,
        size: "60%",
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y}%",
          style: { fontSize: "8px" },
        },
      },
    ],
    drilldown: {
      series: drilldownData,
    },
    tooltip: { pointFormat: "{point.name}: <b>{point.y}%</b>" },
  });

  const activeStudentsData = [
    { name: "College A", y: 40, drilldown: "collegeA" },
    { name: "College B", y: 30, drilldown: "collegeB" },
    { name: "College C", y: 30, drilldown: "collegeC" },
  ];
  const activeStudentsDrilldown = [
    { id: "collegeA", name: "College A Departments", data: [["Dept 1", 15], ["Dept 2", 15], ["Dept 3", 10]] },
    { id: "collegeB", name: "College B Departments", data: [["Dept 1", 10], ["Dept 2", 10], ["Dept 3", 10]] },
    { id: "collegeC", name: "College C Departments", data: [["Dept 1", 20], ["Dept 2", 5], ["Dept 3", 5]] },
  ];

  const admissionsData = [
    { name: "College A", y: 50, drilldown: "admissionsA" },
    { name: "College B", y: 30, drilldown: "admissionsB" },
    { name: "College C", y: 20, drilldown: "admissionsC" },
  ];
  const admissionsDrilldown = [
    { id: "admissionsA", name: "College A Departments", data: [["Dept X", 25], ["Dept Y", 15], ["Dept Z", 10]] },
    { id: "admissionsB", name: "College B Departments", data: [["Dept X", 10], ["Dept Y", 15], ["Dept Z", 5]] },
    { id: "admissionsC", name: "College C Departments", data: [["Dept X", 5], ["Dept Y", 10], ["Dept Z", 5]] },
  ];

  const revenueData = [
    { name: "Fees Collected", y: 90, drilldown: "feesCollected" },
    { name: "Balance Due", y: 10, drilldown: "balanceDue" },
  ];
  const revenueDrilldown = [
    { id: "feesCollected", name: "Fees Breakdown", data: [["Semester 1", 50], ["Semester 2", 40]] },
    { id: "balanceDue", name: "Outstanding Balance", data: [["Late Payments", 5], ["Pending Payments", 5]] },
  ];

  const employeesData = [
    { name: "Teaching", y: 67, drilldown: "teachingStaff" },
    { name: "Non-Teaching", y: 33, drilldown: "nonTeachingStaff" },
  ];
  const employeesDrilldown = [
    { id: "teachingStaff", name: "Teaching Staff", data: [["Professors", 40], ["Assistants", 20], ["Lecturers", 7]] },
    { id: "nonTeachingStaff", name: "Non-Teaching Staff", data: [["Clerks", 20], ["Maintenance", 13]] },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {[{
        title: "Active Students",
        total: "1,200",
        data: activeStudentsData,
        drilldown: activeStudentsDrilldown,
        additionalInfo: null,
      }, {
        title: "Total Admissions",
        total: "500",
        data: admissionsData,
        drilldown: admissionsDrilldown,
        additionalInfo: null,
      }, {
        title: "Total Revenue",
        total: "₹2,000,000",
        data: revenueData,
        drilldown: revenueDrilldown,
        additionalInfo: ["Fees: ₹1,800,000", "Balance: ₹200,000"],
      }, {
        title: "Total Employees",
        total: "300",
        data: employeesData,
        drilldown: employeesDrilldown,
        additionalInfo: ["Teaching: 200", "Non-Teaching: 100"],
      }].map(({ title, total, data, drilldown, additionalInfo }) => (
        <div key={title} className="flex flex-col bg-white dark:bg-gray-800 rounded-md shadow-md p-4 space-y-4">
          <div className="flex justify-center items-center">
            <HighchartsReact highcharts={Highcharts} options={generatePieChartOptions(data, title, drilldown)} />
          </div>
          <div className="w-full flex flex-col justify-center text-center sm:text-right">
            <h2 className="text-sm sm:text-base font-bold">{title}</h2>
            <p className="text-xs sm:text-base">Total: {total}</p>
            {additionalInfo && additionalInfo.map((info, idx) => (
              <p key={idx} className="text-xs sm:text-sm">{info}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
