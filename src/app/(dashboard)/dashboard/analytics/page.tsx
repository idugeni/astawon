'use client';

import {
  FaChartLine,
  FaUsers,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaEarthAmericas,
  FaTable,
  FaMobileScreen,
  FaGlobe,
} from 'react-icons/fa6';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { useMetadata } from '@/hooks/useMetadata';

const chartData = [
  { name: 'Jan', visits: 4000, revenue: 2400 },
  { name: 'Feb', visits: 3000, revenue: 1398 },
  { name: 'Mar', visits: 2000, revenue: 9800 },
  { name: 'Apr', visits: 2780, revenue: 3908 },
  { name: 'May', visits: 1890, revenue: 4800 },
  { name: 'Jun', visits: 2390, revenue: 3800 },
];

const trafficSources = [
  { name: 'Direct', value: 65, color: '#4f46e5' },
  { name: 'Social', value: 20, color: '#10b981' },
  { name: 'Referral', value: 10, color: '#f59e0b' },
  { name: 'Paid', value: 5, color: '#3b82f6' },
];

const deviceData = [
  { name: 'Desktop', value: 75, color: '#4f46e5' },
  { name: 'Mobile', value: 23, color: '#10b981' },
  { name: 'Tablet', value: 2, color: '#f59e0b' },
];

export default function AnalyticsPage() {
  useMetadata('Analytics', 'Analytics page for the admin panel');
  return (
    <div className='space-y-6'>
      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='stats shadow bg-base-100 hover:bg-base-200 transition-colors'>
          <div className='stat'>
            <div className='stat-figure text-primary'>
              <FaChartLine className='text-3xl' />
            </div>
            <div className='stat-title'>Total Visits</div>
            <div className='stat-value text-primary'>24.3K</div>
            <div className='stat-desc flex items-center gap-1'>
              <FaArrowUp className='text-success' />
              <span className='text-success'>12%</span> vs last month
            </div>
          </div>
        </div>

        <div className='stats shadow bg-base-100 hover:bg-base-200 transition-colors'>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaUsers className='text-3xl' />
            </div>
            <div className='stat-title'>Active Users</div>
            <div className='stat-value text-secondary'>2.8K</div>
            <div className='stat-desc flex items-center gap-1'>
              <FaArrowUp className='text-success' />
              <span className='text-success'>8%</span> vs last month
            </div>
          </div>
        </div>

        <div className='stats shadow bg-base-100 hover:bg-base-200 transition-colors'>
          <div className='stat'>
            <div className='stat-figure text-accent'>
              <FaClock className='text-3xl' />
            </div>
            <div className='stat-title'>Avg. Duration</div>
            <div className='stat-value text-accent'>3.2m</div>
            <div className='stat-desc flex items-center gap-1'>
              <FaArrowDown className='text-error' />
              <span className='text-error'>2%</span> vs last month
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Line Chart */}
        <div className='card bg-base-100 shadow-lg'>
          <div className='card-body'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='card-title'>
                <FaChartLine className='text-primary' />
                Website Performance
              </h2>
              <select className='select select-bordered select-sm'>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className='h-64'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={chartData}>
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--b1))',
                      borderColor: 'hsl(var(--b3))',
                      borderRadius: 'var(--rounded-box)',
                    }}
                  />
                  <Line
                    type='monotone'
                    dataKey='visits'
                    stroke='#4f46e5'
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type='monotone'
                    dataKey='revenue'
                    stroke='#10b981'
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className='card bg-base-100 shadow-lg'>
          <div className='card-body'>
            <h2 className='card-title mb-4'>
              <FaGlobe className='text-secondary' />
              Traffic Sources
            </h2>
            <div className='flex flex-col lg:flex-row items-center gap-8'>
              <div className='w-full lg:w-1/2 h-48'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx='50%'
                      cy='50%'
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey='value'
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className='w-full lg:w-1/2 space-y-4'>
                {trafficSources.map((source) => (
                  <div key={source.name} className='flex items-center gap-4'>
                    <div
                      className='w-4 h-4 rounded-full'
                      style={{ backgroundColor: source.color }}
                    ></div>
                    <div className='flex-1'>
                      <div className='flex justify-between'>
                        <span>{source.name}</span>
                        <span className='font-bold'>{source.value}%</span>
                      </div>
                      <progress
                        className='progress progress-primary'
                        value={source.value}
                        max='100'
                      ></progress>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Breakdown & Top Pages */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Device Breakdown */}
        <div className='card bg-base-100 shadow-lg'>
          <div className='card-body'>
            <h2 className='card-title mb-4'>
              <FaMobileScreen className='text-accent' />
              Device Breakdown
            </h2>
            <div className='h-64'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={deviceData}>
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='value' radius={[4, 4, 0, 0]} fill='#4f46e5' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Pages Table */}
        <div className='card bg-base-100 shadow-lg'>
          <div className='card-body'>
            <h2 className='card-title mb-4'>
              <FaTable className='text-primary' />
              Top Performing Pages
            </h2>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Visits</th>
                    <th>Conversion</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td>/dashboard/analytics</td>
                      <td>{(i * 1234).toLocaleString()}</td>
                      <td>{(i * 5.2).toFixed(1)}%</td>
                      <td>
                        {i % 2 === 0 ? (
                          <div className='text-success flex items-center gap-1'>
                            <FaArrowUp /> +{(i * 1.2).toFixed(1)}%
                          </div>
                        ) : (
                          <div className='text-error flex items-center gap-1'>
                            <FaArrowDown /> -{(i * 0.5).toFixed(1)}%
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className='card bg-base-100 shadow-lg'>
        <div className='card-body'>
          <h2 className='card-title mb-4'>
            <FaEarthAmericas className='text-secondary' />
            Geographic Distribution
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              {['United States', 'India', 'Germany', 'Japan'].map(
                (country, index) => (
                  <div key={country} className='flex items-center gap-4'>
                    <div className='avatar'>
                      <div className='w-12 rounded-full bg-base-200 flex items-center justify-center'>
                        <span className='text-xl'>🌎</span>
                      </div>
                    </div>
                    <div className='flex-1'>
                      <div className='flex justify-between mb-2'>
                        <span className='font-bold'>{country}</span>
                        <span>{(75 - index * 15).toFixed(1)}%</span>
                      </div>
                      <progress
                        className='progress progress-primary'
                        value={75 - index * 15}
                        max='100'
                      ></progress>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className='h-64'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey='value'
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
