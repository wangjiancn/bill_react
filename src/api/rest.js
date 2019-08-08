import request from "../utils/request.js";

export function getRows({ model, data, params }) {
  return request({
    method: "get",
    url: `/rest/${model}`,
    data: data,
    params: params
  });
}
export function getRow({ model, data, id, params }) {
  return request({
    method: "get",
    url: `/rest/${model}/${id}`,
    data: data,
    params: params
  });
}
export function createRow({ model, data, params }) {
  return request({
    method: "post",
    url: `/rest/${model}`,
    data: data,
    params: params
  });
}
export function updateRow({ model, data, id, params }) {
  return request({
    method: "post",
    url: `/rest/${model}/${id}`,
    data: data,
    params: params
  });
}
export function delete_row({ model, data, id, params }) {
  return request({
    method: "delete",
    url: `/rest/${model}/${id}`,
    data: data,
    params: params
  });
}
