import Icon from "@ant-design/icons";
import { Tag } from "antd";
import React, { FunctionComponent } from "react";
import { CloseIcon } from "../atoms/Icons";
import { Manrope } from "next/font/google";
import classNames from "classnames";

const manrope = Manrope({
  weight: "500",
  subsets: ["vietnamese"],
  display: "auto",
});

type TagsProps = {
  content: string;
  type?: "Trạng thái" | "Kho" | "Kỹ thuật";
};

const Tags: FunctionComponent<TagsProps> = ({ content, type }) => {
  const log = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return (
    <Tag
      color="#F2F9FF"
      style={{
        borderRadius: 100,
        padding: type ? "6.5px 25px 6.5px 10px" : "2px 25px 2px 10px",
        border: type ? "none" : "1px solid var(--primary)",
      }}
      closeIcon={
        <Icon component={CloseIcon} style={{ position: "absolute" }} />
      }
    >
      <span
        className={classNames(manrope.className, "text-sm", {
          "text-[#46515F]": type,
          "text-black": !type,
        })}
      >
        {type && `${type}: `}
        {content}
      </span>
    </Tag>
  );
};

export default Tags;
