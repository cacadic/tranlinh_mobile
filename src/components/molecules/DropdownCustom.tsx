import { Checkbox } from "antd";
import React, { FunctionComponent, useEffect, useState } from "react";
import TreeData from "../data/TreeData.json";
import SearchInput from "../atoms/SearchInput";
import styled from "@emotion/styled";
import classNames from "classnames";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["vietnamese"],
  display: "auto",
});

type DropdownCustomProps = {
  onCheckChange: (e: any) => void;
  value: string[];
  setValue: (value: string[]) => void;
};

const allOptions = TreeData.map(({ title, value }) => ({
  label: title,
  value,
}));

const DropdownCustom: FunctionComponent<DropdownCustomProps> = ({
  onCheckChange,
  value,
  setValue,
}) => {
  const [options, setOptions] =
    useState<{ label: string; value: string }[]>(allOptions);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [timKiem, setTimKiem] = useState<string>("");

  const onSearchChange = (e: any) => {
    setTimKiem(e.target.value);
  };

  const onSelectAllChange = (e: any) => {
    setIsSelectAll(e.target.checked);
    setValue(e.target.checked ? options.map(({ value }) => value) : []);
  };

  useEffect(() => {
    setIsSelectAll(value.length === options.length);
  }, [value, options]);

  useEffect(() => {
    const timKiemFunc = setTimeout(() => {
      setOptions(
        allOptions.filter((option) =>
          option.label.toLowerCase().includes(timKiem.toLowerCase())
        )
      );
    }, 500);

    return () => {
      clearTimeout(timKiemFunc);
    };
  }, [timKiem]);

  return (
    <DropdownCustomWrapper>
      <SearchInput
        onChange={onSearchChange}
        inputClass="bg-[#F4F4F4] border-none h-[35px]"
        className="px-2"
      />
      <Checkbox
        className="p-2 border-b-[1px] border-[#E0E6ED] w-full"
        onChange={onSelectAllChange}
        checked={isSelectAll}
      >
        <span
          className={classNames(manrope.className, "text-primary font-medium")}
        >
          Chọn tất cả
        </span>
      </Checkbox>
      <Checkbox.Group
        options={options}
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 5,
          margin: "9px 0",
        }}
        className="px-2"
        onChange={onCheckChange}
        value={value}
      />
    </DropdownCustomWrapper>
  );
};

const DropdownCustomWrapper = styled.div`
  .ant-input {
    background: #f4f4f4;
  }

  .ant-checkbox-group {
    .ant-checkbox-wrapper {
      span {
        color: var(--primary);
        font-family: "Manrope";
        font-weight: 500;
      }
    }
  }
`;

export default DropdownCustom;
