import axios from "axios";
import { useContext } from "react";

import { Method } from "../constants/Enums";
import { UserContext } from "../store/User_Context";

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

