import React, { useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { predictSimple } from '../services/api';
import { saveToHistory } from '../utils/storage';
import './Predict.css';

function Predict() {
  const [formData, setFormData] = useState({
    property_type: 'Home',
    property_size: 'Medium',
    people_count: 4,
    ac_usage: 'Medium',
    lighting_usage: 'Low',
    weather_condition: 'Normal',
    hour: 14,
    day_of_week: 2,
    holiday: 0,
    day: 15,
    month: 5
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleFormChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);
    
    try {
      const result = await predictSimple(formData);
      setPrediction(result);
      saveToHistory(result);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.detail || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      property_type: 'Home',
      property_size: 'Medium',
      people_count: 4,
      ac_usage: 'Medium',
      lighting_usage: 'Low',
      weather_condition: 'Normal',
      hour: 14,
      day_of_week: 2,
      holiday: 0,
      day: 15,
      month: 5
    });
    setPrediction(null);
    setError(null);
    setSaved(false);
  };

  return (
    <div className="predict-page">
      <div className="page-header">
        <h1>Single Prediction</h1>
        <p>Enter your building details for an accurate energy forecast</p>
      </div>

      <div className="predict-grid">
        <div className="form-section">
          <PredictionForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            isLoading={loading}
          />
          
          <div className="form-actions">
            <button onClick={handleReset} className="reset-btn">
              Reset Form
            </button>
          </div>
          
          {saved && (
            <div className="saved-toast">
              ✓ Prediction saved to history
            </div>
          )}
        </div>
        
        <div className="results-section">
          {loading && <LoadingSpinner />}
          {error && <ErrorAlert message={error} onRetry={handleSubmit} />}
          {prediction && !loading && <ResultCard prediction={prediction} />}
        </div>
      </div>
    </div>
  );
}

export default Predict;