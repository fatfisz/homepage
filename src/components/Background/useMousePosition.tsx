import { MutableRefObject, useEffect, useRef } from 'react';

export function useMousePosition(): MutableRefObject<{ x: number; y: number } | null> {
  const mouse = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function onMouseMove(event: MouseEvent): void {
      mouse.current = { x: event.clientX, y: event.clientY };
    }

    function onMouseOut(): void {
      mouse.current = null;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return mouse;
}
