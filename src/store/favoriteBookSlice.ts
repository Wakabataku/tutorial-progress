import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"

import {
  BookItem,
  FuncSetBookRequest,
  FuncSetBookResponse,
} from "../../functions/src/types"
import { setBookRequest } from "../lib/setBookRequest"

interface State {
  load: boolean
  favoriteBook: BookItem[]
  error: {
    status: boolean
    book: BookItem | undefined
  }
}

const initialState: State = {
  load: false,
  favoriteBook: [],
  error: {
    status: false,
    book: undefined,
  },
}

export const setFavoriteBook = createAsyncThunk<
  // returnする変数の型
  FuncSetBookResponse,
  // dispatchされる引数の型
  FuncSetBookRequest,
  // エラーの型
  { rejectValue: BookItem }
>("GOOGLE_BOOKS/SET_EVENT", async (props, { rejectWithValue }) => {
  try {
    const result: AxiosResponse<FuncSetBookResponse> = await setBookRequest(
      props
    )
    return result.data
  } catch (e: any) {
    return rejectWithValue(props.book)
  }
})

export const favoriteBookSlice = createSlice({
  name: "favoriteBook",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setFavoriteBook.pending, (state) => {
      state.load = true
      state.error.book = undefined
      state.error.status = false
    })

    builder.addCase(setFavoriteBook.fulfilled, (state, action) => {
      state.favoriteBook = action.payload.books
      state.load = false
    })
    // エラーのときはエラーstatusをtrueにして，送信失敗した書籍情報で更新
    builder.addCase(setFavoriteBook.rejected, (state, action) => {
      state.error.status = true
      state.error.book = action.payload
    })
  },
})

export default favoriteBookSlice.reducer
