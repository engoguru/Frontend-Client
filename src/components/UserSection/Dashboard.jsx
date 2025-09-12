import React from 'react';

function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 space-y-10">
      
      {/* Centered User Info */}
      <div className="flex justify-center items-center h-64 bg-white shadow rounded">
        <ul className="space-y-2 text-lg font-medium text-gray-700">
          <li>Name: John Doe</li>
          <li>Phone: +1 234 567 890</li>
          <li>Email: john.doe@example.com</li>
        </ul>
      </div>

      {/* Recent Activity Table */}
      <div className="w-full bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Activity (In Progress)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Task</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-2">#001</td>
                <td className="px-4 py-2">Design Homepage</td>
                <td className="px-4 py-2 text-yellow-600 font-medium">In Progress</td>
                <td className="px-4 py-2">Sep 15, 2025</td>
              </tr>
              <tr>
                <td className="px-4 py-2">#002</td>
                <td className="px-4 py-2">API Integration</td>
                <td className="px-4 py-2 text-yellow-600 font-medium">In Progress</td>
                <td className="px-4 py-2">Sep 20, 2025</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
