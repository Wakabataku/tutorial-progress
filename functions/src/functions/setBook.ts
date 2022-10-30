import * as functions from "firebase-functions"

import { checkCors } from "../lib/checkCors"
import {
  FsBook,
  FuncSetBookRequest,
  BookItem,
  FuncSetBookResponse,
} from "../types"
import { processGetUserProfile } from "../lib/processGetUserProfile"
import { db } from "../index"

// 一般的にfunctionsは，下記のような形式をとる
// regionは地域で，asia-northeast1は東京を意味している．Google Cloud Functions(GCF)の設定．
// https.onRequestは，この関数はhttpsリクエストを受け付けますよという意味
// request, responseは，受け取ったデータや応答データの引数（
export const setBook = functions
  .region("asia-northeast1")
  .https.onRequest(async (request, response) => {
    // Cors処理
    const res = checkCors(request, response)
    if (res === "OPTIONS") return

    // リクエストデータ
    const body = request.body as FuncSetBookRequest

    // アクセストークンを使用してユーザプロフィールを取得
    const userProfile = await processGetUserProfile({
      res: res,
      accessToken: body.access_token,
    })
    if (!userProfile) return

    // firestoreに登録する型に変換
    const fsBook: FsBook = {
      id: body.book.id,
      title: body.book.volumeInfo.title,
      subtitle: body.book.volumeInfo.subtitle,
      description: body.book.volumeInfo.description,
      thumbnail: body.book.volumeInfo.imageLinks.thumbnail,
      smallThumbnail: body.book.volumeInfo.imageLinks.smallThumbnail,
    }

    // リクエストされたデータをfireatoreに登録
    await db
      .collection("users")
      .doc(userProfile.sub)
      .collection("books")
      .doc(body.book.id)
      .set(fsBook, { merge: true })

    // すでに登録されている書籍情報を読み出し
    const booksQuerySnapshot = await db
      .collection("users")
      .doc(userProfile.sub)
      .collection("books")
      .get()

    // 書籍情報だけを抜き出す
    const books: BookItem[] = []
    booksQuerySnapshot.forEach((book) => {
      const bookData = book.data() as FsBook
      books.push({
        id: bookData.id,
        volumeInfo: {
          title: bookData.title,
          subtitle: bookData.subtitle,
          description: bookData.description,
          imageLinks: {
            thumbnail: bookData.thumbnail,
            smallThumbnail: bookData.smallThumbnail,
          },
        },
      } as BookItem)
    })

    // 書籍情報をClientに送信
    res.status(200).send({ books: books } as FuncSetBookResponse)
  })
