import React, { useState } from 'react'
import { BarChart, Bell, Calendar, CreditCard, Home, Menu, MessageSquare, PieChart, Settings, User, X } from 'lucide-react'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home' },
    { icon: <BarChart size={20} />, label: 'Analytics' },
    { icon: <CreditCard size={20} />, label: 'Transactions' },
    { icon: <MessageSquare size={20} />, label: 'Messages' },
    { icon: <Calendar size={20} />, label: 'Calendar' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ]

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4">
        <span className="text-2xl font-semibold">Dashboard</span>
        <button onClick={toggleSidebar} className="lg:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <a key={index} href="#" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200">
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}

const Header = ({ toggleSidebar }) => (
  <header className="bg-white shadow-md">
    <div className="flex items-center justify-between px-4 py-3">
      <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700">
        <Menu size={24} />
      </button>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell size={20} />
        </button>
        <button className="flex items-center text-sm text-gray-700 hover:text-gray-900">
          <User size={20} className="mr-2" />
          <span>John Doe</span>
        </button>
      </div>
    </div>
  </header>
)

const Widget = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-semibold mt-1">{value}</p>
      </div>
      <div className="text-blue-500">{icon}</div>
    </div>
  </div>
)

const Chart = ({ title }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
      <p className="text-gray-500">Chart Placeholder</p>
    </div>
  </div>
)

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold mb-6">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Widget title="Total Revenue" value="$54,321" icon={<CreditCard size={24} />} />
              <Widget title="Total Users" value="12,345" icon={<User size={24} />} />
              <Widget title="New Orders" value="89" icon={<BarChart size={24} />} />
              <Widget title="Pending Issues" value="5" icon={<MessageSquare size={24} />} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Chart title="Revenue Over Time" />
              <Chart title="User Acquisition" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

