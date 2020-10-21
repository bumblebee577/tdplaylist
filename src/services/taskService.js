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
    const taskId = task._id;
    delete task._id;
    return http.put(apiEndpoint + "/" + taskId, task);
  }
  return http.post(apiEndpoint, task);
}

export function deleteTask(id) {
  return http.delete(apiEndpoint + "/" + id);
}
