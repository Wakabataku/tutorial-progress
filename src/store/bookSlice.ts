import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"

import { getBooksRequest } from "../lib/getBooksRequest"
import { BookItem } from "../../functions/src/types"

// エラーメッセージの型
// エラーの処理は自分も勉強中のためテキトー．とりあえず無視
export interface ErrorMessage {
  e_message: string | undefined
}
// これも無視
interface ClientError extends ErrorMessage {
  status: boolean
}

// このスライスの型
// スライスも説明が難しいので，書きながら覚える方がよい
// 簡単にいうと，"book"という観測値は，loading, books.item, errorという状態をもっているということ
// つまり，book.loadingとすることで，どこからでもbookのloadingにアクセスできる
// book.loadingの状態更新方法は，このbookスライスで規定できる
interface State {
  loading: boolean
  books: {
    items: BookItem[]
  }
  error: ClientError
}

// bookスライスの初期値
const initialState: State = {
  loading: false,
  books: {
    items: [],
  },
  error: {
    status: false,
    e_message: undefined,
  },
}

// getBooksのAsyncアクション
export const getBooks = createAsyncThunk<
  // returnする変数の型
  { item: BookItem[] },
  // 引数の型
  { value: string },
  // エラーの型
  { rejectValue: ErrorMessage }
>("GOOGLE_BOOKS/GET_EVENT", async (props, { rejectWithValue }) => {
  // エラーの可能性がある処理はtry{}catch(e:any){}で囲む
  try {
    // 非同期で(awaitを使って)getBooksRequestを実行
    const result: AxiosResponse<{ item: BookItem[] }> = await getBooksRequest(
      props.value
    )
    // result.dataをreturnすることで，apiから得られた検索結果をreturnできる
    return result.data
  } catch (e: any) {
    return rejectWithValue(e.response.data as ErrorMessage)
  }
})

// このcreateSlice内で，上で設定したloading, books.item, errorの更新方法を規定できる
export const bookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {},
  // 非同期のアクション（getBooks関数)の起動時，成功時，失敗時の処理はextraReducerに記載する
  extraReducers: (builder) => {
    // 起動時（pending)
    builder.addCase(getBooks.pending, (state) => {
      // loading: trueにすることで，現在はBooks APIからデータ取得中であることを示している
      state.loading = true
      // エラーメッセージを初期化
      state.error.e_message = undefined
      state.error.status = false
      // 現在の検索結果を初期化
      Object.assign(state.books, { items: [] })
    })

    // 成功時
    builder.addCase(
      getBooks.fulfilled,
      // 成功時はreturn result.dataとして，検索結果が返ってくる
      // returnの内容はaction.payload.〇〇とすることでアクセスできる
      // PayloadAcion<>は，returnされるときの型を規定している
      (state, action: PayloadAction<{ item: BookItem[] }>) => {
        // 成功したためloadingはfalseに
        state.loading = false
        // 成功したデータを現在のstoreの状態にaction.payloadで更新をかけている
        state.books = Object.assign({}, state.books, action.payload)
        Object.assign(state.books, action.payload)
      }
    )
  },
})

export default bookSlice.reducer
