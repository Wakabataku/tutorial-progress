import React from "react"
import styled from "styled-components"

import { VolumeInfo } from "../../store/bookSlice"
import BookInfo from "../atoms/BookInfo"

const BookMedia: React.FC<{
  props: {
    volumeInfo: VolumeInfo
    imgUrl: string
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
  }
`
