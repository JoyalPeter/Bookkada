import axios from "axios";

import { Method } from "../constants/Enums";

export function ApiCall(
  method: Method,
  path: string,
  data?: Object,
  token?: string | undefined | null,
  userId?: number
) {
  const apiHost = "http://localhost:5000/";

  return axios({
    method,
    url: `${apiHost}${path}`,
    data,
    headers: {
      Authorization: `Bearer "${token}"`,
      userId: userId
    },
  });
}

