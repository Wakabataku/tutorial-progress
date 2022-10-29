import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

import {
  FuncAccessResponse,
  FuncAccessRequest,
} from "../../functions/src/types"

export const getAccessToken = async (
  props: FuncAccessRequest
): Promise<AxiosResponse<FuncAccessResponse>> => {
  // 送信するデータ
  const params = {
    code: props.code,
  }
  // 送信する形態
  // 今回はapplication/jsonということ．詳しい意味はしらなくても平気
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
    // 先ほど作成したfirebaes Functionsのlogin関数に対してHTTP通信を行う
    return await axios.post(process.env.REACT_APP_LOGIN_URL, params, config)
  } catch (e: any) {
    throw new Error(e)
  }
}
