import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useAppSelector } from "../../store/store"

import BookMedia from "../molecules/BookMedia"
import BookModal from "../molecules/BookModal"
import Modal from "../atoms/Modal"

const BookResults: React.FC = () => {
  const books = useAppSelector((state) => state.book.books)
  // books.itemsからidを取り除いたvolumeInfoだけを抜き出すことができる
  // そのため，volumeInfoはVolumeInfo[]型である
  const volumeInfo = books.items.map((item) => item.volumeInfo)

  // Modalを表示するためには2つの状態を管理する必要がある
  // 表示するモーダルの内容を決定する状態[modal]
  const [modal, setModal] = useState<JSX.Element | false>(false)
  // そもそもモーダルを表示するかどうかの判断を担う状態[isModal]
  const [isModal, setIsModal] = useState<JSX.Element | false>(false)

  // 書籍が選択されたときに[modal]に表示すべきコンポーネントを設定する
  const onClickInMedia = (props: { imgUrl: string; title: string }) => {
    return setModal(
      <BookModal
        props={{
          bookIcon: (
            <div className="el_bookModalImgWrapper">
              <img src={props.imgUrl} />
              <p>{props.title}</p>
            </div>
          ),
        }}
      />
    )
  }

  // useEffectは，特定の状態を監視して，変化があれば画面を再表示させる命令を出す関数
  // ここでは最後に書かれている[modal]を対象としている
  // []と空白にすると画面が表示されたときに一度だけ関数を実行するという意味になる
  useEffect(() => {
    // useEffectは最初に画面が表示されたときにも実行される
    // もちろん最初は何も選択されていないため，実行してほしくない
    // だから，useStateでmodalは初期値falseを与えて，下記構文で初回は実行させないようにしている
    // if(!modal)は，modalが何か値を持っていたらfalse, nullやfalseのときは逆にtrueになってif後が実行される
    if (!modal) return
    // modalがセットされたら，isModalをセットする
    // これにより，isModalがtrue判定となり，{isModal ? isModal : <></>}の左側isModalが表示される
    setIsModal(
      <Modal
        props={{
          component: modal,
          // モーダルの外側をクリックしたら，setIsModalを使用して，isModalをfalseにする
          // これにより，isModalがfalseになり，{isModal ? isModal : <></>}の右側が表示される．つまり，何も表示されない
          onClickOutArea: () => setIsModal(false),
        }}
      />
    )
    // このmodalを監視している
    // クリックされると，setModal()でmodalが更新されるため，useEffectが発火する
  }, [modal])

  return (
    <BookResultsWrapper>
      {/* こいつがモーダルを表示するかしないかを決めている */}
      {isModal ? isModal : <></>}
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
                // BookMediaにonClick関数を渡して，モーダルを表示できるようにする
                onClick: () =>
                  onClickInMedia({ imgUrl: imgUrl, title: item.title }),
              }}
            />
          </div>
        )
      })}
    </BookResultsWrapper>
  )
}

export default BookResults

const BookResultsWrapper = styled.div`
  & {
    .el_bookModalImgWrapper {
      & > img {
        display: block;
        max-width: 100px;
        margin: 0 auto;
      }
    }
  }
`
