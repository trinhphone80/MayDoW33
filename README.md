
# AICARE W33 - Landing Page 0Đ

Trang web landing page giới thiệu chương trình tặng máy đo đường huyết AICARE W33 của Đức Phương Medical.

## 🚀 Tính năng
- Đặt hàng trực tiếp gửi về Google Sheets thông qua Apps Script.
- Trợ lý tư vấn sức khỏe tích hợp Gemini AI (Phương Anh AI).
- Giao diện tối ưu cho thiết bị di động (Mobile First) với phong cách Y tế cao cấp.
- Hệ thống quản trị (Admin) tích hợp để theo dõi đơn hàng và cấu hình hình ảnh.

## 🛠️ Cài đặt cục bộ (Local)

1. Cài đặt các thư viện:
```bash
npm install
```

2. Chạy môi trường phát triển:
```bash
npm run dev
```

3. Đóng gói ứng dụng:
```bash
npm run build
```

## 🌐 Triển khai lên Vercel (Khuyên dùng)
1. Đẩy code lên GitHub.
2. Truy cập [Vercel](https://vercel.com), chọn **New Project** và Import repo từ GitHub.
3. Trong phần **Environment Variables**, thêm biến:
   - Name: `API_KEY`
   - Value: `MÃ_API_GEMINI_CỦA_BẠN`
4. Nhấn **Deploy**. Vercel sẽ tự động cấu hình Build Command (`npm run build`) và Output Directory (`dist`).

## 📊 Kết nối Google Sheets
1. Truy cập Admin (Mật khẩu mặc định: `123456`) ở cuối trang web.
2. Dán link Google Apps Script đã deploy vào mục cấu hình.
3. Cập nhật Email nhận thông báo để hệ thống gửi mail mỗi khi có khách đặt hàng.

---
© 2024 Đức Phương Medical.
