import React from "react"
import styled from "styled-components"

import Button from "../atoms/Button"

const BookModal: React.FC<{
  props: {
    bookIcon: JSX.Element
  }
}> = ({ props }) => {
  const onClickSubmit = () => {
    alert("（仮）書籍を登録しました。")
    console.log("submit!!")
  }
  return (
    <BookModalWrapper>
      <div className="el_bookModal">{props.bookIcon}</div>
      <div className="el_submitBtnWrapper">
        <Button
          props={{
            onClick: () => onClickSubmit(),
            text: "登録",
            className: "el_submitBtn",
          }}
        />
      </div>
    </BookModalWrapper>
  )
}

export default BookModal

const BookModalWrapper = styled.div`
  & {
    .el_bookModal {
      padding: 30px;
    }
    .el_submitBtnWrapper {
      margin: 0 auto;
      width: fit-content;
      cursor: pointer;
      padding-bottom: 20px;
    }
    .el_submitBtn {
      padding: 5px 10px;
    }
  }
`
