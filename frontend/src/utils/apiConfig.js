const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_REACT_APP_API_URL
    : "http://localhost:3000";

export default BASE_URL;
