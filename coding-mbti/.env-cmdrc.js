module.exports = Promise.resolve({
  "local": {
    "REACT_APP_BACKEND_URL": "http://localhost:8000/api/",
  },
  "dev": {
    "REACT_APP_BACKEND_URL": "https://codingmbti-dev.shop/api/",
  },
  "prd": {
    "REACT_APP_BACKEND_URL": "https://codingmbti.shop/api/",
  }
});
