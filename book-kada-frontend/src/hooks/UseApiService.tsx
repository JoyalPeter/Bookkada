import { useState } from "react";
import { Method } from "../constants/Enums";
import { ApiCall } from "../utils/ApiCall";
import { useNavigate } from "react-router-dom";
import useLogout from "./UseLogout";

export default function useApiService() {
  const [loadingFlag, setloadingFlag] = useState(false);
  const { logout } = useLogout();
  const makeApiCall = (
    method: Method,
    path: string,
    data?: Object,
    accessToken?: string
  ) =>
    new Promise<any>(async (resolve, reject) => {
      setloadingFlag(true);
      ApiCall(method, path, data, accessToken)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          console.log(response);
          if (!response.response) reject("Something went wrong");
          else if (response.response.status === 400)
            reject(response.response.data.message);
          else if (response.response.status === 422)
            reject(response.response.data.message[0]);
          else if (response.response.status === 401) {
            logout();
            reject("You are not logged in");
          } else reject("Something went wrong");
        })
        .finally(() => setloadingFlag(false));
    });

  return { makeApiCall, loadingFlag };
}
