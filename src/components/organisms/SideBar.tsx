"use client";

import React, { FunctionComponent } from "react";
import { Card, Menu, type MenuProps } from "antd";
import styled from "@emotion/styled";
import { Manrope } from "next/font/google";
import Icon from "@ant-design/icons/lib/components/Icon";
import {
  BaoCaoIcon,
  DichVuBaoHanhIcon,
  DonHangIcon,
  KhachHangIcon,
  SanPhamIcon,
  SoQuyIcon,
  TongQuanIcon,
} from "../atoms/Icons";
import Link from "next/link";

const manrope = Manrope({
  weight: "500",
  subsets: ["vietnamese"],
  display: "auto",
});

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Tổng quan", "TongQuanSub", <Icon component={TongQuanIcon} />, [
    getItem("Bán Hàng", "BanHang"),
    getItem("Dịch Vụ - Bảo Hành", "DichVuBaoHanh"),
  ]),
  getItem("Đơn hàng", "DonhangSub", <Icon component={DonHangIcon} />, [
    getItem("Tạo đơn hàng", "TaoDonHang"),
    getItem("Danh sách đơn hàng", "DanhSachDonHang"),
    getItem("Danh sách đơn hoàn", "DanhSachDonHoan"),
    getItem("Đơn đặt hàng", "DonDatHang"),
  ]),
  getItem("Sản phẩm", "SanPhamSub", <Icon component={SanPhamIcon} />, [
    getItem("Danh sách sản phẩm", "DanhSachSanPham"),
    getItem("Danh mục sản phẩm", "DanhMucSanPham"),
    getItem("Chính sách giá", "ChinhSachGia"),
    getItem("Chuyển hàng", "ChuyenHang"),
    getItem("Danh sách nhập hàng", "DanhSachNhapHang"),
    getItem("Nhà cung cấp", "NhaCungCap"),
    getItem("Quản lý kho", "QuanLyKho"),
    getItem("Đặt hàng nhập", "DatHangNhap"),
  ]),
  getItem(
    "Dịch vụ - Bảo hành",
    "DichVuBaoHanhSub",
    <Icon component={DichVuBaoHanhIcon} />,
    [
      getItem("Tạo phiếu mới", "TaoPhieuMoi"),
      getItem("Danh sách phiếu", "DanhSachPhieu"),
      getItem("Danh sách dịch vụ", "DanhSachDichVu"),
      getItem("Danh mục dịch vụ", "DanhMucDichVu"),
    ]
  ),
  getItem("Khách hàng", "KhachHangSub", <Icon component={KhachHangIcon} />, [
    getItem("Danh sách khách hàng", "DanhSachKhachHang"),
    getItem("Nhóm khách hàng", "NhomKhachHang"),
  ]),
  getItem("Sổ quỹ", "SoQuySub", <Icon component={SoQuyIcon} />, [
    getItem("Phiếu thu", "PhieuThu"),
    getItem("Phiếu chi", "PhieuChi"),
  ]),
  getItem("Báo cáo", "BaoCaoSub", <Icon component={BaoCaoIcon} />, [
    getItem("Báo cáo bán hàng", "BaoCaoBanHang"),
    getItem("Báo cáo nhập hàng", "BaoCaoNhapHang"),
    getItem("Báo cáo hàng hóa", "BaoCaoHangHoa"),
    getItem("Báo cáo khách hàng", "BaoCaoKhachHang"),
    getItem("Báo cáo tài chính", "BaoCaoTaiChinh"),
    getItem("Báo cáo nhân viên", "BaoCaoNhanVien"),
  ]),
];

type SideBarProps = {
  defaultSelectedKeys?: string;
  defaultOpenKeys?: string;
};

const SideBar: FunctionComponent<SideBarProps> = ({
  defaultOpenKeys = "SanPhamSub",
  defaultSelectedKeys = "DanhMucSanPham",
}) => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <SidebarWrapper>
      <Card bordered={false} style={{ width: 260 }}>
        <Link href="/">
          <h1 className="text-center font-semibold text-xl cursor-pointer mb-5">
            tranlinhmobile
          </h1>
        </Link>

        <Menu
          onClick={onClick}
          defaultSelectedKeys={[defaultSelectedKeys]}
          defaultOpenKeys={[defaultOpenKeys]}
          mode="inline"
          items={items}
          inlineIndent={8}
          className={manrope.className}
        />
      </Card>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  .ant-card {
    border-radius: 0;
    box-shadow: 0px 0px 25px 0px var(--shadow);

    .ant-card-body {
      padding: 16px;

      .ant-menu-light {
        border-inline-end: none !important;
      }

      .ant-menu {
        .ant-menu-submenu-selected {
          .ant-menu-submenu-title {
            color: black;
          }
        }
        .ant-menu-submenu-open.ant-menu-submenu-selected {
          .ant-menu-submenu-title {
            background-color: var(--primary);
            color: white;
          }
        }

        .ant-menu-submenu-open {
          .ant-menu-submenu-title {
            font-weight: 600;
          }
        }
        .ant-menu-submenu {
          border-radius: 0;
        }
      }

      .ant-menu.ant-menu-sub.ant-menu-inline {
        background: white;
      }

      .ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child {
        background-color: white;
        color: var(--primary);
      }

      .ant-menu-item .ant-menu-title-content {
        padding-left: 22px;
      }
    }
  }
`;

export default SideBar;
