import { Notification } from "element-ui";

export const httpError = error => {
  const response = error.response;
  var title = "Error";
  var message = "Network Error.";

  if (response) {
    if (response.status == 404) {
      title = "Error";
      message = "Not Found.";
    } else if (response.status == 401) {
      title = "Unauthorized";
      message = "Authorization failed. You need to login firstly.";
    }
  }

  Notification.error({
    title: title,
    message: message,
    showClose: true
  });
};
