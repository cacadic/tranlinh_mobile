import React, { FunctionComponent, useState } from "react";
import SearchInput from "../atoms/SearchInput";
import styled from "@emotion/styled";
import Icon from "@ant-design/icons/lib/components/Icon";
import { BoLocIcon, DownIcon, RightIcon } from "../atoms/Icons";
import classNames from "classnames";
import { Manrope } from "next/font/google";
import { Button, TreeSelect } from "antd";
import DropdownCustom from "../molecules/DropdownCustom";
import TreeData from "../data/TreeData.json";
import BoLocTrangThaiBase from "../molecules/BoLocTrangThaiBase";
import NumPick from "../molecules/NumPick";
import Tags from "../molecules/Tags";

const { SHOW_PARENT } = TreeSelect;

const treeData = TreeData;

const manrope = Manrope({
  subsets: ["vietnamese"],
  display: "auto",
});

type BoLocModalProps = {
  onHuyHandle: () => void;
};

const BoLocModal: FunctionComponent<BoLocModalProps> = ({ onHuyHandle }) => {
  const [trangThai, setTrangThai] = useState<string[]>(["0-0"]);

  const onTrangThaiChange = (newValue: string[]) => {
    setTrangThai(newValue);
  };

  const onSearchChange = (e: any) => {
    console.log(e.target.value);
  };

  const tProps = {
    treeData,
    value: trangThai,
    onChange: onTrangThaiChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
    suffixIcon: <Icon component={DownIcon} />,
    dropdownRender: () => (
      <DropdownCustom
        onCheckChange={setTrangThai}
        value={trangThai}
        setValue={setTrangThai}
      />
    ),
    getPopupContainer: () => document.getElementById("bo-loc-modal")!,
  };

  return (
    <BoLocModalWrapper id="bo-loc-modal">
      <SearchInput
        onChange={onSearchChange}
        placeholder="Tìm kiếm bộ lọc"
        className="px-[19px] pt-2"
        inputClass="bg-[#F4F4F4] border-none h-[35px]"
      />

      <div className="flex px-[19px] gap-x-1 py-3 border-b-[1px] border-[#E0E6ED]">
        <Icon component={BoLocIcon} />
        <span
          className={classNames(manrope.className, "text-primary font-medium")}
        >
          Bộ lọc đã lưu
        </span>
      </div>

      <div className="flex px-[19px] py-4 justify-between">
        <div className="flex gap-x-2 justify-center items-center">
          <Icon component={DownIcon} />
          <span className={classNames(manrope.className)}>Trạng thái</span>
        </div>
        <NumPick title="Đã chọn 2" />
      </div>

      <div className="px-[19px] pb-2 border-b-[1px] border-[#E0E6ED]">
        <TreeSelect {...tProps} />
      </div>

      {new Array("", "", "").map((_, i) => (
        <BoLocTrangThaiBase key={i} />
      ))}
      <BoLocTrangThaiBase title="Danh mục" selected="Đã chọn 4" />
      <BoLocTrangThaiBase title="Người tạo" selected="Đã chọn 1" />

      <div className="px-5 py-4">
        <div className="flex justify-between">
          <div className="flex gap-x-2 justify-center items-center">
            <Icon component={DownIcon} />
            <span className={classNames(manrope.className)}>Tag</span>
          </div>

          <NumPick title="Đã chọn 5" />
        </div>

        <div className="border-[1px] border-[#E0E6ED] rounded-lg mt-4 p-2">
          <Tags content="Iphone 14 Pro Max" />
          <Tags content="Iphone 14 Pro Series" />
          <div className="mt-2">
            <Tags content="+3" />
          </div>
        </div>

        <div className="flex justify-center items-center gap-x-3 pt-4">
          <Button danger className="w-[85px]" onClick={onHuyHandle}>
            Hủy
          </Button>
          <Button type="primary" className="w-[85px]">
            Lọc
          </Button>
        </div>
      </div>
    </BoLocModalWrapper>
  );
};

const BoLocModalWrapper = styled.div`
  .ant-input {
    background: #f4f4f4;
  }

  .ant-tree-select-dropdown {
    padding: 10px 0 0 0;
  }

  .ant-tree-select {
    .ant-select-selector {
      .ant-select-selection-overflow {
        .ant-select-selection-overflow-item {
          background: none;
          .ant-select-selection-item {
            background: #f2f9ff;
            border-radius: 99px;
            border: 1px solid var(--primary);
          }
        }
      }
    }
  }
`;

export default BoLocModal;
