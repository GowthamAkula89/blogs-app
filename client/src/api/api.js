import axios from "axios";

const api = axios.create({

  baseURL: "http://localhost:8081/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error) => {
  if (error.response) {
    console.error("Error response:", error.response);
    return {
      success: false,
      message: error.response.data.message || "An error occurred.",
    };
  } else if (error.request) {
    console.error("Error request:", error.request);
    return { success: false, message: "No response from the server." };
  } else {
    console.error("Error message:", error.message);
    return { success: false, message: error.message };
  }
};

// User authentication API calls

export const loginUser = async (credentials) => {
  try {
    const res = await api.post(`/auth/login`, credentials);

    if (res.data.token) {
      console.log(res.data.token)
      localStorage.setItem("blogAuthToken", res.data.token.token);
      localStorage.setItem("userName", res.data.fullName); 
    }

    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const signupUser = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("blogAuthToken");
    const res = await api.post("/auth/logout");
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

// Blog API calls

export const fetchBlogsByLocation = async (location) => {
  try {
    const res = await api.get(`/blogs/${location}`);
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const fetchBlogById = async (id) => {
  try {
    const res = await api.get(`/blogs/${id}`);
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

// Fetch user blogs
export const fetchBlogsByUser = async () => {
  const token = localStorage.getItem("blogAuthToken")
  try {
    const res = await api.get("/blogs/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const createBlog = async (blogData) => {
  const token = localStorage.getItem("blogAuthToken")
  try {
    const res = await api.post("/blogs", blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateBlog = async (id, blogData) => {
  const token = localStorage.getItem("blogAuthToken")
  try {
    const res = await api.put(`/blogs/${id}`, blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteBlog = async (id) => {
  try {
    const token = localStorage.getItem("blogAuthToken");
    console.log(token)
    const res = await api.delete(`/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};


