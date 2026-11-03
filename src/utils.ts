/**
 * EduLearn - Utility Functions
 * MSSV: 6651071041
 */

/**
 * Định dạng số tiền thành chuỗi tiền tệ (mặc định VND)
 * @param amount - Số tiền cần định dạng
 * @param currency - Đơn vị tiền tệ (mặc định VND)
 * @returns Chuỗi tiền tệ đã được định dạng (ví dụ: "150.000 ₫")
 */
export function formatCurrency(amount: number, currency: string = 'VND'): string {
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (currency === 'VND' || currency === '₫' || !currency) {
    return `${formatted} ₫`;
  }
  return `${formatted} ${currency}`;
}

/**
 * Cắt ngắn văn bản nếu vượt quá độ dài tối đa và thêm dấu ba chấm
 * @param text - Chuỗi văn bản gốc
 * @param maxLength - Số ký tự tối đa cho phép
 * @returns Chuỗi đã cắt ngắn kèm '...' nếu dài hơn maxLength
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

/**
 * Kiểm tra tính hợp lệ của địa chỉ email
 * @param email - Chuỗi email cần kiểm tra
 * @returns true nếu hợp lệ, false nếu không hợp lệ
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Hàm debounce làm trễ việc thực thi một hàm cho đến khi hết khoảng thời gian delay
 * An toàn kiểu TypeScript không dùng 'any'
 * @param fn - Hàm cần debounce
 * @param delay - Thời gian trễ tính bằng mili-giây
 * @returns Hàm đã được bọc debounce
 */
export function debounce<Args extends unknown[], R = void>(
  fn: (...args: Args) => R,
  delay: number
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Args): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
