import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, CONFIG } from '../App';
import { Grid, Activity, Lock, Brain, Network, Users, Blocks, CheckCircle, Zap, Settings, Server, Cpu, HardDrive, Wifi, Database } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [metrics, setMetrics] = useState({});
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const sections = [
    { id: 'overview', label: 'Overview', icon: Grid, path: '/' },
    { id: 'ai', label: 'AI Operations', icon: Brain, path: '/ai' },
    { id: 'federated', label: 'Federated Learning', icon: Network, path: '/federated' },
    { id: 'swarm', label: 'Swarm Intelligence', icon: Users, path: '/swarm' },
    { id: 'blockchain', label: 'Blockchain', icon: Blocks, path: '/blockchain' },
    { id: 'tasks', label: 'Tasks', icon: CheckCircle, path: '/tasks' },
    { id: 'ecommerce', label: 'E-commerce', icon: Zap, path: '/ecommerce' },
  ];

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`${CONFIG.API_URL}/api/status`);
        setMetrics(response.data);
      } catch (error) {
        console.error('Failed to fetch metrics', error);
      }
    };
    fetchMetrics();
  }, []);

  const OverviewSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Cpu className="w-6 h-6 text-indigo-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">System Metrics</h3>
        </div>
        <p className="text-gray-400">CPU: {metrics.metrics?.cpu_percent}%</p>
        <p className="text-gray-400">Memory: {metrics.metrics?.memory_percent}%</p>
        <p className="text-gray-400">Disk: {metrics.metrics?.disk_percent}%</p>
      </div>
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Database className="w-6 h-6 text-indigo-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Active Tasks</h3>
        </div>
        <p className="text-gray-400">Total: {metrics.tasks?.length || 0}</p>
        <p className="text-gray-400">Pending: {metrics.tasks?.filter(t => t.status === 'pending').length || 0}</p>
      </div>
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Blocks className="w-6 h-6 text-indigo-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Blockchain Txns</h3>
        </div>
        <p className="text-gray-400">Total: {metrics.txns?.length || 0}</p>
        <p className="text-gray-400">Confirmed: {metrics.txns?.filter(t => t.status === 'confirmed').length || 0}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card border-r border-gray-700 transition-all duration-300`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className={`${sidebarOpen ? 'block' : 'hidden'}`}>
              <h1 className="text-xl font-bold text-white">JTSALES</h1>
              <p className="text-sm text-gray-400">v2.1.0</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {sections.map(section => (
            <Link
              key={section.id}
              to={section.path}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                activeSection === section.id ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <section.icon className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">{section.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <div className={`${sidebarOpen ? 'block' : 'hidden'} bg-gray-700 rounded-lg p-3 mb-3`}>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-full mr-3" />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{user?.email}</p>
                <p className="text-gray-400 text-xs">{user?.role}</p>
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">{sections.find(s => s.id === activeSection)?.label}</h2>
            <p className="text-gray-400">
              {activeSection === 'overview' && 'System overview and real-time monitoring'}
            </p>
          </div>
          {activeSection === 'overview' && <OverviewSection />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
