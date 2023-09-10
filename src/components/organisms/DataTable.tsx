"use client";

import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { Key, useMemo, useState } from "react";
import { Table as AntdTable, Modal } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import PhieuLinhKienDichVuData from "../data/PhieuLinhKienDichVu.json";
import styled from "@emotion/styled";
import { Manrope } from "next/font/google";
import classNames from "classnames";
import CurrencyFormat from "react-currency-format";
import Icon from "@ant-design/icons/lib/components/Icon";
import { SettingIcon } from "../atoms/Icons";
import DieuChinh from "./DieuChinh";

interface DataType {
  key: Key;
  id: number;
  maPhieu: string;
  tenSanPham: string;
  giaBan: number;
  kho: string;
  maPhieuDichVu: string;
  trangThai: string;
  loai: string;
  kyThuat: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const data: DataType[] = PhieuLinhKienDichVuData.map((linhKien) => ({
  ...linhKien,
  key: linhKien.id,
}));

const manrope = Manrope({
  subsets: ["vietnamese"],
  display: "auto",
});

const columns: ColumnsType<DataType> = [
  {
    title: "Mã phiếu",
    dataIndex: "maPhieu",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "tenSanPham",
    filters: data.map((linhKien) => ({
      text: linhKien.tenSanPham,
      value: linhKien.tenSanPham,
    })),
    onFilter: (value: any, record) => record.tenSanPham === value,
    render: (text: string) => <span className="text-primary">{text}</span>,
    width: "35%",
  },
  {
    title: "Giá bán",
    dataIndex: "giaBan",
    sorter: (a, b) => a.giaBan - b.giaBan,
    render: (text: number) => (
      <div className="text-right w-full">
        <CurrencyFormat
          thousandSeparator={true}
          value={text}
          suffix="đ"
          className="text-right"
        />
      </div>
    ),
    width: "10%",
  },
  {
    title: "Kho",
    dataIndex: "kho",
    width: "10%",
  },
  {
    title: "Mã phiếu dịch vụ",
    dataIndex: "maPhieuDichVu",
    render: (text: string) => <span className="text-primary">{text}</span>,
  },
  {
    title: "Trạng thái",
    dataIndex: "trangThai",
    render: (text: string) => (
      <span
        className={classNames({
          "text-primary": text === "Đã xuất kho",
          "text-[#FF9E00]": text === "Yêu cầu",
          "text-[#ED0A34]": text === "Hủy" || text === "Trả lại",
          "text-[#0DC268]": text === "Đã xác nhận",
          "text-[#747C87]": text === "Cần xác nhận",
        })}
      >
        {text}
      </span>
    ),
  },
  {
    title: "Loại",
    dataIndex: "loai",
    render: (text: string) => (
      <span
        className={classNames({
          "text-[#ED0A34]": text === "Rủi ro, phát sinh",
        })}
      >
        {text}
      </span>
    ),
  },
  {
    title: "Kỹ thuật",
    dataIndex: "kyThuat",
  },
];

const DataTable = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = useMemo(
    () => selectedRowKeys.length > 0,
    [selectedRowKeys]
  );

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue> | any,
    sorter: SorterResult<DataType> | any
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleCancel = () => {
    setOpen(false);
    console.log("Cancel");
  };

  return (
    <TableWrapper id="data-table">
      <AntdTable
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        rowSelection={rowSelection}
        className={manrope.className}
      />
      <div
        className="absolute top-4 left-3 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Icon component={SettingIcon} />
      </div>

      {open && (
        <Modal
          open={open}
          title="Điều chỉnh cột hiển thị"
          onCancel={handleCancel}
          footer={null}
          getContainer="#data-table"
          width={750}
        >
          <DieuChinh />
        </Modal>
      )}
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  position: relative;

  .ant-checkbox-group {
    .ant-checkbox-wrapper {
      padding: 6.65px 11.9px;
      border-radius: 3px;
      transition: 400ms;

      span {
        font-family: "Manrope";
        font-weight: 500;
      }
    }

    .ant-checkbox-wrapper-checked {
      background-color: #f2f9ff;
    }
  }

  .ant-modal-content {
    padding: 0;

    .ant-modal-title {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      font-family: "Manrope";
      font-size: 20px;
      font-weight: 600;
      background-color: #f2f9ff;
    }
  }
  .ant-btn-primary {
    background-color: var(--primary);
  }

  .ant-table-cell.ant-table-selection-column {
    width: 60px;
    text-align: right;
  }
`;

export default DataTable;
