import { SearchOutlined } from "@ant-design/icons";
import { Input, InputProps, InputRef } from "antd";
import React, { FunctionComponent, RefAttributes } from "react";

type SearchInputProps = {
  onChange: (e: any) => void;
  placeholder?: string;
  className?: string;
  inputClass?: string;
  style?: InputProps & RefAttributes<InputRef> & any;
};

const SearchInput: FunctionComponent<SearchInputProps> = ({
  onChange,
  placeholder = "Tìm kiếm",
  className,
  inputClass,
  style,
}) => {
  return (
    <div className={className}>
      <Input
        placeholder={placeholder}
        allowClear
        onChange={onChange}
        prefix={<SearchOutlined />}
        className={inputClass}
        style={style}
      />
    </div>
  );
};

export default SearchInput;
