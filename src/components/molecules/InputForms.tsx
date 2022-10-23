import React, { useState } from "react"
import styled from "styled-components"

import Button from "../atoms/Button"
import SearchForm from "../atoms/SearchForm"

const InputForm: React.FC<{
  props: {
    // 引数にはonSubmitボタンをとっている
    // これは，クリックしたときの処理がstore操作に影響することを想定しているため
    // 検索フォームがあって，ボタンをクリックしたら，何か処理を行うというのは定番であるため，
    // 何か処理する関数というのをonSubmitで使用する
    onSubmit: (word: string) => void
  }
}> = ({ props }) => {
  // useStateをBookSearchFormではなく，molecules/InputFormに移した．
  // moleculesはuseStateなどを使って，atomsコンポーネントつなぐ役割を果たすため
  const [word, setWord] = useState<string>("")

  // Enterをクリック，スマホでは改行を押下したときに検索が実行される
  const onEnterDown = (key: string) => {
    if (key !== "Enter") return
    props.onSubmit(word)
  }

  return (
    <InputFormWrapper>
      <div className="bl_input">
        <p>書籍検索</p>
        <div className="el_searchFormWrapper">
          <SearchForm
            props={{
              onChange: (word: string) => setWord(word),
              // Enter押下時に発火する関数を追加
              onKeyDown: (key) => onEnterDown(key),
            }}
          />
        </div>
        <div className="el_buttonWrapper">
          <Button
            props={{
              // ボタンをクリックした後の処理がSearchFormでsetWordされたワードをつかって，
              // 何か処理するという流れになっている
              onClick: () => props.onSubmit(word),
              text: "検索",
              className: "el_submitBtn",
            }}
          />
        </div>
      </div>
    </InputFormWrapper>
  )
}

const InputFormWrapper = styled.div`
  width: fit-content;
  & {
    .el_searchFormWrapper {
      display: inline-block;
    }

    .el_buttonWrapper {
      display: inline-block;
    }

    .el_submitBtn {
      cursor: pointer;
    }
  }
`

export default InputForm
