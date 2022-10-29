import React from "react"
import styled from "styled-components"

import LoginButton from "../organisms/LoginButton"

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <h1>チュートリアル</h1>
      <div className="bl_loginBtnWrapper">
        <LoginButton />
      </div>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .bl_loginBtnWrapper {
    margin: auto 0;
  }
`
