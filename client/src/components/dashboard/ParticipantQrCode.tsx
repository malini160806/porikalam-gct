import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

type ParticipantQrCodeProps = {
  username: string;
  size?: number;
};

/** Renders the participant's username as a scannable QR code — admins scan this at
 * check-in to look up which events the participant is confirmed for. */
export function ParticipantQrCode({ username, size = 88 }: ParticipantQrCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    void QRCode.toCanvas(canvasRef.current, username, {
      width: size,
      margin: 0,
      color: { dark: '#0a1a3c', light: '#ffffff' },
    });
  }, [username, size]);

  return <canvas ref={canvasRef} width={size} height={size} aria-label={`QR code for ${username}`} />;
}
