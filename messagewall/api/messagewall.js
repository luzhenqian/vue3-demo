import httpClient from "../utils/http";

export function get(params) {
  return httpClient.get("/posts", { params });
}

export function create(body) {
  return httpClient.post("/posts", body);
}

export function update(id, body) {
  return httpClient.put(`/posts/${id}`, body);
}

export function del(id) {
  return httpClient.delete(`/posts/${id}`);
}
