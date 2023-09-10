import Icon, { SearchOutlined } from "@ant-design/icons";
import { Tabs, Button, Input, TabsProps, Modal } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { DownIcon, BoLocIcon, PlusIcon } from "../atoms/Icons";
import { Manrope } from "next/font/google";
import BoLocModal from "./BoLocModal";
import styled from "@emotion/styled";
import SearchInput from "../atoms/SearchInput";

const manrope = Manrope({
  weight: "500",
  subsets: ["vietnamese"],
  display: "auto",
});

const items: TabsProps["items"] = [
  {
    key: "dang-loc",
    label: "Đang lọc",
  },
  {
    key: "yeu-cau",
    label: "Yêu cầu",
  },
  {
    key: "da-xuat-kho",
    label: "Đã xuất kho",
  },
];

const SearchSortFunction = () => {
  const [showBoLoc, setShowBoLoc] = useState<boolean>(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
  };

  const onTabChange = (key: string) => {
    console.log(key);
  };

  const handleCancel = () => {
    setShowBoLoc(false);
  };

  return (
    <SearchSortFunctionWrapper
      className="flex justify-between items-center"
      id="search-sort-function"
    >
      <SearchInput
        onChange={onChange}
        placeholder="Tìm kiếm theo mã khách hàng, tên khách hàng và số điện thoại"
        className="w-[763px]"
      />

      <div className="flex justify-center items-center">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onTabChange}
          className={manrope.className}
        />
        <div className="flex justify-center items-center pb-4 gap-x-3 cursor-pointer">
          <span className={classNames(manrope.className, "text-sm ml-8")}>
            Cần xác nhận
          </span>
          <Icon component={DownIcon} />
        </div>

        <div className="pb-4 ml-6 flex gap-x-5">
          <Button
            className="border-none bg-white px-[8.5px]"
            onClick={() => setShowBoLoc(true)}
          >
            <div className="flex justify-center items-center gap-x-1">
              <span>
                <Icon component={BoLocIcon} />
              </span>
              <span
                className={classNames(manrope.className, "pb-1 text-primary")}
              >
                Bộ lọc
              </span>
            </div>
          </Button>
          <div className="flex gap-x-[1px]">
            <Button type="primary" className="rounded-br-none rounded-tr-none">
              <div className="flex justify-center items-center gap-x-1">
                <span>
                  <Icon component={PlusIcon} />
                </span>
                <span className="pb-1">Thêm mới</span>
              </div>
            </Button>
            <Button
              type="primary"
              className="rounded-tl-none rounded-bl-none relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                ...
              </div>
            </Button>
          </div>
        </div>
      </div>

      {showBoLoc && (
        <Modal
          open={showBoLoc}
          title="Bộ lọc"
          onCancel={handleCancel}
          footer={null}
          className="show-bo-loc"
          width={410}
        >
          <BoLocModal onHuyHandle={() => setShowBoLoc(false)} />
        </Modal>
      )}
    </SearchSortFunctionWrapper>
  );
};

const SearchSortFunctionWrapper = styled.div``;

export default SearchSortFunction;
