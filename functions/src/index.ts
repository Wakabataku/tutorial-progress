import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
admin.initializeApp(functions.config().firebase)

// loginFuncのimport
import { loginFunc } from "./functions/loginFunc"

// firestoreデータベースの作成
export const db = admin.firestore()

// index.ts上でexportした関数が，実際にクラウドサーバーにアップロードされる
export const login = loginFunc
