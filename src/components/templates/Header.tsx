import React from "react"
import styled from "styled-components"

import LoginButton from "../organisms/LoginButton"
import HeaderTab from "../organisms/HeaderTab"

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <div className="header">
        <h1>チュートリアル</h1>
        <div className="bl_loginBtnWrapper">
          <LoginButton />
        </div>
      </div>
      <HeaderTab />
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
  }
  .bl_loginBtnWrapper {
    margin: auto 0;
  }
`
