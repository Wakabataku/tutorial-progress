import React from "react"
import styled from "styled-components"
// stateの乱数を作成するパッケージ
import { v4 as uuidv4 } from "uuid"

import Button from "../atoms/Button"
import { useAppDispatch, AppDispatch, useAppSelector } from "../../store/store"
import { setState, setInitialState } from "../../store/loginSlice"
import BoundText from "../atoms/BoundText"

const LoginButton: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const loginState = useAppSelector((state) => state.login)
  // ログインボタンをクリックしたときの関数
  const onClickLogin = () => {
    // 乱数を作成
    const state = uuidv4()
    // 作成したstateをstoreにセットしておく
    dispatch(setState({ state: state }))

    // ユーザをLINEログインページへ飛ばす
    window.location.href =
      process.env.REACT_APP_LINE_LOGIN_URL +
      process.env.REACT_APP_LINE_LOGIN_CLIENT_ID +
      "&redirect_uri=" +
      process.env.REACT_APP_LINE_LOGIN_REDIRECT +
      "&state=" +
      state +
      "&scope=" +
      process.env.REACT_APP_LINE_SCOPE
  }

  // ログアウトボタンをクリックしたときの関数
  const onClickLogout = () => {
    dispatch(setInitialState())
    alert("ログアウトしました")
  }

  return (
    <LoginButtonWrapper>
      {!loginState.isLogin ? (
        loginState.load ? (
          <BoundText
            props={{
              text: "ログイン中",
              className: "el_loginBtnLoad",
            }}
          />
        ) : (
          <Button
            props={{
              text: "ログイン",
              onClick: onClickLogin,
              className: "el_loginBtn",
            }}
          />
        )
      ) : (
        <Button
          props={{
            text: "ログアウト",
            onClick: onClickLogout,
            className: "el_loginBtn",
          }}
        />
      )}
    </LoginButtonWrapper>
  )
}

export default LoginButton

const LoginButtonWrapper = styled.div`
  & {
    .el_loginBtn {
      background-color: #ff4500;
      border: 1px solid transparent;
      cursor: pointer;
      a {
        color: #fff;
        font-weight: 900;
      }
    }
  }
  .el_loginBtnLoad {
    background-color: #ff4500;
    border: 1px solid transparent;
    cursor: default;
    padding: 0 10px;
    a {
      color: #fff;
      font-weight: 900;
    }
  }
`
