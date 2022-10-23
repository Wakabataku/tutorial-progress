import React from "react"
import styled from "styled-components"

import { addClass } from "../../lib/addClass"

const Button: React.FC<{
  props: {
    onClick: () => void
    text: string
    className?: string
  }
}> = ({ props }) => {
  const className = addClass("el_Btn", props.className)

  return (
    <ButtonWrapper>
      <div className={className}>
        <a onClick={props.onClick}>{props.text}</a>
      </div>
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  width: fit-content;
  & {
    .el_Btn {
      border: 1.5px solid #333;
    }
    .el_Btn a {
      margin: 0 auto;
      text-align: center;
      padding: 5px 15px;
      width: 100px;
      max-width: 100%;
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }
  }
`

export default Button
