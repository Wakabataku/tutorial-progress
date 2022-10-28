// * as 〇〇として，importすることで，パッケージのexportされているすべての関数や型に〇〇.関数名などでアクセスできる
// よくみる import {関数名} from "" の場合は，個別に関数をimportする形
import * as functions from "firebase-functions"
import { AxiosResponse, AxiosRequestConfig } from "axios"

import { checkCors } from "../lib/checkCors"
import {
  FuncAccessRequest,
  FuncAccessResponse,
  LineAccessToken,
} from "../types"
import { getAccessToken } from "../lib/getAccessToken"
import { processGetUserProfile } from "../lib/processGetUserProfile"
import { db } from "../index"

// 一般的にfunctionsは，下記のような形式をとる
// regionは地域で，asia-northeast1は東京を意味している．Google Cloud Functions(GCF)の設定．
// https.onRequestは，この関数はhttpsリクエストを受け付けますよという意味
// request, responseは，受け取ったデータや応答データの引数（
export const loginFunc = functions
  .region("asia-northeast1")
  .https.onRequest(async (request, response) => {
    // Cors処理
    const res = checkCors(request, response)
    if (res === "OPTIONS") return

    // リクエストデータの格納
    // リクエストデータはbodyにある
    // as 型名 とすることで，今後変数(ここではbody)をFuncAccessRequest型として扱うことができる
    const body = request.body as FuncAccessRequest
    // 応答データをつくっておく
    const responseData: FuncAccessResponse = {
      access_token: "funcAccessToken",
      name: "funcName",
      sub: "funcName",
      picture: "funcPicture",
    }

    // アクセストークンのPOSTイベント．POSTはHTTPの通信手段のこと．Google Books APIではGETを使用した
    try {
      // Lineからアクセストークンを取得するための準備
      const params = new URLSearchParams()
      // ここの書き方はLINE側で．この形式で問い合わせろと指示があるため，それに沿っている．
      // 詳しく理解しているわけではない
      params.append("grant_type", "authorization_code")
      params.append("code", body.code)
      // process.envは環境変数を使用している．
      // 別途解説あり．
      params.append("redirect_uri", process.env.LINE_LOGIN_REDIRECT)
      params.append("client_id", process.env.LINE_LOGIN_ID)
      params.append("client_secret", process.env.LINE_SECRET)
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
      // アクセストークン取得
      // getAccessTokenは後ほど作成
      const accessToken: AxiosResponse<LineAccessToken> = await getAccessToken({
        params,
        config,
      })
      // 取得したアクセストークンを応答データにセット
      responseData.access_token = accessToken.data.access_token
    } catch (e: any) {
      // エラー処理
      // 実は，これ間違った書き方
      // だけど，最近正しいエラー処理方法知ったし，アプリ側も修正しきれていないので，これでいいや
      console.error(new Error("Access token get error"))
      console.error(e)
      res.status(400).send(e)
      return
    }
    // アクセストークンからユーザID取得
    // この関数は正しくエラー処理できている
    // 難解なので，とりあえず理解しなくていい．
    const userProfile = await processGetUserProfile({
      res: res,
      accessToken: responseData.access_token,
    })
    // エラーが発生したらreturnでこのlogin関数を終了する
    if (!userProfile) return

    // 以下，Success
    responseData.sub = userProfile.sub
    responseData.name = userProfile.name
    responseData.picture = userProfile.picture

    // firestoreにユーザデータ登録
    // 別途解説
    await db
      .collection("users")
      .doc(responseData.sub)
      .set(userProfile, { merge: true })

    // 応答データを送信
    await res.status(200).send(responseData)
  })
