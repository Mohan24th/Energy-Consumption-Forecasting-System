import React from 'react';
import './PredictionForm.css';

function PredictionForm({ formData, onChange, onSubmit, isLoading }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <form onSubmit={onSubmit} className="prediction-form">
      <div className="form-section">
        <h4>Property Details</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Property Type</label>
            <select name="property_type" value={formData.property_type} onChange={handleInputChange}>
              <option value="Home">Home</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className="form-group">
            <label>Property Size</label>
            <select name="property_size" value={formData.property_size} onChange={handleInputChange}>
              <option value="Small">Small (300 sq ft)</option>
              <option value="Medium">Medium (750 sq ft)</option>
              <option value="Large">Large (1000 sq ft)</option>
            </select>
          </div>

          <div className="form-group">
            <label>People Count</label>
            <input
              type="number"
              name="people_count"
              value={formData.people_count}
              onChange={handleInputChange}
              min="1"
              max="100"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h4>Usage Patterns</h4>
        <div className="form-row">
          <div className="form-group">
            <label>AC Usage</label>
            <select name="ac_usage" value={formData.ac_usage} onChange={handleInputChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Lighting Usage</label>
            <select name="lighting_usage" value={formData.lighting_usage} onChange={handleInputChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h4>Environmental</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Weather</label>
            <select name="weather_condition" value={formData.weather_condition} onChange={handleInputChange}>
              <option value="Cool">Cool (22°C)</option>
              <option value="Normal">Normal (28°C)</option>
              <option value="Hot">Hot (35°C)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h4>Date & Time</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Hour (0-23)</label>
            <input
              type="number"
              name="hour"
              value={formData.hour}
              onChange={handleInputChange}
              min="0"
              max="23"
            />
          </div>

          <div className="form-group">
            <label>Day of Week (0=Mon, 6=Sun)</label>
            <input
              type="number"
              name="day_of_week"
              value={formData.day_of_week}
              onChange={handleInputChange}
              min="0"
              max="6"
            />
          </div>

          <div className="form-group">
            <label>Holiday</label>
            <select name="holiday" value={formData.holiday} onChange={handleInputChange}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Day of Month</label>
            <input
              type="number"
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              min="1"
              max="31"
            />
          </div>

          <div className="form-group">
            <label>Month</label>
            <input
              type="number"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              min="1"
              max="12"
            />
          </div>
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="predict-btn">
        {isLoading ? 'Predicting...' : 'Predict Energy Consumption'}
      </button>
    </form>
  );
}

export default PredictionForm;