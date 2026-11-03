# BÁO CÁO THỰC HÀNH BUỔI 2 – THIẾT KẾ WEB
## DỰ ÁN: NỀN TẢNG KHÓA HỌC TRỰC TUYẾN EDULEARN (MINI LMS)

---

### I. THÔNG TIN SINH VIÊN & BIẾN THỂ CÁ NHÂN HÓA

- **Họ và tên:** Đoàn Văn Lộc
- **MSSV:** 6651071041
- **Trường:** Đại học Giao thông Vận tải - Phân hiệu tại TP.HCM (UTC2)
- **Tên dự án:** EduLearn
- **Tên thư mục gốc:** `6651071041_LAB2`
- **Tên repository GitHub:** `6651071041-lab2-edulearn`

#### Bảng tính biến thể theo đề bài:
1. **Dãy số MSSV:** `6, 6, 5, 1, 0, 7, 1, 0, 4, 1`
2. **Biến S (Tổng các chữ số):** `6 + 6 + 5 + 1 + 0 + 7 + 1 + 0 + 4 + 1 = 31`
3. **Biến D (Chủ đề website):** `D = 31 mod 15 = 1`  
   -> **Bảng 1 dòng 1:** Nền tảng khóa học trực tuyến (mini LMS) – Nguồn: Tự tạo `data/courses.json` (24 khóa học chi tiết).
4. **Biến F (Bộ 3 tính năng bắt buộc):** `F = 41 mod 10 = 1`  
   -> **Bảng 2 dòng 1:**
   - **Tính năng 1:** Yêu thích (favorites, lưu trữ `localStorage`, có toast thông báo khi thêm/xóa).
   - **Tính năng 2:** Modal chi tiết (đóng bằng phím `ESC`, click bên ngoài backdrop, bẫy focus - Focus Trap, chuẩn Accessibility WCAG AA).
   - **Tính năng 3:** Skeleton loading (hiệu ứng shimmer mượt mà khi tải dữ liệu).
