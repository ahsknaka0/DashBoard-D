import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ExploreMoreInformation from "./ExploreMoreInformation";
import Columnwithdrilldown from "./Columnwithdrilldown";
import Piewithdrilldown from "./Piewithdrilldown";

const VCDashboard = () => {
  // Existing chart configurations (unchanged)

  const areaChartOptions = {
    chart: { type: "area" },
    title: { text: "Retention Rates Over Time" },
    xAxis: { categories: ["2019", "2020", "2021", "2022", "2023"] },
    yAxis: { title: { text: "Percentage" } },
    series: [{ name: "Retention", data: [75, 78, 80, 82, 85] }],
  };

  const scatterChartOptions = {
    chart: { type: "scatter" },
    title: { text: "Student Grades Distribution" },
    xAxis: {
      title: { text: "Subjects" },
      categories: ["Math", "Science", "History", "Art", "PE"],
    },
    yAxis: { title: { text: "Grades" } },
    series: [
      { name: "Student 1", data: [85, 90, 78, 88, 76] },
      { name: "Student 2", data: [75, 80, 85, 70, 80] },
    ],
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      {/* Header */}
      <header className="bg-cyan-800 text-white dark:bg-cyan-700 py-4 px-6 shadow-lg rounded-md">
        <h1 className="text-2xl font-bold">More University Information</h1>
        <p className="text-sm">Overview of key university metrics and updates</p>
      </header>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {/* Enrollment Overview */}
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          University vs College Fees
        </h1>
          <Columnwithdrilldown />
        </div>

        {/* Financial Insights */}
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          University vs Courses
        </h1>
          <Piewithdrilldown />
        </div>

        {/* Retention Rates */}
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Retention Rates</h2>
          <HighchartsReact highcharts={Highcharts} options={areaChartOptions} />
        </div>

        {/* Grades Distribution */}
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Grades Distribution</h2>
          <HighchartsReact highcharts={Highcharts} options={scatterChartOptions} />
        </div>

        {/* More Information Section */}
        < ExploreMoreInformation />
      </div>
    </div>
  );
};

export default VCDashboard;
