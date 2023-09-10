import { Card, Checkbox, Input } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import DataCotHienThi from "../data/DataCotHienThi.json";
import { Manrope } from "next/font/google";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CloseOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

interface DataSettingType {
  label: string;
  value: string;
}

const dataSettingFull: DataSettingType[] = DataCotHienThi;

const manrope = Manrope({
  subsets: ["vietnamese"],
  display: "auto",
});

const reorder = (
  list: any,
  startIndex: number,
  endIndex: number
): DataSettingType[] => {
  const result = Array.from(list) as DataSettingType[];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "11px 16px 11px 40px",
  margin: 0,

  // change background colour if dragging
  background: isDragging ? "var(--primary)" : "white",
  color: isDragging ? "white" : "black",
  transition: "400ms",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "var(--background)" : "white",
  width: "100%",
});

const DieuChinh = () => {
  const [timKiem, setTimKiem] = useState<string>("");
  const [dataSetting, setDataSetting] =
    useState<DataSettingType[]>(dataSettingFull);
  const [items, setItems] = useState<DataSettingType[]>([]);

  const onChangeSetting = (e: any) => {
    const changeItems: DataSettingType[] = e.map((dataCode: string) =>
      dataSetting.find((data) => data.value === dataCode)
    );

    if (items.length < changeItems.length) {
      changeItems.forEach((changeItem) => {
        if (items.findIndex((item) => item.value === changeItem.value) === -1) {
          setItems((prevItems) => [...prevItems, changeItem]);
        }
      });
    } else {
      items.forEach((item) => {
        if (
          changeItems.findIndex(
            (changeItem) => changeItem.value === item.value
          ) === -1
        ) {
          setItems((prevItems) =>
            prevItems.filter((prevItem) => prevItem.value !== item.value)
          );
        }
      });
    }
  };

  const onChangeTimKiem = (e: any) => {
    setTimKiem(e.target.value);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  useEffect(() => {
    const timKiemFunc = setTimeout(() => {
      setDataSetting(
        dataSettingFull.filter((data) =>
          data.label.toLowerCase().includes(timKiem.toLowerCase())
        )
      );
    }, 500);

    return () => {
      clearTimeout(timKiemFunc);
    };
  }, [timKiem]);

  return (
    <DieuChinhWrapper className="grid grid-cols-half p-6 gap-x-[18px]">
      <Card
        title={
          <div
            className={classNames(
              manrope.className,
              "text-center font-semibold"
            )}
          >
            Thêm cột hiển thị
          </div>
        }
      >
        <Input
          placeholder="Tìm kiếm"
          allowClear
          className="mb-2"
          onChange={onChangeTimKiem}
        />

        <Checkbox.Group
          options={dataSetting}
          onChange={onChangeSetting}
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: 5,
            margin: "9px 0",
          }}
          value={items.map((item) => item.value)}
        />
      </Card>
      <Card
        title={
          <div
            className={classNames(
              manrope.className,
              "text-center font-semibold"
            )}
          >
            Cột hiển thị
          </div>
        }
        bodyStyle={{ padding: 0 }}
      >
        <div
          className={classNames(
            manrope.className,
            "h-16 flex justify-center items-center font-medium text-primary"
          )}
          style={{ borderBottom: "1px solid #DCDCDC" }}
        >
          Di chuyển để sắp xếp cột hiển thị
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item: DataSettingType, index: number) => (
                  <div
                    key={item.value}
                    style={{ borderBottom: "1px solid #DCDCDC" }}
                  >
                    <Draggable draggableId={item.value} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div className="flex justify-between">
                            <div className={classNames(manrope.className)}>
                              {item.label}
                            </div>
                            <div
                              className="flex items-center cursor-pointer"
                              onClick={() =>
                                setItems((prevItems) =>
                                  prevItems.filter(
                                    (prevItem) => prevItem.value !== item.value
                                  )
                                )
                              }
                            >
                              <CloseOutlined
                                style={{
                                  color: snapshot.isDragging
                                    ? "white"
                                    : "#0E1726",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
    </DieuChinhWrapper>
  );
};

const DieuChinhWrapper = styled.div``;

export default DieuChinh;
