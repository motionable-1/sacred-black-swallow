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
  const urlScale = interpolate(frame, [70, 85], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  // Subtle glow pulse behind hexagon
  const glowScale = 1 + 0.05 * Math.sin((frame / fps) * 2);
  const glowOpacity = interpolate(frame, [40, 55], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom line animation
  const bottomLineWidth = interpolate(frame, [85, 110], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Industry pill animations
  const industries = ["Media", "Entertainment", "Robotics", "Science"];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Main headline */}
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
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#1a1a1a",
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
            marginBottom: 24,
          }}
        >
          <FadeInWords
            startFrom={20}
            stagger={0.06}
            style={{
              fontSize: 21,
              color: "#4B5563",
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
            gap: 14,
            marginBottom: 32,
          }}
        >
          {industries.map((ind, i) => {
            const pillDelay = 35 + i * 5;
            const pillOpacity = interpolate(
              frame,
              [pillDelay, pillDelay + 12],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );
            const pillScale = interpolate(
              frame,
              [pillDelay, pillDelay + 12],
              [0.8, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.back(1.5)),
              }
            );
            return (
              <div
                key={ind}
                style={{
                  opacity: pillOpacity,
                  transform: `scale(${pillScale})`,
                  padding: "10px 26px",
                  borderRadius: 100,
                  border: "1.5px solid #9CA3AF",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#4B5563",
                  letterSpacing: "0.06em",
                  backgroundColor: "rgba(156, 163, 175, 0.06)",
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
            background:
              "linear-gradient(90deg, transparent, #6B7280, transparent)",
            marginBottom: 32,
          }}
        />

        {/* Hexagon + glow */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${glowScale})`,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #6B728050, transparent 70%)",
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
            fontSize: 42,
            fontWeight: 700,
            color: "#1a1a1a",
            letterSpacing: "0.14em",
            marginBottom: 14,
          }}
        >
          RUNWAY
        </FadeInChars>

        {/* Bottom line under RUNWAY */}
        <div
          style={{
            width: bottomLineWidth,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #9CA3AF, transparent)",
            marginBottom: 20,
          }}
        />

        {/* URL - prominent and bold */}
        <div
          style={{
            opacity: urlOpacity,
            transform: `scale(${urlScale})`,
          }}
        >
          <FadeInChars
            startFrom={75}
            stagger={0.02}
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "#4B5563",
              letterSpacing: "0.12em",
            }}
          >
            runwayml.com
          </FadeInChars>
        </div>
      </div>
    </div>
  );
};
