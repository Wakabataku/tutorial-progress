import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"

import { ErrorMessage } from "./bookSlice"
import {
  FuncAccessRequest,
  FuncAccessResponse,
} from "../../functions/src/types"
import { getAccessToken } from "../lib/getAccessToken"

interface State {
  state: string
  load: boolean
  isLogin: boolean
  code: string
}

const initialState: State & FuncAccessResponse = {
  load: false,
  isLogin: false,
  state: "state",
  access_token: "access_token",
  sub: "Guest",
  picture: "picture",
  name: "Guest",
  code: "code",
}

// アクセストークンを取得するためのAsync Actionの作成
export const getAccessTokenEvent = createAsyncThunk<
  // FuncAccessResponse型をreturn
  FuncAccessResponse,
  // FuncAccessRequest型をdispatch時の引数として受け取る
  FuncAccessRequest,
  // エラー処理の型
  { rejectValue: ErrorMessage }
>("LINE/LOGIN/GET_ACCESS_TOKEN", async (props, { rejectWithValue }) => {
  try {
    const result: AxiosResponse<FuncAccessResponse> = await getAccessToken({
      code: props.code,
    })
    return result.data
  } catch (e: any) {
    return rejectWithValue(e.response.data as ErrorMessage)
  }
})

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    // stateはLINEログイン時に必要な値
    // Client側のLINEログイン処理の流れは別途解説
    setState: (state, action: PayloadAction<{ state: string }>) => {
      state.state = action.payload.state
    },
    // ユーザがログアウトしたら，状態をリセットする必要がある
    // そのため，初期値initialStateで状態stateを上書きする
    setInitialState: (state) => {
      Object.assign(state, initialState)
    },
  },
  // Async ActionのreducerはextraReducerとして記述
  extraReducers: (builder) => {
    // ログインボタン押したときは，完了するまで(fulfilledまで)load:true
    builder.addCase(getAccessTokenEvent.pending, (state) => {
      state.isLogin = false
      state.load = true
    })
    // 完了したらそれぞれ更新をかける
    builder.addCase(getAccessTokenEvent.fulfilled, (state, action) => {
      state.load = false
      state.isLogin = true
      state.access_token = action.payload.access_token
      state.name = action.payload.name
      state.picture = action.payload.picture
      state.sub = action.payload.sub
    })
    // エラー発生時の処理
    builder.addCase(getAccessTokenEvent.rejected, (state) => {
      state.load = false
    })
  },
})

export const { setState, setInitialState } = loginSlice.actions

export default loginSlice.reducer
