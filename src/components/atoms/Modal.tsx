import React, { useRef, useEffect } from "react"
import styled from "styled-components"

const Modal: React.FC<{
  props: {
    component: JSX.Element
    onClickOutArea: () => void
  }
}> = ({ props }) => {
  const insideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    //対象の要素を取得
    const el = insideRef.current

    //対象の要素がなければ何もしない
    if (!el) return

    //クリックした時に実行する関数
    const hundleClickOutside = (e: MouseEvent) => {
      if (!el?.contains(e.target as Node)) {
        //ここに外側をクリックしたときの処理
        console.log("外側をクリック")
        props.onClickOutArea()
      }
      //   else {
      //     //ここに内側をクリックしたときの処理
      //     console.log("内側をクリック")
      //   }
    }

    //クリックイベントを設定
    document.addEventListener("click", hundleClickOutside)

    //クリーンアップ関数
    return () => {
      //コンポーネントがアンマウント、再レンダリングされたときにクリックイベントを削除
      document.removeEventListener("click", hundleClickOutside)
    }
  }, [insideRef])
  return (
    <ModalWrapper>
      <div className="overlay">
        <div className="modalContent" ref={insideRef}>
          {props.component}
        </div>
      </div>
    </ModalWrapper>
  )
}

export default Modal

const ModalWrapper = styled.div`
  & .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    z-index: 10000;
    justify-content: center;
  }
  & .modalContent {
    outline: 3px solid #ff0000;
    outline-offset: -3.35px;
    background-color: #fff;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  }
`
