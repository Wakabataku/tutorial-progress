import React from "react"
import styled from "styled-components"

import { addClass } from "../../lib/addClass"

const BoundText: React.FC<{
  props: {
    text: string
    // 上位のコンポーネントからスタイルを操作できるように
    // クラス名を引数にとる
    className?: string
  }
}> = ({ props }) => {
  const className = addClass("loading", props.className)
  return (
    <BoundTextWrapper>
      <span className={className}>
        {/* 引数の文字列を一文字ずつに分割して，それぞれ<span>と<a>タグで囲んでreturnしている
              その理由はスタイルをあてるため */}
        {props.text.split("").map((str, i) => (
          <span key={i}>
            <a>{str}</a>
          </span>
        ))}
      </span>
    </BoundTextWrapper>
  )
}

export default BoundText

const BoundTextWrapper = styled.div`
  /* とあるサイトからのコピペ
ひとつも理解していない */
  & {
    span.loading {
      display: inline-block;
      white-space: nowrap;
    }
    span.loading span {
      display: inline-block;
      vertical-align: middle;
    }
    span.loading span:nth-of-type(1) {
      -webkit-animation: animation 2s ease 0s infinite;
      animation: animation 2s ease 0s infinite;
    }
    span.loading span:nth-of-type(2) {
      -webkit-animation: animation 2s ease 0.1s infinite;
      animation: animation 2s ease 0.1s infinite;
    }
    span.loading span:nth-of-type(3) {
      -webkit-animation: animation 2s ease 0.2s infinite;
      animation: animation 2s ease 0.2s infinite;
    }
    span.loading span:nth-of-type(4) {
      -webkit-animation: animation 2s ease 0.3s infinite;
      animation: animation 2s ease 0.3s infinite;
    }
    span.loading span:nth-of-type(5) {
      -webkit-animation: animation 2s ease 0.4s infinite;
      animation: animation 2s ease 0.4s infinite;
    }
    span.loading span:nth-of-type(6) {
      -webkit-animation: animation 2s ease 0.5s infinite;
      animation: animation 2s ease 0.5s infinite;
    }
    span.loading span:nth-of-type(7) {
      -webkit-animation: animation 2s ease 0.6s infinite;
      animation: animation 2s ease 0.6s infinite;
    }

    @-webkit-keyframes animation {
      0% {
        margin-top: 0;
      }
      5% {
        margin-top: -1em;
      }
      10% {
        margin-top: 0;
      }
      13% {
        margin-top: -0.5em;
      }
      16% {
        margin-top: 0;
      }
      18% {
        margin-top: -0.2em;
      }
      20% {
        margin-top: 0;
      }
    }

    @keyframes animation {
      0% {
        margin-top: 0;
      }
      5% {
        margin-top: -1em;
      }
      10% {
        margin-top: 0;
      }
      13% {
        margin-top: -0.5em;
      }
      16% {
        margin-top: 0;
      }
      18% {
        margin-top: -0.2em;
      }
      20% {
        margin-top: 0;
      }
    }
  }
`
