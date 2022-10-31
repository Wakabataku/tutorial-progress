import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
admin.initializeApp(functions.config().firebase)

// loginFuncのimport
import { loginFunc } from "./functions/loginFunc"
import { setBook } from "./functions/setBook"
import { sendMessage } from "./functions/sendMessage"

// firestoreデータベースの作成
export const db = admin.firestore()
// undefinedは登録しない設定
db.settings({ ignoreUndefinedProperties: true })

// index.ts上でexportした関数が，実際にクラウドサーバーにアップロードされる
export const login = loginFunc
export const set = setBook
export const send = sendMessage
