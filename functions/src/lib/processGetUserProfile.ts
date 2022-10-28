import { Response } from "firebase-functions"
import { AxiosError } from "axios"

import { getUserProfile } from "./getUserProfile"

export const processGetUserProfile = async (props: {
  res: Response
  accessToken: string
}) => {
  const pendingTime = new Date()
  console.log("getUserProfile/Pending: " + pendingTime)
  // アクセストークンからユーザID取得
  const lineUserProfile = await getUserProfile({
    url: process.env.LINE_PROFILE_URL,
    accessToken: props.accessToken,
  })
  // エラーハンドリング
  if (lineUserProfile.isFailure()) {
    const err = lineUserProfile.error
    if (err instanceof AxiosError) {
      console.error(
        "getUserProfile/Pending: " +
          pendingTime +
          "\n getUserProfile/Rejected: " +
          new Date()
      )
      console.error(new Error(err.message))
      const status = err.response?.status ? err.response?.status : 500
      props.res.status(status).send(err)
      return false
    } else {
      console.error(new Error(err.message))
      props.res.status(err.code).send(err)
      return false
    }
  }
  // Success
  console.log(
    "getUserProfile/Pending: " +
      pendingTime +
      "\n getUserProfile/Fulfilled: " +
      new Date()
  )
  console.log(lineUserProfile.value)
  return lineUserProfile.value
}
