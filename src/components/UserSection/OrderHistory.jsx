import React from 'react';

function OrderHistory() {
  // Sample data - you can replace this with real API data later
  const orders = [
    { id: '#101', item: 'iPhone 14', status: 'Completed', date: '2025-08-01' },
    { id: '#102', item: 'AirPods Pro', status: 'Failed', date: '2025-08-05' },
    { id: '#103', item: 'MacBook Air', status: 'Completed', date: '2025-08-10' },
    { id: '#104', item: 'Apple Watch', status: 'Failed', date: '2025-08-15' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order History</h2>

        <div className="">
          <table className=" table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-2 py-2">Order ID</th>
                <th className="px-2 py-2">Item</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.item}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
