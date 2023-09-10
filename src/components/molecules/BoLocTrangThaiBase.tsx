import Icon from "@ant-design/icons";
import React, { FunctionComponent } from "react";
import { RightIcon } from "../atoms/Icons";
import classNames from "classnames";
import { Manrope } from "next/font/google";
import NumPick from "./NumPick";

const manrope = Manrope({
  subsets: ["vietnamese"],
  display: "auto",
});

type BoLocTrangThaiBaseProps = {
  title?: string;
  selected?: string;
};

const BoLocTrangThaiBase: FunctionComponent<BoLocTrangThaiBaseProps> = ({
  title = "Trạng thái",
  selected = "4 sản phẩm",
}) => {
  return (
    <div className="flex px-[19px] py-4 justify-between border-b-[1px] border-[#E0E6ED]">
      <div className="flex gap-x-3.5 justify-center items-center">
        <Icon component={RightIcon} className="ml-2" />
        <span className={classNames(manrope.className)}>{title}</span>
      </div>
      <NumPick title={selected} />
    </div>
  );
};

export default BoLocTrangThaiBase;
