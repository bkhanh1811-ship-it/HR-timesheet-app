# HỆ THỐNG CHẤM CÔNG – BẠCH HỔ SECURITY

Đây là hệ thống **quản lý chấm công tập trung** dành cho Công ty TNHH MTV Dịch vụ Bảo vệ Bạch Hổ Security.

Hệ thống được xây dựng bằng **Next.js**, triển khai trên **Vercel**, phục vụ nhu cầu:
- Chấm công theo **tháng**
- Quản lý **nhân viên – mục tiêu**
- Tổng hợp **tổng công**
- Xuất dữ liệu **Excel**
- Sử dụng nội bộ doanh nghiệp

---

## TÍNH NĂNG CHÍNH

- Đăng nhập bằng mã nhân viên
- Bảng chấm công theo tháng:
  - 1 nhân viên = 1 dòng
  - Mỗi ngày = 1 cột
  - Giá trị công: `1 | 0.5 | P | CN`
- Tự động tính **tổng công cuối tháng**
- Xuất báo cáo Excel
- Giao diện tối ưu cho quản lý nhân sự

---

## CÔNG NGHỆ SỬ DỤNG

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **Vercel** (Deploy)
- Có thể tích hợp:
  - Google Sheet
  - Database (PostgreSQL / Supabase)

---

## HƯỚNG DẪN CHẠY LOCAL (DÀNH CHO DEV)

Cài dependencies:

```bash
npm install
