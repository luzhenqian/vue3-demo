import httpClient from "../utils/http";

export interface Message {
  content: string;
}

export interface Messages {
  amount: number;
  results: MessageRaw;
}

export type MessageRaw = {
  post_id: number;
  content: string;
  publish_time: number | string;
  editing?: boolean;
}[];

export type Id = number;

export function get(params: { search: string }): Promise<Messages> {
  return httpClient.get<Messages>("/posts", { params });
}

export function create(body: Message) {
  return httpClient.post("/posts", body);
}

export function update(id: Id, body: Message) {
  return httpClient.put(`/posts/${id}`, body);
}

export function del(id: Id) {
  return httpClient.delete(`/posts/${id}`);
}
