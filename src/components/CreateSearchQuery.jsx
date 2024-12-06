import React, { useState } from 'react';
import './CreateSearchQuery.css';
import { ArrowLeft, Play } from 'lucide-react';

const CreateSearchQuery = ({ runQuery }) => {
  const [query, setQuery] = useState('');
  const [showSeptResults, setShowSeptResults] = useState(false);

  const handleRunQuery = () => {
    if (showSeptResults) {
      runQuery(`${query} AND Results='Sep 2024'`);
    } else {
      runQuery(query);
    }
  };

  return (
    <div className="screener-container">
      <div className="screener-card">
        <h1>Create a Search Query</h1>

        <div className="form-container">
          <div className="query-section">
            <label className='quer'>Query</label>
            <div className="query-container">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your search query..."
              />
              <div className="example-card">
                <h3 className='example'>Custom query example</h3>
                <div className="example-text">
                  <p>ROE {'>'} 22 AND</p>
                  <p>P/E Ratio {'<'} 15 </p>
                </div>
              </div>
            </div>
          </div>

          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={showSeptResults}
                onChange={(e) => setShowSeptResults(e.target.checked)}
              />
              <span>Only companies with Sep 2024 results</span>
            </label>
          </div>

          <div className="button-container">
            <button className="primary-button" onClick={handleRunQuery}>
              <Play className="icon" />
              <span>RUN THIS QUERY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSearchQuery;
