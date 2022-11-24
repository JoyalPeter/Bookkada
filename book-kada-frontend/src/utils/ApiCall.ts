import axios from "axios";

import { Method } from "../constants/Enums";

export function ApiCall(
  method: Method,
  path: string,
  data?: Object,
  accessToken?: string
) {
  const apiHost = "http://localhost:5000/";

  return axios({
    method,
    url: `${apiHost}${path}`,
    data,
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
}

// ApiCall(Method.POST, 'add' ,)
