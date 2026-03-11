import React from "react";
import {
  AbsoluteFill,
  Artifact,
  useCurrentFrame,
  Img,
  Audio,
  Sequence,
} from "remotion";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import {
  TransitionSeries,
  linearTiming,
} from "../library/components/layout/Transition";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { GridBackground } from "../library/components/effects/GridBackground";
import { FloatingElements } from "./scenes/FloatingElements";
import { HeroScene } from "./scenes/HeroScene";
import { FeatureScene } from "./scenes/FeatureScene";
import { ClosingScene } from "./scenes/ClosingScene";

const NEURAL_IMG =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/uploads/1773232015274_qpa40gj26s_runway_ai_neural.png";
const ROBOTICS_IMG =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/uploads/1773232026400_950kxr6t1ll_runway_robotics.png";
const WORLD_SIM_IMG =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/uploads/1773232037636_w0fpz1lqmwi_runway_world_sim.png";

const ALL_IMAGES = [NEURAL_IMG, ROBOTICS_IMG, WORLD_SIM_IMG];

export const Main: React.FC = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk();
  loadDMSans();
  const frame = useCurrentFrame();



  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill
        style={{
          backgroundColor: "#FFFFFF",
          fontFamily: headingFont,
        }}
      >
        {/* Global background - subtle grid + floating elements */}
        <GridBackground
          cellSize={60}
          color="rgba(107, 114, 128, 0.04)"
          style="lines"
          animate
          velocity={8}
          direction="up"
          fadeEdges
        />
        <FloatingElements />

        {/* Preload all images so they're ready across all scenes */}
        <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", opacity: 0 }}>
          {ALL_IMAGES.map((src) => (
            <Img key={src} src={src} style={{ width: 1, height: 1 }} />
          ))}
        </div>

        {/* Transition sound effects */}
        {[120, 250, 380, 510].map((f) => (
          <Sequence key={f} from={f} durationInFrames={60}>
            <Audio
              src="https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773232664193_b5ajgsij3ul_sfx_Soft_ambient_tech_whoosh__mini.mp3"
              volume={0.3}
            />
          </Sequence>
        ))}

        {/* Scenes with transitions */}
        <TransitionSeries>
          {/* Scene 1: Hero intro */}
          <TransitionSeries.Sequence durationInFrames={140}>
            <AbsoluteFill style={{ fontFamily: headingFont }}>
              <HeroScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: 20 })}
          />

          {/* Scene 2: Gen-4.5 */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <AbsoluteFill style={{ fontFamily: headingFont }}>
              <FeatureScene
                label="Gen-4.5"
                title="The World's Best Generative Video Model"
                description="Superior motion quality and visual fidelity. Create stunning, photorealistic video content that pushes the boundaries of what AI can generate."
                imageUrl={NEURAL_IMG}
                iconUrl="https://api.iconify.design/lucide/video.svg?color=%236B7280&width=22"
                accentColor="#6B7280"
              />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: 20 })}
          />

          {/* Scene 3: GWM Robotics */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <AbsoluteFill style={{ fontFamily: headingFont }}>
              <FeatureScene
                label="GWM Robotics"
                title="World Models for Physical Intelligence"
                description="Simulating physical interactions and robotic behaviors. World models that understand the laws of physics to power the next generation of robotics."
                imageUrl={ROBOTICS_IMG}
                iconUrl="https://api.iconify.design/mdi/robot-outline.svg?color=%236B7280&width=22"
                accentColor="#6B7280"
                reversed
              />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: 20 })}
          />

          {/* Scene 4: Runway Characters */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <AbsoluteFill style={{ fontFamily: headingFont }}>
              <FeatureScene
                label="Characters"
                title="Real-Time Autonomous Video Agents"
                description="Natural conversation abilities powered by AI. Runway Characters brings autonomous video agents to life with unprecedented realism and interactivity."
                imageUrl={WORLD_SIM_IMG}
                iconUrl="https://api.iconify.design/lucide/globe.svg?color=%236B7280&width=22"
                accentColor="#6B7280"
              />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: 20 })}
          />

          {/* Scene 5: Closing CTA */}
          <TransitionSeries.Sequence durationInFrames={180}>
            <AbsoluteFill style={{ fontFamily: headingFont }}>
              <ClosingScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
