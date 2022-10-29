import React, { useLayoutEffect } from "react"
// URLクエリを取得する関数
import { useLocation } from "react-router-dom"

import { useAppSelector, useAppDispatch, AppDispatch } from "../../store/store"
import { getAccessTokenEvent } from "../../store/loginSlice"

const VerifyLineCodeQuery: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch()
  // storeからアプリで発行したstateを取得
  const state = useAppSelector((state) => state.login.state)
  // URLクエリを取得する
  const search = useLocation().search
  const query = new URLSearchParams(search)
  const code = query.get("code")
  const stateFromLineQuery = query.get("state")
  // LINEからリダイレクトされてきたら，アクセストークン取得
  // コンポーネントが表示される前に実行されるuseEffectみたいなもの
  useLayoutEffect(() => {
    // stateの値が一致していたら，getAccessTokenEventアクションを使ってcodeを送信
    if (code && state === stateFromLineQuery) {
      dispatch(getAccessTokenEvent({ code: code }))
      console.log(code)
    }
    // []が空なので一度しか実行されない
  }, [])
  return <></>
}

export default VerifyLineCodeQuery
