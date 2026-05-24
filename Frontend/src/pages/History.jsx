import React, { useState, useEffect } from 'react';
import { getHistory, clearHistory, deleteFromHistory } from '../utils/storage';
import './History.css';

function History() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = getHistory();
    setHistory(data);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      loadHistory();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this prediction?')) {
      deleteFromHistory(id);
      loadHistory();
    }
  };

  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;
    return item.usage_category.toLowerCase() === filter.toLowerCase();
  });

  const stats = {
    total: history.length,
    avgDaily: history.reduce((sum, item) => sum + item.daily_consumption_kwh, 0) / (history.length || 1),
    avgCost: history.reduce((sum, item) => sum + item.daily_cost_inr, 0) / (history.length || 1),
    lowCount: history.filter(item => item.usage_category === 'Low').length,
    moderateCount: history.filter(item => item.usage_category === 'Moderate').length,
    highCount: history.filter(item => item.usage_category === 'High').length
  };

  return (
    <div className="history-page">
      <div className="page-header">
        <h1>Prediction History</h1>
        <p>View and manage your past predictions</p>
      </div>

      <div className="stats-section">
        <div className="stat-box">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Predictions</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.avgDaily.toFixed(1)} kWh</div>
          <div className="stat-label">Avg Daily Usage</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">₹{stats.avgCost.toFixed(0)}</div>
          <div className="stat-label">Avg Daily Cost</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.lowCount}</div>
          <div className="stat-label">Low Usage</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.moderateCount}</div>
          <div className="stat-label">Moderate</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.highCount}</div>
          <div className="stat-label">High Usage</div>
        </div>
      </div>

      <div className="history-controls">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'low' ? 'active' : ''}`}
            onClick={() => setFilter('low')}
          >
            Low
          </button>
          <button 
            className={`filter-btn ${filter === 'moderate' ? 'active' : ''}`}
            onClick={() => setFilter('moderate')}
          >
            Moderate
          </button>
          <button 
            className={`filter-btn ${filter === 'high' ? 'active' : ''}`}
            onClick={() => setFilter('high')}
          >
            High
          </button>
        </div>
        <button onClick={handleClearAll} className="clear-btn">
          Clear All
        </button>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"></div>
          <p>No predictions yet. Make your first prediction!</p>
        </div>
      ) : (
        <div className="history-list">
          {filteredHistory.map((item) => (
            <div key={item.id} className="history-card">
              <div className="history-header">
                <span className="history-date">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="delete-btn"
                >
                  ×
                </button>
              </div>
              <div className="history-body">
                <div className="history-property">
                  <span className="badge">{item.property_type}</span>
                  <span className="badge">{item.usage_category}</span>
                </div>
                <div className="history-stats">
                  <div>
                    <span>Daily:</span>
                    <strong>{item.daily_consumption_kwh} kWh</strong>
                  </div>
                  <div>
                    <span>Cost:</span>
                    <strong>₹{item.daily_cost_inr}</strong>
                  </div>
                  <div>
                    <span>Monthly:</span>
                    <strong>₹{item.monthly_cost_inr}</strong>
                  </div>
                </div>
                <div className="history-recommendation">
                  {item.recommendation.substring(0, 100)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;