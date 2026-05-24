import React from 'react';
import './ResultCard.css';

function ResultCard({ prediction }) {
  const getUsageColor = (category) => {
    if (category === 'Low') return '#4caf50';
    if (category === 'Moderate') return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="result-card">
      <h3>Prediction Results</h3>
      
      <div className="results-grid">
        <div className="result-item">
          <span className="result-label">Hourly</span>
          <span className="result-value">{prediction.hourly_consumption_kwh} kWh</span>
          <span className="result-cost">₹{prediction.hourly_cost_inr}</span>
        </div>
        
        <div className="result-item">
          <span className="result-label">Daily</span>
          <span className="result-value">{prediction.daily_consumption_kwh} kWh</span>
          <span className="result-cost">₹{prediction.daily_cost_inr}</span>
        </div>
        
        <div className="result-item">
          <span className="result-label">Monthly</span>
          <span className="result-value">{prediction.monthly_consumption_kwh} kWh</span>
          <span className="result-cost">₹{prediction.monthly_cost_inr}</span>
        </div>
      </div>

      <div className="result-details">
        <div className="detail-row">
          <span>Time Period:</span>
          <strong>{prediction.time_period}</strong>
        </div>
        <div className="detail-row">
          <span>Weekend:</span>
          <strong>{prediction.is_weekend ? 'Yes' : 'No'}</strong>
        </div>
        <div className="detail-row">
          <span>Electricity Rate:</span>
          <strong>₹{prediction.electricity_rate_inr}/kWh</strong>
        </div>
        <div className="detail-row">
          <span>Usage Category:</span>
          <span 
            className="usage-badge"
            style={{ backgroundColor: getUsageColor(prediction.usage_category) }}
          >
            {prediction.usage_category}
          </span>
        </div>
      </div>

      <div className="recommendation-box">
        <strong>Recommendation</strong>
        <p>{prediction.recommendation}</p>
      </div>
    </div>
  );
}

export default ResultCard;