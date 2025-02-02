"use client";

import { FaArrowTrendUp, FaCalendarCheck, FaUsers } from "react-icons/fa6";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMetadata } from "@/hooks/useMetadata";

// Mock data untuk chart
const chartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 2000 },
  { name: 'Sep', value: 2780 },
  { name: 'Oct', value: 3890 },
  { name: 'Nov', value: 4300 },
  { name: 'Dec', value: 4900 },
];

// Interface untuk recent activities
interface Activity {
  id: number;
  title: string;
  time: string;
  type: string;
}

export default function DashboardPage() {
  useMetadata('Dashboard' , 'Dashboard page for the admin panel');
  // Mock data untuk recent activities
  const recentActivities: Activity[] = [
    { id: 1, title: 'New user registered', time: '5 min ago', type: 'user' },
    { id: 2, title: 'Sales report generated', time: '2 hours ago', type: 'report' },
    { id: 3, title: 'System update completed', time: '4 hours ago', type: 'system' },
    { id: 4, title: 'New order received', time: '1 day ago', type: 'order' },
    { id: 5, title: 'Customer feedback received', time: '3 days ago', type: 'feedback' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaArrowTrendUp className="text-3xl" />
            </div>
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value">$12,345</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>

        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-3xl" />
            </div>
            <div className="stat-title">Active Users</div>
            <div className="stat-value">2,345</div>
            <div className="stat-desc">15% increase</div>
          </div>
        </div>

        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-figure text-accent">
              <FaCalendarCheck className="text-3xl" />
            </div>
            <div className="stat-title">Total Orders</div>
            <div className="stat-value">1,234</div>
            <div className="stat-desc">8% from last month</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Sales Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="#4f46e5" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center gap-4 p-4 bg-base-200 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-base-content/70">{activity.time}</p>
                </div>
                <span className="badge badge-sm badge-primary badge-outline">
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}