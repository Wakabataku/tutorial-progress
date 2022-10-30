import React from "react"
import styled from "styled-components"

import Button from "../atoms/Button"

const BookModal: React.FC<{
  props: {
    bookIcon: JSX.Element
    onSubmit: () => void
    isLogin: boolean
  }
}> = ({ props }) => {
  const onClickSubmit = () => {
    alert("書籍を登録しました。")
    props.onSubmit()
  }
  return (
    <BookModalWrapper>
      <div className="el_bookModal">{props.bookIcon}</div>
      {props.isLogin ? (
        <div className="el_submitBtnWrapper">
          <Button
            props={{
              onClick: () => onClickSubmit(),
              text: "登録",
              className: "el_submitBtn",
            }}
          />
        </div>
      ) : (
        <div className="el_loginInstruction">
          <a>ログインしてください</a>
        </div>
      )}
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
    .el_loginInstruction {
      margin: 0 auto;
      width: fit-content;
      background-color: #ea5549;
      padding: 5px;
      cursor: default;
      a {
        color: #fff;
        font-weight: 900;
      }
    }
  }
`
