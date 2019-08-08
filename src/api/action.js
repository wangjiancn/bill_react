import request from "../utils/request";

function actionCreator({ method, action }) {
  if (method === "get") {
    return params =>
      request({
        method: "get",
        url: `/get/action/${action}`,
        params: params
      });
  } else {
    return (data, params) =>
      request({
        method: method,
        url: `/${method}/action/${action}`,
        data: data,
        params: params
      });
  }
}
export var getCatTree = actionCreator({
  method: "get",
  action: "get_cat_tree"
});

export var CreateRecord = actionCreator({
  method: "post",
  action: "create_record"
});

export var getYearReport = actionCreator({
  method: "get",
  action: "get_year_report"
});
