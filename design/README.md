# TÀI LIỆU THIẾT KẾ & WIREFRAME – DỰ ÁN EDULEARN
- **MSSV:** 6651071041
- **Chủ đề:** Nền tảng khóa học trực tuyến (mini LMS)
- **Màu sắc chủ đạo:** Emerald (#059669)

---

## 1. SƠ ĐỒ BỐ CỤC GIAO DIỆN (WIREFRAME ARCHITECTURE)

### A. Trang Danh Sách Khóa Học (ListPage - Route: `/`)
```
+---------------------------------------------------------------------------+
| [LOGO EduLearn]   [Trang chủ] [Khóa học] [Yêu thích (N)] [Giới thiệu] [Đăng nhập] |
+---------------------------------------------------------------------------+
| HERO SECTION:                                                             |
|   Headline: "Nâng Tầm Kỹ Năng - Khai Phóng Tương Lai"                     |
|   Subhead + [Khám phá khóa học ngay] + [Khóa học đã lưu]                  |
|   Hình ảnh minh họa EdTech + Badges thống kê (12k+ học viên, 4.9 rating)  |
+---------------------------------------------------------------------------+
| BỘ LỌC TÌM KIẾM (FILTER BAR):                                             |
|   [Ô tìm kiếm khóa học / giảng viên]      [Sắp xếp: Mặc định / Giá / Rating] |
|   Pills danh mục: [Tất cả] [Lập trình] [Thiết kế] [Marketing] [Kinh doanh]...|
|   Bộ lọc nhanh: Trình độ (Cơ bản/Trung cấp) | Học phí (Miễn phí/Có phí)    |
+---------------------------------------------------------------------------+
| COURSE GRID (Responsive: 1 cột mobile, 2 cột tablet, 3-4 cột desktop):    |
|   +-----------------------+  +-----------------------+  +----------------+ |
|   | [Ảnh] [Badge] [♥ Tim] |  | [Ảnh] [Badge] [♥ Tim] |  | ...            | |
|   | ⭐ 4.9 (1.850 đánh giá) |  | ⭐ 4.8 (1.210 đánh giá) |  |                | |
|   | Tiêu đề khóa học      |  | Tiêu đề khóa học      |  |                | |
|   | Giảng viên + Avatar   |  | Giảng viên + Avatar   |  |                | |
|   | 599.000 ₫  [Xem][Chi] |  | 499.000 ₫  [Xem][Chi] |  |                | |
|   +-----------------------+  +-----------------------+  +----------------+ |
+---------------------------------------------------------------------------+
| FOOTER:                                                                   |
|   EduLearn LMS | Danh mục | Chính sách | Liên hệ (UTC2) | Bản quyền 2026  |
+---------------------------------------------------------------------------+
```

### B. Cửa Sổ Modal Chi Tiết Khóa Học (CourseModal)
```
+---------------------------------------------------------------------------+
| [Overlay bán trong suốt bg-slate-900/60 - Focus Trap - Phím ESC đóng]      |
|                                                                           |
|   +-------------------------------------------------------------------+   |
|   | [Category Badge] [Trạng thái]                      [♥ Yêu thích] [X]|  |
|   |-------------------------------------------------------------------|   |
|   | [Ảnh Thumbnail]        | Tiêu đề khóa học đầy đủ                  |   |
|   | Thời lượng, số bài học | Mô tả ngắn                               |   |
|   |                        | Đánh giá sao, số học viên                |   |
|   |                        | Giảng viên + Avatar                      |   |
|   |                        | Giá tiền VNĐ                             |   |
|   |                        | [Xem trang chi tiết] [Lưu vào yêu thích] |   |
|   |-------------------------------------------------------------------|   |
|   | Nội dung chi tiết:                                                |   |
|   | - Những kiến thức đạt được (Outcomes checklist)                   |   |
|   | - Danh sách chương giảng dạy (Curriculum Accordion)               |   |
|   | - Yêu cầu tiên quyết                                              |   |
|   |-------------------------------------------------------------------|   |
|   | [Nhấn ESC để đóng]                                         [Đóng] |   |
|   +-------------------------------------------------------------------+   |
+---------------------------------------------------------------------------+
```

### C. Trang Chi Tiết Khóa Học (DetailPage - Route: `/item/:id`)
- Header Breadcrumb điều hướng
- Banner tối màu Emerald sang trọng với thông tin tổng quan, giảng viên, sao đánh giá
- Cột trái: Chi tiết chương trình giảng dạy từng bài, kiến thức đạt được, mô tả mở rộng
- Cột phải (Sticky card): Video preview, Giá bán, Nút đăng ký học, Nút yêu thích, Chính sách hoàn tiền 30 ngày

---

## 2. BẢNG MÀU THIẾT KẾ (COLOR PALETTE)
- **Primary Color (Emerald):** `#059669` (Tailwind `emerald-600`)
- **Primary Light:** `#ecfdf5` (Tailwind `emerald-50`)
- **Primary Dark:** `#064e3b` (Tailwind `emerald-900`)
- **Accent Yellow (Rating):** `#f59e0b` (Amber 500)
- **Accent Rose (Favorites):** `#f43f5e` (Rose 500)
- **Background:** `#f8fafc` (Slate 50)
- **Card Background:** `#ffffff`
- **Text Headings:** `#0f172a` (Slate 900)
- **Text Body:** `#334155` (Slate 700)
- **Text Muted:** `#64748b` (Slate 500)
