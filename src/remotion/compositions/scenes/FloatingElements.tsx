import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface FloatingDotProps {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  delay: number;
  amplitude: number;
}

const FloatingDot: React.FC<FloatingDotProps> = ({
  x,
  y,
  size,
  color,
  speed,
  delay,
  amplitude,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = (frame - delay * fps) / fps;

  const floatY = Math.sin(time * speed) * amplitude;
  const floatX = Math.cos(time * speed * 0.7) * (amplitude * 0.5);
  const opacity = interpolate(
    frame,
    [delay * fps, delay * fps + 20],
    [0, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity,
        transform: `translate(${floatX}px, ${floatY}px)`,
      }}
    />
  );
};

interface FloatingLineProps {
  x: number;
  y: number;
  width: number;
  angle: number;
  color: string;
  delay: number;
}

const FloatingLine: React.FC<FloatingLineProps> = ({
  x,
  y,
  width,
  angle,
  color,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = (frame - delay * fps) / fps;

  const pulse = 0.15 + 0.15 * Math.sin(time * 1.5);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width,
        height: 1,
        backgroundColor: color,
        opacity: pulse,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "center",
      }}
    />
  );
};

export const FloatingElements: React.FC = () => {
  const dots = [
    { x: 8, y: 15, size: 6, color: "#9CA3AF", speed: 1.2, delay: 0.2, amplitude: 12 },
    { x: 92, y: 25, size: 4, color: "#6B7280", speed: 0.8, delay: 0.5, amplitude: 8 },
    { x: 15, y: 75, size: 5, color: "#9CA3AF", speed: 1.0, delay: 0.3, amplitude: 15 },
    { x: 85, y: 80, size: 7, color: "#6B7280", speed: 0.9, delay: 0.1, amplitude: 10 },
    { x: 50, y: 10, size: 3, color: "#D1D5DB", speed: 1.5, delay: 0.4, amplitude: 6 },
    { x: 30, y: 90, size: 4, color: "#D1D5DB", speed: 1.1, delay: 0.6, amplitude: 9 },
    { x: 70, y: 5, size: 5, color: "#9CA3AF", speed: 0.7, delay: 0.2, amplitude: 11 },
    { x: 5, y: 50, size: 3, color: "#6B7280", speed: 1.3, delay: 0.8, amplitude: 7 },
    { x: 95, y: 55, size: 4, color: "#D1D5DB", speed: 1.0, delay: 0.3, amplitude: 13 },
  ];

  const lines = [
    { x: 12, y: 30, width: 60, angle: 35, color: "#D1D5DB", delay: 0.3 },
    { x: 80, y: 70, width: 45, angle: -20, color: "#E5E7EB", delay: 0.5 },
    { x: 25, y: 60, width: 35, angle: 70, color: "#D1D5DB", delay: 0.7 },
    { x: 65, y: 15, width: 50, angle: -45, color: "#E5E7EB", delay: 0.2 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {dots.map((dot, i) => (
        <FloatingDot key={`dot-${i}`} {...dot} />
      ))}
      {lines.map((line, i) => (
        <FloatingLine key={`line-${i}`} {...line} />
      ))}
    </div>
  );
};
