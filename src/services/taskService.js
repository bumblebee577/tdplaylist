import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/tasks";

export function getAllTasks(ownerId) {
  return http.get(apiEndpoint + "/" + ownerId);
}

export function getOneTask(ownerId, id) {
  return http.get(apiEndpoint + "/" + ownerId + "/" + id);
}

export function saveTask(task) {
  if (task._id) {
    const taskId = task._id;
    delete task._id;
    return http.put(apiEndpoint + "/" + taskId, task);
  }
  delete task._id;
  return http.post(apiEndpoint, task);
}

export function addTimeToTask(taskObj) {
  return http.patch(apiEndpoint + "/" + taskObj.id, {
    minsWorked: taskObj.minsWorked,
  });
}

export function deleteTask(id) {
  return http.delete(apiEndpoint + "/" + id);
}
