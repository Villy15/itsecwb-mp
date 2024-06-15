const HOST_URL =
  process.env.NODE_ENV === "production"
    ? "https://itsecwb-mp-express.onrender.com"
    : "http://localhost:8000";

export default HOST_URL;
