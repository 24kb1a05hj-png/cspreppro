import { useEffect, useState, useRef } from 'react';

export const useProctoring = () => {
  const [violations, setViolations] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isTracking) return;

    const handleBlur = () => {
      setViolations((prev) => prev + 1);
      console.warn('Tab focus lost! Violation recorded.');
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations((prev) => prev + 1);
        console.warn('Document hidden! Violation recorded.');
      }
    };

    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isTracking]);

  const startProctoring = async () => {
    setError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Media devices not supported in this browser or context (requires localhost or HTTPS).');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsTracking(true);
    } catch (err: any) {
      console.error('Error accessing webcam/microphone:', err);
      setError(err.message || 'Could not access camera/microphone. Please check permissions.');
      setIsTracking(false);
    }
  };

  const stopProctoring = () => {
    setIsTracking(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return { violations, isTracking, error, startProctoring, stopProctoring, videoRef };
};
