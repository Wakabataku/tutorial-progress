import React from "react"
import styled from "styled-components"

import InputForm from "../molecules/InputForms"
// store.tsから指示を送るための関数をimport
import { useAppDispatch, AppDispatch } from "../../store/store"
// 指示の内容となるgetBooksのimport
import { getBooks } from "../../store/bookSlice"

const BookSearchForm: React.FC = () => {
  // molecules/InputFormにuseStateの役割を任せたため，
  // 関数内がすっきりした

  const dispatch: AppDispatch = useAppDispatch()

  // ただ，クリックした後の処理はorganisms側で対応する．
  // なぜなら，まだ実装していないが，クリック後の処理はstore操作を想定しているため
  const onClick = (word: string) => {
    console.log(word + "で検索!")

    // クリックされたら検索しろと指示を送る
    dispatch(getBooks({ value: word }))
  }

  return (
    <BookSearchFormWrapper>
      <InputForm props={{ onSubmit: (word) => onClick(word) }} />
    </BookSearchFormWrapper>
  )
}

const BookSearchFormWrapper = styled.div``

export default BookSearchForm
