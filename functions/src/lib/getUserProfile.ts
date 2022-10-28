import axios, { AxiosRequestConfig, AxiosError } from "axios"
import {
  Result,
  Success,
  Failure,
  LineUserProfile,
  ErrorResponse,
} from "../types"

export const getUserProfile = async (props: {
  url: string
  accessToken: string
}): Promise<Result<LineUserProfile, AxiosError | ErrorResponse>> => {
  try {
    const res = await axios.get<LineUserProfile>(props.url, {
      headers: { Authorization: "Bearer " + props.accessToken },
    } as AxiosRequestConfig)
    return new Success(res.data)
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return new Failure(
        new ErrorResponse(
          "getUserProfile.ts/getUserProfile",
          e.response?.status,
          e
        )
      )
    } else {
      return new Failure(new ErrorResponse("getUserProfile.ts/getUserProfile"))
    }
  }
}
