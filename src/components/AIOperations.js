import React, { useState } from 'react';
import axios from 'axios';
import { CONFIG } from '../App';
import { RefreshCw } from 'lucide-react';

const AIOperations = () => {
  const [operation, setOperation] = useState('generate');
  const [prompt, setPrompt] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const operations = [
    { id: 'generate', label: 'Text Generation' },
    { id: 'sentiment', label: 'Sentiment Analysis' },
    { id: 'question', label: 'Question Answering' },
    { id: 'summarize', label: 'Summarization' },
    { id: 'ner', label: 'Named Entity Recognition' },
    { id: 'predict', label: 'Prediction' }
  ];

  const executeOperation = async () => {
    setLoading(true);
    try {
      let response;
      switch (operation) {
        case 'generate':
          response = await axios.post(`${CONFIG.API_URL}/api/ai/generate`, { prompt });
          break;
        case 'sentiment':
          response = await axios.post(`${CONFIG.API_URL}/api/ai/sentiment`, { text });
          break;
        case 'question':
          response = await axios.post(`${CONFIG.API_URL}/api/ai/question`, { question: prompt, context: text });
          break;
        case 'summarize':
          response = await axios.post(`${CONFIG.API_URL}/api/ai/summarize`, { text });
          break;
        case 'ner':
          response = await axios.post(`${CONFIG.API_URL}/api/ai/ner`, { text });
          break;
        case 'predict':
          response = await axios.post(`${CONFIG.API_URL}/api/ai/predict`, { data: JSON.parse(text) });
          break;
        default:
          throw new Error('Invalid operation');
      }
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.response?.data?.detail || 'Operation failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">AI Operations</h3>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none"
          >
            {operations.map(op => (
              <option key={op.id} value={op.id}>{op.label}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Prompt/Input</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none h-32 resize-none"
                placeholder="Enter your prompt or input here..."
              />
            </div>
            {(operation === 'question' || operation === 'predict') && (
              <div>
                <label className="block text-gray-400 text-sm mb-2">{operation === 'question' ? 'Context' : 'Data'}</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 focus:border-indigo-500 focus:outline-none h-32 resize-none"
                  placeholder={operation === 'question' ? 'Enter context...' : 'Enter data as [[float, ...], ...]'}
                />
              </div>
            )}
            <button
              onClick={executeOperation}
              disabled={loading || !prompt}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                'Execute'
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

export default AIOperations;
