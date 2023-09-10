"use client";

import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import SideBar from "../organisms/SideBar";
import Header from "../organisms/Header";
import { Manrope } from "next/font/google";
import Tags from "../molecules/Tags";
import SearchSortFunction from "../organisms/SearchSortFunction";
import DataTable from "../organisms/DataTable";
import { LoadingOutlined } from "@ant-design/icons";

const manrope = Manrope({
  weight: "500",
  subsets: ["vietnamese"],
  display: "auto",
});

const DanhMucSanPham = () => {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingOutlined style={{ fontSize: 20 }} />
      </div>
    );
  }

  return (
    <DanhMucSanPhamWrapper
      style={{
        opacity: domLoaded ? 1 : 0,
      }}
    >
      <SideBar />
      <div>
        <Header />
        <div className="p-5 pt-3">
          <SearchSortFunction />
          <div className="flex items-center mb-3">
            <Tags type="Trạng thái" content="Đã xuất kho, Đã xác nhận" />
            <Tags type="Kho" content="TLM, LK247" />
            <Tags type="Kỹ thuật" content="Bình, Khoa" />
          </div>
          <DataTable />
        </div>
      </div>
    </DanhMucSanPhamWrapper>
  );
};

const DanhMucSanPhamWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;

  .ant-btn-primary {
    background-color: var(--primary);
  }

  .ant-tabs-tab.ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: black;
      font-weight: normal;
    }
  }

  .ant-tabs-tab:hover {
    color: black;
  }

  .ant-tabs-ink-bar {
    position: absolute;
    background: var(--primary);
    pointer-events: none;
  }
`;

export default DanhMucSanPham;
