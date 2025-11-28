"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { ReactNode, PointerEvent } from "react";

type RotatableSphereProps = {
  children: ReactNode;
};

export function RotatableSphere({ children }: RotatableSphereProps) {
  const [rotation, setRotation] = useState({ x: -10, y: 15 });
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    const { clientX, clientY } = e;
    lastPoint.current = { x: clientX, y: clientY };
    isDragging.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current || !lastPoint.current) return;

    const { clientX, clientY } = e;
    const dx = clientX - lastPoint.current.x;
    const dy = clientY - lastPoint.current.y;

    const ROTATE_SPEED = 0.25;

    setRotation((prev) => ({
      x: prev.x + dy * ROTATE_SPEED * -1,
      y: prev.y + dx * ROTATE_SPEED,
    }));

    lastPoint.current = { x: clientX, y: clientY };
  }

  function stopDragging(e: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;
    isDragging.current = false;
    lastPoint.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }

  return (
    <motion.div
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 18,
        mass: 0.6,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      className="relative mx-auto cursor-grab active:cursor-grabbing"
    >
      {children}
    </motion.div>
  );
}
