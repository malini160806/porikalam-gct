import { useEffect, useId, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

type QrScannerProps = {
  onScan: (decodedText: string) => void;
};

/** Thin wrapper around html5-qrcode's self-contained scanner UI (camera picker, permission
 * prompt, and a "scan from file" fallback) — it renders itself into the given container. */
export function QrScanner({ onScan }: QrScannerProps) {
  const containerId = `qr-scanner-${useId()}`.replace(/:/g, '');
  const onScanRef = useRef(onScan);

  useEffect(() => {
    onScanRef.current = onScan;
  });

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      containerId,
      { fps: 10, qrbox: 240, rememberLastUsedCamera: true },
      false,
    );
    scanner.render((decodedText) => onScanRef.current(decodedText), undefined);

    return () => {
      scanner.clear().catch(() => undefined);
    };
  }, [containerId]);

  return <div id={containerId} className="mx-auto w-full max-w-sm [&_*]:font-body" />;
}
