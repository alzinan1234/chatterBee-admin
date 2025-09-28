import React from 'react';
import { Users, AlertTriangle, DollarSign } from 'lucide-react';

function MetricCard({ title, value, icon: Icon, iconBgColor = "bg-blue-50", iconColor = "text-blue-500" }) {
  return (
    <div style={{ boxShadow: '0px 4px 14.7px 0px rgba(0, 0, 0, 0.25)' }} className="bg-white rounded-lg p-6 py-10 px-16 shadow-sm ">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className={`ml-4 p-3 rounded-lg ${iconBgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className=" p-4">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Active User"
            value={1548}
            icon={Users}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-500"
          />
          <MetricCard
            title="Caregiver Alerts"
            value={158}
            icon={AlertTriangle}
            iconBgColor="bg-yellow-50"
            iconColor="text-yellow-500"
          />
          <MetricCard
            title="Total Earning"
            value="$26,816"
            icon={DollarSign}
            iconBgColor="bg-green-50"
            iconColor="text-green-500"
          />
        </div>
      </div>
    </div>
  );
}