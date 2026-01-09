const API_URL = 'http://localhost:5000/api/daylog';

export const getDayLogs = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch day logs');
  }
  return response.json();
};

export const getDayLog = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch day log');
  }
  return response.json();
};

export const createDayLog = async (dayLog) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dayLog),
  });
  if (!response.ok) {
    throw new Error('Failed to create day log');
  }
  return response.json();
};
