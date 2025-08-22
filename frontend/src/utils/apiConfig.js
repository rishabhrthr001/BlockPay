const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL // your Render backend
    : "http://localhost:3000"; // your local backend

export default BASE_URL;
