"use client";

import styled from "@emotion/styled";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { FunctionComponent } from "react";

type CheckboxSettingProps = {
  label: string;
  value: string;
  defaultChecked?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
};

const CheckboxSetting: FunctionComponent<CheckboxSettingProps> = ({
  label,
  value,
  defaultChecked = false,
  onChange,
}) => {
  return (
    <CheckboxSettingWrapper>
      <Checkbox
        defaultChecked={defaultChecked}
        value={value}
        onChange={onChange}
      >
        {label}
      </Checkbox>
    </CheckboxSettingWrapper>
  );
};

const CheckboxSettingWrapper = styled.div`
  margin: 9px 0;
  height: 29.5px;
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 6.65px 11.19px;
  border-radius: 3px;
  transition: 400ms;

  :has(.ant-checkbox-checked) {
    background-color: #f2f9ff;
  }
`;

export default CheckboxSetting;
