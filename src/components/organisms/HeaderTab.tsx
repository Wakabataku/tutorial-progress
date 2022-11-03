import React from "react"
import styled from "styled-components"

import { NavLink } from "react-router-dom"

const HeaderTab: React.FC = () => {
  return (
    <HeaderTabWrapper>
      <div className="bl_tab">
        <ul className="el_tab-menu">
          <li className="el_tab-itemWrapper">
            <NavLink to="/" className="el_tab-item home">
              Home
            </NavLink>
          </li>

          <li className="el_tab-itemWrapper">
            <NavLink to="/mypage" className="el_tab-item">
              マイページ
            </NavLink>
          </li>
        </ul>
      </div>
    </HeaderTabWrapper>
  )
}

export default HeaderTab

const HeaderTabWrapper = styled.div`
  width: fit-content;
  & {
    li {
      list-style: none;
    }
    ul {
      margin: 0;
    }

    .bl_tab {
      display: block;
      width: 500px;
      max-width: 100%;
    }

    .el_tab-menu {
      display: flex;
    }

    .el_tab-itemWrapper {
      text-align: center;
      width: fit-content;
      padding: 10px 0;
      /* widthを同じ比率で分けあう */
      flex-grow: 1;
    }

    .el_tab-item {
      border: 3px solid #ea5549;
      border-radius: 10px;
      padding: 5px 30px;
      cursor: pointer;
      text-decoration: none;
      color: #333;
    }

    .home {
      color: #fff;
      background-color: #ea5549;
    }
  }
`
