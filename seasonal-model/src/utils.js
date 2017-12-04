const getApiEndpoint = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8080';
  }

  return 'https://bkbklim.com/trading/backend';
};

export default getApiEndpoint;
