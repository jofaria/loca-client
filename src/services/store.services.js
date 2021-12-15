import axios from "axios";

class StoreService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/stores
  createOne = async (requestBody) => {
    return this.api.post("/api/stores", requestBody);
  };

  // GET /api/stores
  getAll = async () => {
    return this.api.get("/api/stores");
  };

  // GET /api/stores/:id
  getOne = async (id) => {
    return this.api.get(`/api/stores/${id}`);
  };

  // PUT /api/stores/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/stores/edit/${id}`, requestBody);
  };

  // DELETE /api/stores/:id
  deleteOne = async (id) => {
    return this.api.delete(`/api/stores/delete/${id}`);
  };
}

// Create one instance of the service
const storeService = new StoreService();

export default storeService;
