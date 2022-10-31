import * as functions from "firebase-functions"
import * as line from "@line/bot-sdk"
import { TextMessage } from "@line/bot-sdk/dist"

import { FsBook } from "../types"

export const sendMessage = functions
  .region("asia-northeast1")
  .firestore.document("users/{sub}/books/{bid}")
  .onCreate(async (snap, context) => {
    const book = snap.data() as FsBook
    const sub = context.params.sub

    console.log(book.title)
    console.log(sub)

    const client = new line.Client({
      channelAccessToken: process.env.LINEBOT_ACCESSTOKEN,
    })

    const message: TextMessage = {
      type: "text",
      text: "書籍：" + book.title + "を登録しました。",
    }

    await client.pushMessage(sub, message)
    return
  })
