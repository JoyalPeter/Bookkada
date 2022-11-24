import { useState } from "react";
import { Method } from "../constants/enums";
import { ApiCall } from "../utils/ApiCall";

export default function useApiService() {
  const [loadingFlag, setloadingFlag] = useState(false);

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
          if (response.response.status === 422)
            reject(response.response.data.message[0]);
          else reject("Something went wrong");
        })
        .finally(() => setloadingFlag(false));
    });

  return { makeApiCall, loadingFlag };
}
