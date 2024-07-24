import { useEffect, useRef, useCallback } from 'react';

const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const startTimeRef = useRef();

  const animate = useCallback(time => {
    if (!startTimeRef.current) {
      startTimeRef.current = time;
    }
    const elapsedTime = (time - startTimeRef.current) / 1000; // Convert to seconds

    callback(elapsedTime);

    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
};

export default useAnimationFrame;
