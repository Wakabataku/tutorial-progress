import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

import { store, persistor } from "./store/store"
// App.tsxの階層も変更しよう
import App from "./components/pages/App"
// Layoutはこれから作成
import Layout from "./components/pages/Layout"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  // Providerで囲った部分において，storeにアクセスできるようになる
  // <BrowserRouter>と<Routes>, <Rout>はFunctions側のコード作成後の後半部で解説
  <Provider store={store}>
    <BrowserRouter>
      {/* PersistGateで囲んだ箇所にpersistが適用される */}
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path={"/"} element={<Layout Main={App} />} />
        </Routes>
      </PersistGate>
    </BrowserRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
