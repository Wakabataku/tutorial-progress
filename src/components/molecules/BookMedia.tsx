import React from "react"
import styled from "styled-components"

import { VolumeInfo } from "../../store/bookSlice"
import BookInfo from "../atoms/BookInfo"
import Button from "../atoms/Button"

const BookMedia: React.FC<{
  props: {
    volumeInfo: VolumeInfo
    imgUrl: string
    onClick: () => void
  }
}> = ({ props }) => {
  return (
    <BookMediaWrapper>
      <div className="el_bookMedia">
        <div className="el_bookImgWrapper">
          <img src={props.imgUrl} />
        </div>
        <div className="el_bookList">
          {/* 書籍の詳細を表示するatomsコンポーネント */}
          <BookInfo
            props={{
              volumeInfo: props.volumeInfo,
            }}
          />
          <div className="el_bookMediaSubmitBtnWrapper">
            <Button
              props={{
                text: "登録",
                onClick: () => props.onClick(),
                className: "el_bookMediaSubmitBtn",
              }}
            />
          </div>
        </div>
      </div>
    </BookMediaWrapper>
  )
}

export default BookMedia

const BookMediaWrapper = styled.div`
  & {
    .el_bookMedia {
      width: 100%;
      margin: 0 -100%;
      border-top: 1px solid #ddd;
      padding: 40px 100%;
    }
    .el_bookImgWrapper {
      & > img {
        max-width: 150px;
      }
      display: inline-block;
      width: fit-content;
      padding-right: 80px;
    }
    .el_bookList {
      display: inline-block;
      vertical-align: top;
      max-width: 50%;
    }
    .el_bookMediaSubmitBtn {
      cursor: pointer;
      background-color: #ea5549;
      border: 1px solid #ea5549;
      & > a {
        color: #fff;
        font-weight: 900;
        font-size: 16px;
      }
    }
    .el_bookMediaSubmitBtnWrapper {
      display: inline-block;
      padding: 30px 0px;
    }
  }
`
