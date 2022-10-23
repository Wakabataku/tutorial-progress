import React from "react"
import styled from "styled-components"
import { useAppSelector } from "../../store/store"

import BookMedia from "../molecules/BookMedia"

const BookResults: React.FC = () => {
  const books = useAppSelector((state) => state.book.books)
  // books.itemsからidを取り除いたvolumeInfoだけを抜き出すことができる
  // そのため，volumeInfoはVolumeInfo[]型である
  const volumeInfo = books.items.map((item) => item.volumeInfo)

  return (
    <BookResultsWrapper>
      {/* volumeInfoは配列なので，mapで一つ一つにアクセスし，それぞれのvolumeInfoを<BookMedia>に渡している */}
      {volumeInfo.map((item, index) => {
        // Google APIから送られてくるvolumeInfoにはimageLinksのない書籍もあるため，その場合にはNo Imageの画像を出力するように設定
        const imgUrl =
          // imageLinksプロパティがvolumeInfoに含まれていれば,そのままvolumeInfo.imageLinks.thumbnailを表示し，
          // 含まれていなければ，No Imageが保存されているURLを使って，No Image画像を表示する
          "imageLinks" in item
            ? item.imageLinks.thumbnail
            : "https://drive.google.com/uc?id=1zuqJ4kYNcO5dijGJO8GHOszGBLhjUxdo&.png"
        return (
          <div key={index} className="el_bookMediaWrapper">
            <BookMedia
              props={{
                volumeInfo: item,
                imgUrl: imgUrl,
              }}
            />
          </div>
        )
      })}
    </BookResultsWrapper>
  )
}

export default BookResults

const BookResultsWrapper = styled.div``
