import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three'

const useMouse = () => {
  const screenCursor = useRef(new THREE.Vector2(9999, 9999));
  const screenCursorPrevious = useRef(new THREE.Vector2(9999, 9999))
  const camCursor = useRef(new THREE.Vector2(9999, 9999));
  
  useEffect(() => {
    const handlePointMove = (event) => {
        screenCursor.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        screenCursor.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

        camCursor.current.x = (event.clientX - window.innerWidth / 2) * 0.005;
        camCursor.current.y = (event.clientY - window.innerHeight / 2) * 0.005;

    }

    window.addEventListener('pointermove', handlePointMove);

    return () => window.removeEventListener('pointermove', handlePointMove);
  }, [])
  const getCursorDistance = () => {
    const cursorDistance = screenCursorPrevious.current.distanceTo(screenCursor.current) * 10;

    // const normalized = Math.min(Math.max(1 + cursorDistance, 1), 2);
    const normalized = Math.min(Math.max(cursorDistance, 0) + 0.3, .9);
    screenCursorPrevious.current.copy(screenCursor.current);

    return normalized;
  }

  return {
    camCursor,
    screenCursor,
    screenCursorPrevious,
    getCursorDistance,
  };
};

export default useMouse;