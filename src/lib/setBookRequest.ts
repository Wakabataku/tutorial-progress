import axios, { AxiosResponse, AxiosRequestConfig } from "axios"

import { BookItem, FuncSetBookResponse } from "../../functions/src/types"

export const setBookRequest = async (props: {
  book: BookItem
}): Promise<AxiosResponse<FuncSetBookResponse>> => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
    return await axios.post(process.env.REACT_APP_SET_URL, props, config)
  } catch (e: any) {
    throw new Error(e)
  }
}
