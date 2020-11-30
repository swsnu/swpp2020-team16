module.exports = Promise.resolve({
  "local": {
    "REACT_APP_BACKEND_URL": "http://localhost:8000/api/",
  },
  "dev": {
    "REACT_APP_BACKEND_URL": "http://ec2-54-146-103-181.compute-1.amazonaws.com/api/",
  },
  "prd": {
    "REACT_APP_BACKEND_URL": "http://ec2-3-218-239-17.compute-1.amazonaws.com/api/",
  }
});
