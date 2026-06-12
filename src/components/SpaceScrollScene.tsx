"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  attribute float aAlpha;
  attribute vec3 aRandomness;

  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uAmplitude;
  uniform float uFrequency;
  uniform float uSpeed;
  uniform float uDepth;

  varying float vAlpha;
  varying float vDistance;
  varying float vNoise;
  varying vec3 vColor;

  uniform float uRcolor;
  uniform float uGcolor;
  uniform float uBcolor;
  uniform float uRnoise;
  uniform float uGnoise;
  uniform float uBnoise;
  uniform float uDissipation;

  const float PI = 3.1415926535897932384626433832795;

  // Simplex noise helpers
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);
    for (int i = 0; i < 4; ++i) {
      v += a * snoise(x + uTime * uSpeed * 0.15);
      x = x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vNoise = fbm(position * uFrequency);

    // Color with noise variation
    float r = uRcolor / 255.0 + (clamp(vNoise, 0.0, 1.0) * 2.0 * (uRnoise - uRcolor) / 255.0);
    float g = uGcolor / 255.0 + (clamp(vNoise, 0.0, 1.0) * 2.0 * (uGnoise - uGcolor) / 255.0);
    float b = uBcolor / 255.0 + (clamp(vNoise, 0.0, 1.0) * 2.0 * (uBnoise - uBcolor) / 255.0);
    vColor = vec3(r, g, b);

    // Displace with noise
    vec3 displaced = position * (1.0 + uAmplitude * vNoise);
    displaced += uDepth * aRandomness * snoise(position + vec3(uTime * uSpeed));

    // Dissipation: push points outward along their normal and along a per-point random direction.
    vec3 outward = normalize(position);
    float burst = uDissipation * (8.0 + length(aRandomness) * 60.0);
    displaced += outward * burst;
    displaced += aRandomness * uDissipation * 40.0;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vDistance = -mvPosition.z;
    gl_PointSize = uSize * uPixelRatio * (80.0 / vDistance);
    gl_PointSize = clamp(gl_PointSize, 0.5, 6.0);

    vAlpha = aAlpha * (80.0 / vDistance) * (1.0 - uDissipation);
    vAlpha = clamp(vAlpha, 0.0, 0.9);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    // Hard crisp dot
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.4) discard;
    gl_FragColor = vec4(vColor, vAlpha);
  }
`;

const PARTICLE_COUNT = 25000;

interface SphereProps {
  dissipation: number;
  baseColor?: [number, number, number];
  noiseColor?: [number, number, number];
}

function ParticleSphere({
  dissipation,
  baseColor = [8, 60, 35],
  noiseColor = [30, 200, 160],
}: SphereProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const alphas = new Float32Array(PARTICLE_COUNT);
    const randomness = new Float32Array(PARTICLE_COUNT * 3);
    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = (2 * Math.PI * i) / phi;
      const acos = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
      positions[3 * i] = 2.2 * Math.sin(acos) * Math.cos(theta);
      positions[3 * i + 1] = 2.2 * Math.sin(acos) * Math.sin(theta);
      positions[3 * i + 2] = 2.2 * Math.cos(acos);
      alphas[i] = 0.5 + 0.5 * Math.random();
      randomness[3 * i] = (Math.random() - 0.5) * 0.08;
      randomness[3 * i + 1] = (Math.random() - 0.5) * 0.08;
      randomness[3 * i + 2] = (Math.random() - 0.5) * 0.08;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
    geo.setAttribute("aRandomness", new THREE.BufferAttribute(randomness, 3));
    return {
      geometry: geo,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 1 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uAmplitude: { value: 0.12 },
        uFrequency: { value: 1.2 },
        uSpeed: { value: 0.3 },
        uDepth: { value: 0.5 },
        uRcolor: { value: baseColor[0] },
        uGcolor: { value: baseColor[1] },
        uBcolor: { value: baseColor[2] },
        uRnoise: { value: noiseColor[0] },
        uGnoise: { value: noiseColor[1] },
        uBnoise: { value: noiseColor[2] },
        uDissipation: { value: 0 },
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseColor[0], baseColor[1], baseColor[2], noiseColor[0], noiseColor[1], noiseColor[2]]);

  useFrame((state) => {
    const material = materialRef.current;
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uDissipation.value = dissipation;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = 0.06 * state.clock.elapsedTime;
      pointsRef.current.rotation.x = 0.1 * Math.sin(0.03 * state.clock.elapsedTime);
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function createDustPositions() {
  const arr = new Float32Array(900);
  for (let i = 0; i < 300; i++) {
    arr[3 * i] = (Math.random() - 0.5) * 15;
    arr[3 * i + 1] = (Math.random() - 0.5) * 10;
    arr[3 * i + 2] = (Math.random() - 0.5) * 10;
  }
  return arr;
}

const DUST_POSITIONS = createDustPositions();

function DustField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = DUST_POSITIONS;

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = 0.008 * state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#22c55e"
        transparent
        opacity={0.15}
        sizeAttenuation
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface SceneContentsProps extends SphereProps {
  transparent: boolean;
  dust: boolean;
}

function SceneContents({ dissipation, transparent, baseColor, noiseColor, dust }: SceneContentsProps) {
  return (
    <>
      {!transparent && <color attach="background" args={["#0a0a0b"]} />}
      <ambientLight intensity={0.05} />
      <ParticleSphere dissipation={dissipation} baseColor={baseColor} noiseColor={noiseColor} />
      {dust && <DustField />}
    </>
  );
}

function CameraRig({
  offsetX,
  offsetY,
  scale,
}: {
  offsetX: number;
  offsetY: number;
  scale: number;
}) {
  useFrame(({ camera, size }) => {
    const aspect = size.width / size.height;
    const base = aspect < 0.8 ? 7 : aspect < 1.2 ? 6.2 : 5.5;
    const targetZ = base / scale;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.position.x += (-(0.8 * base * offsetX) - camera.position.x) * 0.05;
    camera.position.y += (-(0.9326 * offsetY) * targetZ - camera.position.y) * 0.05;
  });

  return null;
}

export interface SpaceScrollSceneProps {
  className?: string;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  dissipation?: number;
  transparent?: boolean;
  baseColor?: [number, number, number];
  noiseColor?: [number, number, number];
  dust?: boolean;
}

export function SpaceScrollScene({
  className,
  offsetX = 0,
  offsetY = 0,
  scale = 1,
  dissipation = 0,
  transparent = false,
  baseColor,
  noiseColor,
  dust = true,
}: SpaceScrollSceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: transparent,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none" }}
      >
        <SceneContents
          dissipation={dissipation}
          transparent={transparent}
          baseColor={baseColor}
          noiseColor={noiseColor}
          dust={dust}
        />
        <CameraRig offsetX={offsetX} offsetY={offsetY} scale={scale} />
      </Canvas>
    </div>
  );
}
