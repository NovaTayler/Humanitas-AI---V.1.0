import React, { useState } from 'react';
import axios from 'axios';
import { CONFIG } from '../App';
import { RefreshCw } from 'lucide-react';

const FederatedLearning = () => {
  const [architecture, setArchitecture] = useState('{"input_size": 100, "output_size": 10}');
  const [participants, setParticipants] = useState('["node1", "node2"]');
  const [roundId, setRoundId] = useState('');
  const [weights, setWeights] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const createRound = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${CONFIG.API_URL}/api/federated/create`, {
        model_architecture: JSON.parse(architecture),
        participants: JSON.parse(participants)
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.response?.data?.detail || 'Failed to create round'}`);
    } finally {
      setLoading(false);
    }
  };

  const submitUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${CONFIG.API_URL}/api/federated/update`, {
        round_id: roundId,
        model_weights: new TextEncoder().encode(weights)
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.response?.data?.detail || 'Failed to submit update'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-6">Federated Learning</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Model Architecture (JSON)</label>
              <textarea
                value={architecture}
                onChange={(e) => setArchitecture(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none h-32 resize-none font-mono text-sm"
                placeholder='{"input_size": 100, "output_size": 10}'
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Participants (JSON Array)</label>
              <textarea
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none h-32 resize-none font-mono text-sm"
                placeholder='["node1", "node2"]'
              />
            </div>
            <button
              onClick={createRound}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  Creating...
                </div>
              ) : (
                'Create Round'
              )}
            </button>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Round ID</label>
              <input
                type="text"
                value={roundId}
                onChange={(e) => setRoundId(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none"
                placeholder="Enter round ID"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Model Weights</label>
              <textarea
                value={weights}
                onChange={(e) => setWeights(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none h-32 resize-none font-mono text-sm"
                placeholder="Enter serialized weights"
              />
            </div>
            <button
              onClick={submitUpdate}
              disabled={loading || !roundId || !weights}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </div>
              ) : (
                'Submit Update'
              )}
            </button>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Result</label>
            <textarea
              value={result}
              readOnly
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 h-64 resize-none font-mono text-sm"
              placeholder="Result will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FederatedLearning;
