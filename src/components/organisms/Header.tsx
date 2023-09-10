"use client";

import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
  return (
    <HeaderWrapper>
      <h2>Danh sách phiếu xuất linh kiện dịch vụ</h2>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  padding: 16px 35px;
  height: 58px;
  background-color: white;
  width: 100%;
  box-shadow: 0px 0px 25px 0px var(--shadow);
`;

export default Header;
