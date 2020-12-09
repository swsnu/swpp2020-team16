module.exports = Promise.resolve({
  "local": {
    "REACT_APP_BACKEND_URL": "https://0.0.0.0:8000/api/",
  },
  "dev": {
    "REACT_APP_BACKEND_URL": "https://b-codingmbti-dev.shop/api/",
  },
  "prd": {
    "REACT_APP_BACKEND_URL": "https://b-codingmbti.shop/api/",
  }
});
