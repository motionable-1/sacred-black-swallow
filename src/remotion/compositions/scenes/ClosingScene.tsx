import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { TextAnimation, FadeInWords, FadeInChars } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Industries text
  const industriesOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const industriesY = interpolate(frame, [0, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Divider
  const dividerWidth = interpolate(frame, [30, 55], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Website URL
  const urlOpacity = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(frame, [70, 85], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtle glow pulse behind hexagon
  const glowScale = 1 + 0.05 * Math.sin((frame / fps) * 2);
  const glowOpacity = interpolate(frame, [40, 55], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Industry pill animations
  const industries = ["Media", "Entertainment", "Robotics", "Science"];
  
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        {/* Tagline */}
        <TextAnimation
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 25,
              scale: 0.95,
              duration: 0.6,
              stagger: 0.07,
              ease: "power3.out",
            });
            return tl;
          }}
          startFrom={5}
          style={{ textAlign: "center", marginBottom: 24 }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#262626",
              lineHeight: 1.2,
              textWrap: "balance",
            }}
          >
            The Next Frontier of Intelligence
          </div>
        </TextAnimation>

        {/* Subtitle */}
        <div
          style={{
            opacity: industriesOpacity,
            transform: `translateY(${industriesY}px)`,
            marginBottom: 20,
          }}
        >
          <FadeInWords
            startFrom={20}
            stagger={0.06}
            style={{
              fontSize: 20,
              color: "#6B7280",
              textAlign: "center",
              maxWidth: 600,
              lineHeight: 1.5,
            }}
          >
            Models that understand, perceive, generate and act in the world
          </FadeInWords>
        </div>

        {/* Industry pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 30,
          }}
        >
          {industries.map((ind, i) => {
            const pillDelay = 35 + i * 5;
            const pillOpacity = interpolate(frame, [pillDelay, pillDelay + 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const pillScale = interpolate(frame, [pillDelay, pillDelay + 12], [0.8, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.5)),
            });
            return (
              <div
                key={ind}
                style={{
                  opacity: pillOpacity,
                  transform: `scale(${pillScale})`,
                  padding: "8px 22px",
                  borderRadius: 100,
                  border: "1px solid #D1D5DB",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#6B7280",
                  letterSpacing: "0.05em",
                }}
              >
                {ind}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div
          style={{
            width: dividerWidth,
            height: 1,
            background: "linear-gradient(90deg, transparent, #9CA3AF, transparent)",
            marginBottom: 30,
          }}
        />

        {/* Hexagon + glow */}
        <div style={{ position: "relative", marginBottom: 24 }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${glowScale})`,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, #6B728040, transparent 70%)",
              opacity: glowOpacity,
            }}
          />
          <div
            style={{
              opacity: interpolate(frame, [50, 65], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `scale(${interpolate(frame, [50, 65], [0.5, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.back(1.6)),
              })})`,
            }}
          >
            <ShapeAnimation
              shape="hexagon"
              animation="breathe"
              size={50}
              color="#6B7280"
              speed={0.3}
            />
          </div>
        </div>

        {/* RUNWAY text */}
        <FadeInChars
          startFrom={58}
          stagger={0.04}
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: "#262626",
            letterSpacing: "0.12em",
            marginBottom: 14,
          }}
        >
          RUNWAY
        </FadeInChars>

        {/* URL */}
        <div
          style={{
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
          }}
        >
          <FadeInChars
            startFrom={75}
            stagger={0.02}
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: "#9CA3AF",
              letterSpacing: "0.15em",
            }}
          >
            runwayml.com
          </FadeInChars>
        </div>
      </div>
    </div>
  );
};
