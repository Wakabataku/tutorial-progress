import React from "react"
import styled from "styled-components"

import { addClass } from "../../lib/addClass"

const SearchForm: React.FC<{
  props: {
    onChange: (word: string) => void
    // 引数にonKeyDownを追加
    onKeyDown: (key: string) => void
    className?: string
  }
}> = ({ props }) => {
  const className = addClass("el_searchForm", props.className)
  return (
    <SearchFormWrapper>
      <div className={className}>
        <input
          type="text"
          onChange={(e) => props.onChange(e.target.value)}
          // onKeyDownを追加
          onKeyDown={(e) => props.onKeyDown(e.key)}
        />
      </div>
    </SearchFormWrapper>
  )
}

const SearchFormWrapper = styled.div`
  width: fit-content;
  & {
    input {
      font-size: 16px;
    }
  }
`

export default SearchForm
