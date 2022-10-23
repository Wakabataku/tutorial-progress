import React from "react"
import styled from "styled-components"

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <h1>チュートリアル</h1>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
