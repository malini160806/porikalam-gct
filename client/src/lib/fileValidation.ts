export const MAX_PAYMENT_SCREENSHOT_BYTES = 200 * 1024;

/** Returns a human-readable error if the payment screenshot exceeds the size cap, or null if it's fine. */
export function validatePaymentScreenshot(file: File): string | null {
  if (file.size > MAX_PAYMENT_SCREENSHOT_BYTES) {
    return `Payment screenshot must be under 200KB (selected file is ${Math.ceil(file.size / 1024)}KB). Compress it and try again.`;
  }
  return null;
}
