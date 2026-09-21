const BASE_URL = "http://localhost:5000";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("authToken");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

const handleResponse = async (response) => {
  if (response.status === 401) {
    sessionStorage.removeItem("authToken");

    window.location.href = "/login";

    throw new Error("Session expired. Please login again.");
  }

  if (!response.ok) {
    let message = "Request failed";

    try {
      const data = await response.json();
      message = data.error || message;
    } catch {
      // Response did not contain JSON
    }

    throw new Error(message);
  }

  return response.json();
};

// GET /tasks
export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  return handleResponse(response);
};

// POST /tasks
export const createTask = async (task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(task),
  });

  return handleResponse(response);
};

// PUT /tasks/:id
export const updateTask = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(updates),
  });

  return handleResponse(response);
};

// DELETE /tasks/:id
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return handleResponse(response);
};