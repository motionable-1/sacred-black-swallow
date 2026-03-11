import React from "react";
import { useCurrentFrame, interpolate, Easing, Img } from "remotion";
import { TextAnimation, FadeInWords } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

interface FeatureSceneProps {
  label: string;
  title: string;
  description: string;
  imageUrl: string;
  iconUrl: string;
  accentColor?: string;
  /** Flip layout: image on left, text on right */
  reversed?: boolean;
}

export const FeatureScene: React.FC<FeatureSceneProps> = ({
  label,
  title,
  description,
  imageUrl,
  iconUrl,
  accentColor = "#6B7280",
  reversed = false,
}) => {
  const frame = useCurrentFrame();

  // Image reveal
  const imageScale = interpolate(frame, [0, 40], [1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const imageClipDir = reversed ? "left" : "right";
  const imageClip = interpolate(frame, [0, 30], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Label animation
  const labelOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelX = interpolate(frame, [15, 30], [reversed ? 20 : -20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Accent bar
  const barHeight = interpolate(frame, [10, 35], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Description fade
  const descOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(frame, [40, 55], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Decorative ring
  const ringOpacity = interpolate(frame, [25, 40], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringScale = interpolate(frame, [25, 50], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Soft accent gradient behind image
  const gradientOpacity = interpolate(frame, [10, 30], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const clipPathValue =
    imageClipDir === "right"
      ? `inset(0 ${imageClip}% 0 0)`
      : `inset(0 0 0 ${imageClip}%)`;

  const contentSide = (
    <div
      style={{
        flex: "0 0 50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: reversed ? 80 : 110,
        paddingRight: reversed ? 110 : 60,
        position: "relative",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          left: reversed ? undefined : 82,
          right: reversed ? 82 : undefined,
          top: "50%",
          transform: "translateY(-50%)",
          width: 3,
          height: barHeight,
          backgroundColor: accentColor,
          borderRadius: 2,
        }}
      />

      {/* Label */}
      <div
        style={{
          opacity: labelOpacity,
          transform: `translateX(${labelX}px)`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <Img src={iconUrl} style={{ width: 22, height: 22 }} />
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#4B5563",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>

      {/* Title */}
      <TextAnimation
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          tl.from(split.words, {
            opacity: 0,
            y: 30,
            rotationX: -15,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          });
          return tl;
        }}
        startFrom={18}
        style={{ marginBottom: 22 }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1.1,
            textWrap: "balance",
          }}
        >
          {title}
        </div>
      </TextAnimation>

      {/* Description - improved contrast */}
      <div
        style={{
          opacity: descOpacity,
          transform: `translateY(${descY}px)`,
        }}
      >
        <FadeInWords
          startFrom={40}
          stagger={0.04}
          style={{
            fontSize: 19,
            fontWeight: 400,
            color: "#4B5563",
            lineHeight: 1.65,
            maxWidth: 440,
          }}
        >
          {description}
        </FadeInWords>
      </div>
    </div>
  );

  const imageSide = (
    <div
      style={{
        flex: "0 0 50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft accent gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${reversed ? "30%" : "70%"} 50%, ${accentColor}, transparent 70%)`,
          opacity: gradientOpacity,
        }}
      />

      {/* Decorative ring behind image */}
      <div
        style={{
          position: "absolute",
          opacity: ringOpacity,
          transform: `scale(${ringScale})`,
        }}
      >
        <ShapeAnimation
          shape="ring"
          animation="rotate"
          size={520}
          color={accentColor}
          strokeWidth={1}
          speed={0.08}
        />
      </div>

      {/* Second smaller decorative ring */}
      <div
        style={{
          position: "absolute",
          opacity: ringOpacity * 0.6,
          transform: `scale(${ringScale * 0.7})`,
        }}
      >
        <ShapeAnimation
          shape="ring"
          animation="rotate"
          size={420}
          color={accentColor}
          strokeWidth={0.5}
          speed={-0.05}
        />
      </div>

      {/* Image container - larger with shadow */}
      <div
        style={{
          width: 560,
          height: 370,
          borderRadius: 14,
          overflow: "hidden",
          opacity: imageOpacity,
          clipPath: clipPathValue,
          boxShadow:
            "0 25px 80px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <Img
          src={imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imageScale})`,
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: reversed ? "row-reverse" : "row",
      }}
    >
      {contentSide}
      {imageSide}
    </div>
  );
};
