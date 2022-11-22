import axios from 'axios'

import { Method } from '../constants/enums'

export function ApiCall(method: Method, path: string, accessToken: string, data?: Object) {
  const apiHost = 'https://api.github.com'

  return axios({
    method,
    url: `${apiHost}${path}`,
    data,
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
}
