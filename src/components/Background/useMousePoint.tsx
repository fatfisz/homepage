import { MutableRefObject, useEffect, useRef } from 'react';

export function useMousePoint(): MutableRefObject<{ x: number; y: number } | null> {
  const mouse = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function onMouseMove(event: MouseEvent): void {
      mouse.current = { x: event.pageX, y: event.pageY };
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
