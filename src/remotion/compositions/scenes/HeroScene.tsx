import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { TextAnimation, FadeInWords } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Logo mark animation
  const logoScale = interpolate(frame, [0, 25], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Horizontal line expand
  const lineWidth = interpolate(frame, [20, 50], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const lineOpacity = interpolate(frame, [20, 30], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline fade
  const taglineOpacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const taglineY = interpolate(frame, [55, 70], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        {/* Logo mark - geometric shape */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            marginBottom: 20,
          }}
        >
          <ShapeAnimation
            shape="hexagon"
            animation="breathe"
            size={70}
            color="#6B7280"
            speed={0.3}
          />
        </div>

        {/* RUNWAY text */}
        <TextAnimation
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.from(split.chars, {
              opacity: 0,
              y: 40,
              scale: 0.8,
              duration: 0.7,
              stagger: 0.06,
              ease: "back.out(1.7)",
            });
            return tl;
          }}
          startFrom={10}
          style={{ textAlign: "center" }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              color: "#262626",
              letterSpacing: "0.12em",
              lineHeight: 1,
            }}
          >
            RUNWAY
          </div>
        </TextAnimation>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: "linear-gradient(90deg, transparent, #6B7280, transparent)",
            opacity: lineOpacity,
            marginTop: 18,
            marginBottom: 18,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          <FadeInWords
            startFrom={55}
            stagger={0.08}
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "#6B7280",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Building AI to Simulate the World
          </FadeInWords>
        </div>
      </div>
    </div>
  );
};
