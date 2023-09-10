import classNames from "classnames";
import { Manrope } from "next/font/google";
import React, { FunctionComponent } from "react";

const manrope = Manrope({
  subsets: ["vietnamese"],
  display: "auto",
});

type NumPickProps = {
  title?: string;
};

const NumPick: FunctionComponent<NumPickProps> = ({ title = "Đã chọn 1" }) => {
  return (
    <div
      className={
        (classNames(manrope.className),
        "bg-[#F2F9FF] text-primary px-[13px] py-[2px] rounded-full border-[1px] border-primary")
      }
    >
      {title}
    </div>
  );
};

export default NumPick;
