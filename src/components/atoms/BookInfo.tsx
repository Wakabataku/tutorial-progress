import React from "react"
import styled from "styled-components"

import { VolumeInfo } from "../../../functions/src/types"

const BookInfo: React.FC<{
  props: {
    volumeInfo: VolumeInfo
    // 引数を追加
    readMoreClassName: string
    elm: React.MutableRefObject<null>
  }
}> = ({ props }) => {
  return (
    <BookInfoWrapper>
      <p>【書籍名】</p>
      <div className="el_bookInfo">
        <p>{props.volumeInfo.title}</p>
        <p>{props.volumeInfo.subtitle}</p>
      </div>
      <p>【概要】</p>
      {/* 概要の長さ（高さ）を知りたいので，elmはこのdivタグに入れる
          ref={elm}というのはuseRefを使うときのお約束みたいなもの
          ほとんど使う機会がないため，たいして理解してない
          また，classNameを引数であてることで，上位のコンポーネントであるmolecules/BookMediaからスタイルを操作できる */}
      <div ref={props.elm} className={props.readMoreClassName}>
        <a>{props.volumeInfo.description}</a>
      </div>
    </BookInfoWrapper>
  )
}

export default BookInfo

const BookInfoWrapper = styled.div`
  // スタイルを追加し忘れたため，追加しておく
  & {
    p {
      margin: 0;
    }
  }
`
