
 "use client";
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChevronDown, Users, TrendingUp } from 'lucide-react';

// Data matching the chart in your image
const activityData = [
  { name: 'Feb', value: 110 },    
  { name: 'Mar', value: 85 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 95 },
  { name: 'Jun', value: 115 },
  { name: 'Jul', value: 82 },
  { name: 'Aug', value: 90 },
  { name: 'Sep', value: 80 },
  { name: 'Oct', value: 60 },
  { name: 'Nov', value: 95 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg border-0">
        <p className="text-gray-200 text-sm font-medium">{label}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <p className="text-white font-semibold">{payload[0].value}</p>
        </div>
        <p className="text-gray-300 text-xs mt-1">Total usage</p>
        <p className="text-green-400 text-xs font-medium">+67%</p>
      </div>
    );
  }
  return null;
};

function StatCard({ title, value, icon: Icon, bgColor = "bg-blue-50", iconColor = "text-blue-500" }) {
  return (
    <div className="bg-white  rounded-lg  border  flex items-center justify-center " style={{ boxShadow: '0px 4px 14.7px 0px rgba(0, 0, 0, 0.25)' }}>
      <div className="flex items-center justify-center gap-4 border">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

export default function NonverbalActivityDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const periods = ['Monthly', 'Weekly', 'Daily'];

  return (
    <div className=" w-full  rounded-xl p-4 bg-white">
      <div className=" w-full flex gap-10 ">
        {/* Main Chart Section */}
        <div style={{ boxShadow: '0px 4px 14.7px 0px rgba(0, 0, 0, 0.25)' }} className="bg-white w-full  rounded-xl shadow-sm border border-gray-100 p-8 ">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <h2 className="text-xl font-semibold text-gray-900">Nonverbal User Activity</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FDD268]"></div>
                <span className="text-sm text-gray-600 font-medium">Revenue</span>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span>{selectedPeriod}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  {periods.map((period) => (
                    <button
                      key={period}
                      onClick={() => {
                        setSelectedPeriod(period);
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="h-80 w-full ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barCategoryGap="25%"
              >
                <CartesianGrid 
                  strokeDasharray="none" 
                  vertical={false} 
                  stroke="#f3f4f6" 
                  strokeWidth={1}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fill: '#9ca3af', 
                    fontSize: 13, 
                    fontWeight: 500 
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fill: '#9ca3af', 
                    fontSize: 12, 
                    fontWeight: 500 
                  }}
                  domain={[0, 120]}
                  ticks={[0, 40, 70, 90, 120]}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#FDD268" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* August Highlight Box */}
          {/* <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-lg">
            <p className="text-xs text-gray-500 mb-1">August</p>
            <p className="text-lg font-bold text-gray-900 mb-1">90</p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Total usage</span>
              <span className="text-xs text-green-500 font-semibold">+67%</span>
            </div>
          </div> */}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6  w-1/3">
          <StatCard
            title="Active Subscriptions"
            value="2488"
            icon={Users}
            bgColor="bg-blue-50"
            iconColor="text-blue-500"
          />
          <StatCard
            title="Avg. Subscriptions Value"
            value="248"
            icon={TrendingUp}
            bgColor="bg-purple-50"
            iconColor="text-purple-500"
          />
        </div>
      </div>
    </div>
  );
}