import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import logger from "redux-logger"

// 上記で作成したbookSliceを読み込んでいる
import bookReducer from "./bookSlice"

// これ，これだけ覚える
// スライスを作成したら，storeのcombineReducerに組み込む
const rootReducer = combineReducers({
  book: bookReducer,
})

// あとは定型文
// 昔調べて，納得したけど，もう結構わすれて脳死で書いてる

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type RootKeyState = keyof RootState
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
