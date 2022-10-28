import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

import { LineAccessToken } from "../types"

export const getAccessToken = async (props: {
  params: URLSearchParams
  config: AxiosRequestConfig
}): Promise<AxiosResponse<LineAccessToken>> => {
  try {
    // アクセストークンを取得するため，LINEへPOSTして，その結果をreturnしている
    return await axios.post(
      process.env.LINE_ACCESSTOKEN_URL,
      props.params,
      props.config
    )
  } catch (e: any) {
    throw new Error(e)
  }
}
