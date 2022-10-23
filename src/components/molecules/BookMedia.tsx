import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import { VolumeInfo } from "../../store/bookSlice"
import BookInfo from "../atoms/BookInfo"
import Button from "../atoms/Button"
import { useGetElementProperty } from "../../lib/useGetElementProperty"

const BookMedia: React.FC<{
  props: {
    volumeInfo: VolumeInfo
    imgUrl: string
    onClick: () => void
  }
}> = ({ props }) => {
  // useRefの決まった使い方
  // 自分も理解してない．useRef難しいんだよね
  const elm = useRef(null)
  // getElementPropertyを使うことで，タグの高さや幅などの情報を取得できる
  // これもネットから拾ってきたから，詳しくは理解していない
  const { getElementProperty } = useGetElementProperty<HTMLDivElement>(elm)
  // useStateを使って，概要部分の高さ情報を保持している
  const [descriptionHeight, setDespHeight] = useState<number>(0)
  // 最大許容高さ．これを超えると「続きを読む」「閉じる」が表示される
  const maxDespHeight = 145
  // 概要部を表示したり，しなかったりなどの操作はcssを用いて規定する
  // classNameを使って，cssを適用したり，させなかったりすることで，スタイルを操作する
  const [readMore, setReadMore] = useState<"el_readmore" | "">("el_readmore")

  // useEffectは[]部分に変化があった場合に発火し，画面を再表示しなおす
  // 今回は[]がなにも指定されていない．この場合，最初に画面が表示されたときに実行してねということになる
  useEffect(() => {
    // setDespは高さの数値情報（number型）をセットする．
    // getElementProperty("")を使うことで，タグの諸情報を取得できる
    // 今回はheightの高さ情報を取得している
    setDespHeight(getElementProperty("height"))
  }, []) // ここの[]ね

  return (
    // styled-componentsを用いて，css(スタイル)を規定しているが，styled-componentsは引数をとることができる
    // ただし，下部にあるように事前に型を宣言して，引数をとれるようにしてやる必要がある
    <BookMediaWrapper height={maxDespHeight}>
      <div className="el_bookMedia">
        <div className="el_bookImgWrapper">
          <img src={props.imgUrl} />
        </div>
        <div className="el_bookList">
          {/* 書籍の詳細を表示するatomsコンポーネント */}
          <BookInfo
            props={{
              volumeInfo: props.volumeInfo,
              readMoreClassName: readMore,
              elm: elm,
            }}
          />

          {/* ここの理解が難しい
              別途解説を入れるため，とりあえず模写 */}
          {readMore === "el_readmore" ? (
            descriptionHeight >= maxDespHeight ? (
              <div className="el_readMoreBtnWrapper">
                <Button
                  props={{
                    text: "...続きを読む",
                    className: "el_readMoreBtn",
                    onClick: () => setReadMore(""),
                  }}
                />
              </div>
            ) : (
              <></>
            )
          ) : (
            <div className="el_readMoreBtnWrapper">
              <Button
                props={{
                  text: "...閉じる",
                  className: "el_readMoreBtn",
                  onClick: () => setReadMore("el_readmore"),
                }}
              />
            </div>
          )}

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

// styled-compoenntsのとる引数の型を規定している
interface DespHeight {
  height: number
}

// styled.div<DespHeihgt>とすることで，DespHeight型の引数を受け取ることができるようになる
// 今回は下にもコメント部があるから読んで
const BookMediaWrapper = styled.div<DespHeight>`
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
    /* 今回，スタイルについてはほとんど触れていないが，el_readMoreがついているときは，
    概要が収納されていて，ついていないときは展開されている
    el_readMoreを付けたり外したりすることで，スタイルを実現している */
    .el_readMoreBtn {
      border: 1px solid transparent;
      cursor: pointer;
      & > a {
        padding-left: 0;
      }
    }
    .el_readmore {
      position: relative;
      overflow: hidden;
      min-height: 100px;
      max-height: ${(props) => props.height}px;
      &::before {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        content: "";
      }
    }
  }
`
