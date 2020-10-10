import http from "../services/httpService";

const apiEndpoint = "http://localhost:3900/api/tasks";

export function getAllTasks() {
  return http.get(apiEndpoint);
}

export function getOneTask(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function saveTask(task) {
  if (task._id) {
    const existingTask = { ...task };
    delete existingTask._id;
    return http.put(apiEndpoint + "/" + task._id, existingTask);
  }
  return http.post(apiEndpoint, task);
}

export function deleteTask(id) {
  return http.delete(apiEndpoint + "/" + id);
}
