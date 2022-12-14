import React from "react"
import styled from "styled-components"

import BookSearchForm from "../organisms/BookSearchForm"
import BookResults from "../organisms/BookResults"
import VerifyLineCodeQuery from "../organisms/VerifyLineCodeQuery"

const App: React.FC = () => {
  return (
    <AppWrapper>
      <VerifyLineCodeQuery />
      <BookSearchForm />
      <div className="bl_bookDisplay">
        <BookResults />
      </div>
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  & {
    .bl_bookDisplay {
      padding-top: 50px;
    }
  }
`

export default App
