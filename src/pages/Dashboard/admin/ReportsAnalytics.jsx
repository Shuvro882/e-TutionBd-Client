import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/loading/Loading";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ReportsAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  // ADMIN STATS
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  // PAYMENTS
  const { data: payments = [] } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data || [];
    },
  });

  // SAFE NUMBER + MONTHLY GROUPING
  const revenueByMonth = useMemo(() => {
    const map = {};

    payments.forEach((p) => {
      const amount = Number(p.amountBDT || 0); // FIXED TYPE ISSUE

      const month = new Date(p.paidAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      map[month] = (map[month] || 0) + amount;
    });

    return Object.entries(map).map(([month, revenue]) => ({
      month,
      revenue,
    }));
  }, [payments]);

  // Pie data
  const pieData = [
    { name: "Approved", value: stats?.approvedTuitions || 0 },
    { name: "Pending", value: stats?.pendingTuitions || 0 },
  ];

  const COLORS = ["#22c55e", "#f59e0b"];

  if (isLoading || !stats) return <Loading />;

  return (
    <div className="p-6 space-y-8">

      <h2 className="text-2xl font-bold text-center">
        Reports & Analytics
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="p-4 bg-base-200 rounded-lg shadow">
          <h3>Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="p-4 bg-base-200 rounded-lg shadow">
          <h3>Total Tuitions</h3>
          <p className="text-2xl font-bold">{stats.totalTuitions}</p>
        </div>

        <div className="p-4 bg-base-200 rounded-lg shadow">
          <h3>Total Revenue</h3>
          <p className="text-2xl font-bold">
            ৳ {Number(stats.totalRevenue || 0)}
          </p>
        </div>
      </div>

      {/* LINE CHART */}
      <div className="bg-base-200 p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-4">Monthly Revenue</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PIE */}
      <div className="bg-base-200 p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-4">Tuition Status</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR */}
      <div className="bg-base-200 p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-4">System Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Users", value: stats.totalUsers },
              { name: "Tutors", value: stats.totalTutors },
              { name: "Tuitions", value: stats.totalTuitions },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ReportsAnalytics;