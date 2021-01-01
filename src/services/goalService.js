import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/goals";

export function getAllGoals(ownerId) {
  return http.get(apiEndpoint + "/" + ownerId);
}

export function getOneGoal(ownerId, id) {
  return http.get(apiEndpoint + "/" + ownerId + "/" + id);
}

export function saveGoal(goal) {
  if (goal._id) {
    const goalId = goal._id;
    delete goal._id;
    return http.put(apiEndpoint + "/" + goalId, goal);
  }
  delete goal._id;
  return http.post(apiEndpoint, goal);
}
