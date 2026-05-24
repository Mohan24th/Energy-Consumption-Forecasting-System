const STORAGE_KEY = 'prediction_history';

export const saveToHistory = (prediction) => {
  const history = getHistory();
  const newEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...prediction
  };
  history.unshift(newEntry);
  // Keep only last 50 predictions
  const trimmed = history.slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  return newEntry;
};

export const getHistory = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const deleteFromHistory = (id) => {
  const history = getHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};