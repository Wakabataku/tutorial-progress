import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import logger from "redux-logger"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

// 上記で作成したbookSliceを読み込んでいる
import bookReducer from "./bookSlice"
import loginReducer from "./loginSlice"

// redux-persistの設定
const persistConfig = {
  key: "redux-firebase-line",
  version: 1,
  storage,
  // ホワイトリスト，ブラックリストにSliceの名前を入れることで，
  // persistするSliceを選択できる.何も指定しなければすべてpersistされる
  // whitelist:[]
  // blacklist:[]
}

// これ，これだけ覚える
// スライスを作成したら，storeのcombineReducerに組み込む
const rootReducer = combineReducers({
  book: bookReducer,
  login: loginReducer,
})

// reducerをpersistする
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  // persistしたreducerを指定する
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // middlewareにredux-persitを追加
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
})

// storeをpersist
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type RootKeyState = keyof RootState
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
