import React, { useState } from 'react';
import axios from 'axios';
import { CONFIG } from '../App';
import { RefreshCw } from 'lucide-react';

const SwarmIntelligence = () => {
  const [problem, setProblem] = useState('sphere');
  const [dimensions, setDimensions] = useState('10');
  const [agents, setAgents] = useState('100');
  const [swarmId, setSwarmId] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const createSwarm = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${CONFIG.API_URL}/api/swarm/create`, {
        problem,
        dimensions: parseInt(dimensions),
        agents: parseInt(agents)
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.response?.data?.detail || 'Failed to create swarm'}`);
    } finally {
      setLoading(false);
    }
  };

  const stepSwarm = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${CONFIG.API_URL}/api/swarm/step`, { swarm_id: swarmId });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.response?.data?.detail || 'Failed to step swarm'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-6">Swarm Intelligence</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Problem</label>
              <select
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none"
              >
                <option value="sphere">Sphere</option>
                <option value="rastrigin">Rastrigin</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Dimensions</label>
              <input
                type="number"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g., 10"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Agents</label>
              <input
                type="number"
                value={agents}
                onChange={(e) => setAgents(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g., 100"
              />
            </div>
            <button
              onClick={createSwarm}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  Creating...
                </div>
              ) : (
                'Create Swarm'
              )}
            </button>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Swarm ID</label>
              <input
                type="text"
                value={swarmId}
                onChange={(e) => setSwarmId(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none"
                placeholder="Enter swarm ID"
              />
            </div>
            <button
              onClick={stepSwarm}
              disabled={loading || !swarmId}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  Stepping...
                </div>
              ) : (
                'Step Swarm'
              )}
            </button>
          </div>
          <div>
            <label
