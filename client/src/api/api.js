import axios from "axios";

const api = axios.create({

  baseURL: "https://blogs-app-bksv.onrender.com/api", 
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

// Function to fetch all blogs 
export const fetchBlogs = async (apiBaseUrl, token) => {
  const url = `${apiBaseUrl}blogs/`;
  const response = await fetch(url, {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      throw new Error("Failed to fetch blogs.");
  }

  return response.json();
};

// Function to delete a blog by its ID
export const deleteBlog = async (apiBaseUrl, id, token) => {
  const url = `${apiBaseUrl}blogs/${id}`;
  const response = await fetch(url, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      },
  });

  if (response.ok) {
      if (response.status !== 204) {
          try {
              return await response.json();
          } catch (error) {
              return null;
          }
      }
  } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete the blog.");
  }
};

// Function to create a new blog
export const createBlog = async (apiBaseUrl, blogData, token) => {
  const url = `${apiBaseUrl}blogs/`;
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create the blog.");
  }

  return response.json();
};

// Function to update an existing blog by its ID
export const updateBlog = async (apiBaseUrl, id, blogData, token) => {
  const url = `${apiBaseUrl}blogs/${id}`;
  const response = await fetch(url, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update the blog.");
  }

  return response.json();
};
