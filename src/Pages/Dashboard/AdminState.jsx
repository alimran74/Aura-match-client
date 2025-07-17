import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Shared/Spinner";

const COLORS = [
  "#8A9A5B", 
  "#A0522D", // light-yellow
  "#488B8F", // tea-green
  "#CC5500", // atomic-tangerine
];

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const chartData = [
    { name: "Total Biodata", value: stats.total || 0 },
    { name: "Male Biodata", value: stats.male || 0 },
    { name: "Female Biodata", value: stats.female || 0 },
    { name: "Premium Users", value: stats.premium || 0 },
  ];

  return (
    <div className="bg-[#cbdfbdff] p-4 rounded-2xl shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-[#f19c79]">Admin Overview</h2>

      {isLoading ? (
        <p className="text-center text-gray-500"><Spinner/></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Pie Chart */}
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Info */}
          <div className="bg-[#d4e09b] p-6 rounded-xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-[#f19c79] mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-[#333]">${stats.revenue || 0}</p>
            <p className="text-sm text-gray-600 mt-2">($5 x {stats.premium || 0} Premium Users)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStats;
