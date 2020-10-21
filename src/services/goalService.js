import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api/goals";

export function getAllGoals() {
  return http.get(apiEndpoint);
}

export function getOneGoal(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function saveGoal(goal) {
  if (goal._id) {
    const goalId = goal._id;
    delete goal._id;
    return http.post(apiEndpoint + "/" + goalId, goal);
  }
  return http.post(apiEndpoint, goal);
}
