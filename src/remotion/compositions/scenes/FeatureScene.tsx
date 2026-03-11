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
}

export const FeatureScene: React.FC<FeatureSceneProps> = ({
  label,
  title,
  description,
  imageUrl,
  iconUrl,
  accentColor = "#6B7280",
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
  const labelX = interpolate(frame, [15, 30], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Accent bar
  const barHeight = interpolate(frame, [10, 35], [0, 50], {
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
  const ringOpacity = interpolate(frame, [25, 40], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex" }}>
      {/* Left content side */}
      <div
        style={{
          flex: "0 0 50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 100,
          paddingRight: 60,
          position: "relative",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            left: 72,
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
            marginBottom: 14,
          }}
        >
          <Img
            src={iconUrl}
            style={{ width: 22, height: 22 }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: accentColor,
              letterSpacing: "0.2em",
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
          style={{ marginBottom: 20 }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#262626",
              lineHeight: 1.1,
              textWrap: "balance",
            }}
          >
            {title}
          </div>
        </TextAnimation>

        {/* Description */}
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
              fontSize: 20,
              fontWeight: 400,
              color: "#6B7280",
              lineHeight: 1.6,
              maxWidth: 440,
            }}
          >
            {description}
          </FadeInWords>
        </div>
      </div>

      {/* Right image side */}
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
        {/* Decorative ring behind image */}
        <div
          style={{
            position: "absolute",
            opacity: ringOpacity,
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

        {/* Image container */}
        <div
          style={{
            width: 540,
            height: 360,
            borderRadius: 16,
            overflow: "hidden",
            opacity: imageOpacity,
            clipPath: `inset(0 ${imageClip}% 0 0)`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
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
    </div>
  );
};
