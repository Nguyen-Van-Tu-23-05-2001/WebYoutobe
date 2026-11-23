# Ford Territory CarPlay HUD & Infotainment Dashboard

Hệ thống điều khiển giải trí và dẫn đường đa màn hình (Multi-Screen Dashboard) tối ưu cho Apple CarPlay và Android Auto trên Ford Territory.

## Tính năng chính
- **Tỉ lệ hiển thị chuẩn xe hơi:** Mặc định Media 16:9 toàn màn hình, hỗ trợ chia đôi màn hình 35:65, 50:50, xoay dọc/ngang linh hoạt.
- **Tối ưu hóa 60 FPS cho CarPlay:** Loại bỏ hoàn toàn giật khực nhờ cơ chế GPU Hardware Acceleration, Lazy-load Iframe (tắt WebGL/stream khi ẩn) và không reflow CSS.
- **Kho bài nhạc xe hơi:** 30 bài nhạc tuyển chọn, tự động chuyển bài kế tiếp mỗi lần mở xe, tìm kiếm YouTube trực tiếp.
- **Dẫn đường & Cảnh báo:** Waze Live Traffic, OpenStreetMap dẫn đường, VietMap Live, thời tiết và đồng hồ thời gian thực.
- **Định vị GPS thông minh:** Tự động bắt tọa độ GPS thực tế của xe và ghi nhớ điểm đến, hỏi cấp quyền duy nhất 1 lần.
- **Truyền hình trực tuyến:** VTVgo (VTV1, VTV2, VTV3, VTV Cần Thơ) chạy mượt mà.

## Triển khai lên Vercel (1 Click Deploy)
1. Tạo một repository mới trên GitHub (ví dụ: `ford-carplay-hud`).
2. Đẩy toàn bộ mã nguồn lên repository:
   ```bash
   git init
   git add .
   git commit -m "Ford Territory CarPlay HUD v1.0"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ford-carplay-hud.git
   git push -u origin main
   ```
3. Truy cập [vercel.com](https://vercel.com/), chọn **Add New...** -> **Project** -> Chọn repository vừa tạo và nhấn **Deploy**.