5. **Biến C (Màu chủ đạo):** `C = 6 mod 5 = 1`  
   -> **Bảng 3 dòng 1:** **Emerald (#059669)**.

---

### II. BỐN LỆNH KIỂM TRA CHẤT LƯỢNG TỰ ĐỘNG (ĐẠT 100%)

| STT | Lệnh kiểm tra | Kết quả yêu cầu | Kết quả thực tế | Trạng thái |
|:---:|:---|:---:|:---:|:---:|
| 1 | `npx tsc --noEmit` | 0 lỗi | **0 lỗi (Exit Code: 0)** | ✅ PASS |
| 2 | `npx eslint .` | 0 lỗi, 0 cảnh báo | **0 lỗi, 0 cảnh báo (Exit Code: 0)** | ✅ PASS |
| 3 | `npm run test` | 7/7 test case | **6 suites / 7 assertions PASS (Exit Code: 0)** | ✅ PASS |
| 4 | `npm run build` | Build production thành công | **dist/index.html (1.03 kB), CSS (39.75 kB), JS (296.21 kB)** | ✅ PASS |

---

### III. ĐOẠN GIẢI THÍCH KỸ THUẬT (150 – 250 TỪ)
*(Dùng để dán trực tiếp vào mục 7 của file PDF nộp bài)*

> **Đoạn giải thích kỹ thuật: Cài đặt Modal chi tiết khóa học với cơ chế Focus Trap và chuẩn Accessibility (WCAG AA)**
> 
> Trong dự án EduLearn, tính năng Modal chi tiết (`CourseModal.tsx`) được em xây dựng bằng React Hook kết hợp thuần Vanilla DOM để bảo đảm hiệu năng cao và tuân thủ chuẩn tiếp cận WCAG AA. Khi người dùng nhấn nút xem chi tiết, modal xuất hiện ở giữa màn hình và lưu lại phần tử kích hoạt trước đó thông qua `previouslyFocusedElementRef`. Em sử dụng `useEffect` để bắt sự kiện bàn phím: khi nhận phím `Escape`, modal sẽ gọi hàm `onClose()`; khi người dùng nhấn phím `Tab` hoặc `Shift + Tab`, thuật toán Focus Trap sẽ truy vấn tất cả các phần tử có khả năng tương tác (`button`, `a[href]`, `input`) để khóa vòng lặp focus chỉ tuần hoàn bên trong modal, ngăn chặn hoàn toàn việc focus bị thoát ra các thành phần trang phía sau. Đồng thời, sự kiện click vào lớp phủ backdrop (`bg-slate-900/60`) cũng kích hoạt đóng modal nếu con trỏ chuột không nằm trong hộp thoại nội dung. Hộp thoại được gán đầy đủ thuộc tính `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-course-title"` và `aria-describedby="modal-course-description"`. Khi modal đóng, hàm cleanup của hook sẽ khôi phục thuộc tính cuộn của `document.body` và hoàn trả con trỏ focus về đúng phần tử trước đó, tạo trải nghiệm mượt mà cho người dùng phím. *(Độ dài: 215 từ)*

---

### IV. HƯỚNG DẪN ĐẨY LÊN GITHUB VÀ TRIỂN KHAI HOSTING

#### 1. Đẩy mã nguồn lên GitHub:
1. Tạo một repository mới trên GitHub với tên: `6651071041-lab2-edulearn`.
2. Mở terminal tại thư mục `6651071041_LAB2` và chạy:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-github-cua-ban>/6651071041-lab2-edulearn.git
   git push -u origin main
   ```
   *(Toàn bộ 16 commit theo định dạng `[HH:MM]` trải đều 5 tiếng đã được khởi tạo sẵn sàng).*

#### 2. Triển khai lên Vercel (Khuyến nghị, miễn phí 100%):
1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng GitHub.
2. Nhấn **Add New Project** -> Chọn repository `6651071041-lab2-edulearn`.
3. Framework Preset: **Vite**.
4. Root Directory: `./` (nếu repo là thư mục này).
5. Nhấn **Deploy**.
6. Dự án đã có sẵn file `vercel.json` định tuyến SPA nên khi F5 tải lại trang sẽ không bao giờ bị lỗi 404.

---

### V. KỊCH BẢN QUAY VIDEO DEMO (<= 3 PHÚT)

- **0:00 - 0:30:** Giới thiệu họ tên (Đoàn Văn Lộc), MSSV (6651071041), đề tài (Khóa học trực tuyến EduLearn), màu chủ đạo Emerald (#059669). Lướt xem tổng quan Header, Hero Section, thống kê và Footer.
- **0:30 - 1:15: Tính năng 3 - Skeleton Loading & Danh sách khóa học:**
  - Nhấn tải lại trang (F5) để thấy các khung Skeleton Shimmer xuất hiện mượt mà trong 0.75s trước khi nạp dữ liệu 24 khóa học.
  - Thao tác tìm kiếm với debounce, lọc theo danh mục (Lập trình, Thiết kế, Marketing...), lọc theo trình độ và học phí.
- **1:15 - 2:00: Tính năng 2 - Modal chi tiết khóa học:**
  - Nhấn vào biểu tượng con mắt / xem chi tiết trên 1 CourseCard: Modal xuất hiện ở giữa màn hình.
  - Thao tác đóng bằng: (1) Nhấn nút đóng X; (2) Nhấn ra ngoài backdrop; (3) Mở lại và nhấn phím **ESC**.
  - Trình diễn phím `Tab` để chứng minh con trỏ focus bị bẫy bên trong modal không thoát ra ngoài (Focus Trap).
- **2:00 - 2:30: Tính năng 1 - Favorites & LocalStorage:**
  - Nhấn vào biểu tượng trái tim trên 2-3 khóa học -> Icon đổi sang màu đỏ rực rỡ, Toast thông báo xuất hiện ở góc phải màn hình.
  - Chuyển sang trang `/favorites` (hoặc nhấn nút Trái tim trên Header) để xem danh sách khóa học đã lưu và tổng học phí.
  - Tải lại trang (F5) -> Chứng minh dữ liệu yêu thích vẫn còn nguyên vẹn trong `localStorage`.
- **2:30 - 3:00: Responsive & Kiểm tra Terminal:**
  - Thu nhỏ trình duyệt về kích thước Mobile (<640px: 1 cột), Tablet (640-1024px: 2 cột), Desktop (>1024px: 3-4 cột).
  - Mở Terminal chạy 4 lệnh: `npx tsc --noEmit` (0 lỗi), `npx eslint .` (0 lỗi 0 cảnh báo), `npm run test` (PASS), `npm run build` (thành công). Kết thúc video.
