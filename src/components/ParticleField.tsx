import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

const IS_MOBILE =
  typeof window !== "undefined" &&
  (window.matchMedia?.("(pointer: coarse)").matches || window.innerWidth < 768);

// Contagem calibrada idêntica ao tier de alta fluidez (60fps cravados sem travar a GPU)
const PARTICLE_COUNT = IS_MOBILE ? 4200 : 10000;
const SAMPLE_W = IS_MOBILE ? 160 : 220;
const SHAPE_SCALE = IS_MOBILE ? 7.2 : 11.5;

const SHAPES = [
  "/particles/particle_kr.png",
  "/particles/particle_tooth.png",
  "/particles/particle_diamond.png",
  "/particles/particle_smile.png",
];

function sampleImage(url: string): Promise<Float32Array> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const aspect = img.height / img.width;
      const w = SAMPLE_W;
      const h = Math.round(SAMPLE_W * aspect);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;

      const candidates: number[] = [];
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (lum > 62) candidates.push(x, y);
        }
      }

      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const count = candidates.length / 2;

      for (let p = 0; p < PARTICLE_COUNT; p++) {
        let cx: number, cy: number;
        if (count > 0) {
          const c = Math.floor(Math.random() * count) * 2;
          cx = candidates[c];
          cy = candidates[c + 1];
        } else {
          cx = Math.random() * w;
          cy = Math.random() * h;
        }
        const nx = cx / w - 0.5;
        const ny = -(cy / h - 0.5);
        positions[p * 3] = nx * SHAPE_SCALE + (Math.random() - 0.5) * 0.05;
        positions[p * 3 + 1] =
          ny * SHAPE_SCALE * aspect + (Math.random() - 0.5) * 0.05;
        positions[p * 3 + 2] = (Math.random() - 0.5) * 0.45;
      }
      resolve(positions);
    };
    img.onerror = reject;
    img.src = url;
  });
}

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uMouse;
  uniform float uMouseRadius;
  uniform float uMouseStrength;
  uniform float uEnergy;
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute vec3 aScatter;
  attribute float aRand;
  attribute vec3 aColor;
  varying float vRand;
  varying vec3 vColor;
  varying float vDepth;

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
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

  vec3 curl(vec3 p){
    return vec3(
      snoise(p),
      snoise(p + vec3(31.4, 17.7, 9.2)),
      snoise(p + vec3(7.1, 91.3, 45.8))
    );
  }

  void main(){
    vRand = aRand;
    vColor = aColor;
    float p = uProgress;
    float ep = smoothstep(0.0, 1.0, p);

    vec3 formed = mix(aStart, aEnd, ep);

    float m = 1.0 - abs(p - 0.5) * 2.0;
    float disp = smoothstep(0.42, 1.0, m);
    disp = pow(disp, 1.3);

    float t = uTime * 0.12;
    vec3 flow = curl(formed * 0.22 + t + aRand * 6.2831);
    vec3 scat = aScatter + flow * (0.35 + disp * 0.55);

    vec3 pos = mix(formed, scat, disp);
    pos += flow * (0.022 * (0.15 + 0.85 * uEnergy) + disp * 0.85);

    vec4 world = modelMatrix * vec4(pos, 1.0);
    vec2 toM = world.xy - uMouse.xy;
    float dM = length(toM);
    float infl = smoothstep(uMouseRadius, 0.0, dM);
    vec2 dir = toM / max(dM, 0.0001);
    vec2 tang = vec2(-dir.y, dir.x);
    world.xy += (dir * 0.9 + tang * 0.5) * infl * uMouseStrength;
    world.z += infl * uMouseStrength * 0.35;

    vec4 mv = viewMatrix * world;
    vDepth = -mv.z;
    gl_PointSize = uSize * uPixelRatio * (1.0 / -mv.z) * (0.55 + aRand * 0.9) * (1.0 + infl * 0.7);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vRand;
  varying vec3 vColor;
  varying float vDepth;
  uniform float uOpacity;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uTime;
  uniform float uLight;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    float fog = smoothstep(uFogFar, uFogNear, vDepth);
    a *= mix(0.18, 1.0, fog);
    float irid = 0.5 + 0.5 * sin(vDepth * 1.5 + uTime * 0.5 + vRand * 6.2831);
    vec3 sheen = mix(vec3(0.22, 0.5, 0.95), vec3(0.96, 0.62, 0.3), irid);
    vec3 col = mix(vColor, sheen, 0.13);
    float op = a * uOpacity * (1.0 - clamp(uLight * 2.4, 0.0, 1.0));
    gl_FragColor = vec4(col, op);
  }
`;

const starsVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aPhase;
  attribute float aSize;
  attribute vec3 aDrift;
  varying float vTw;
  varying float vEdge;
  varying float vDepth;
  void main(){
    vTw = 0.25 + 0.75 * (0.5 + 0.5 * sin(uTime * 0.8 + aPhase * 6.2831));
    vec3 p = position;
    p.x += sin(uTime * aDrift.x + aPhase * 6.2831) * aDrift.z;
    p.y += cos(uTime * aDrift.y + aPhase * 6.2831) * aDrift.z;
    p.z += sin(uTime * aDrift.x * 0.6 + aPhase * 3.1416) * aDrift.z * 0.6;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vEdge = clamp(length(ndc) * 1.15 - 0.08, 0.0, 1.0);
    gl_PointSize = aSize * uPixelRatio * (90.0 / -mv.z);
    gl_Position = clip;
  }
`;

const starsFragment = /* glsl */ `
  varying float vTw;
  varying float vEdge;
  varying float vDepth;
  uniform float uOpacity;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uLight;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    float center = mix(0.08, 1.0, vEdge);
    float fog = smoothstep(uFogFar, uFogNear, vDepth);
    a *= mix(0.12, 1.0, fog);
    gl_FragColor = vec4(vec3(0.86, 0.85, 0.82), a * vTw * center * uOpacity * (1.0 - clamp(uLight * 2.4, 0.0, 1.0)));
  }
`;

type StarLayer = {
  count: number;
  zNear: number;
  zRange: number;
  sizeMin: number;
  sizeRange: number;
  opacity: number;
  pointerAmt: number;
  scrollAmt: number;
  driftAmt: number;
};

function Stars({ layer }: { layer: StarLayer }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = IS_MOBILE ? Math.round(layer.count * 0.5) : layer.count;
    const pos = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const size = new Float32Array(count);
    const drift = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 56;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 2] = layer.zNear - Math.random() * layer.zRange;
      phase[i] = Math.random();
      size[i] = layer.sizeMin + Math.random() * layer.sizeRange;
      drift[i * 3] = 0.08 + Math.random() * 0.38;
      drift[i * 3 + 1] = 0.08 + Math.random() * 0.38;
      drift[i * 3 + 2] = (0.12 + Math.random() * 0.5) * layer.driftAmt;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aDrift", new THREE.BufferAttribute(drift, 3));
    return g;
  }, [layer]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: layer.opacity },
      uFogNear: { value: 6.0 },
      uFogFar: { value: 42.0 },
      uLight: { value: 0 },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1,
      },
    }),
    [layer]
  );

  useFrame((state, delta) => {
    if (scrollState.light > 0.45) return;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
      matRef.current.uniforms.uLight.value = scrollState.light;
    }
    if (groupRef.current) {
      const e = state.clock.elapsedTime;
      const tx =
        scrollState.pointerX * layer.pointerAmt + Math.sin(e * 0.05) * layer.driftAmt;
      const ty =
        -scrollState.pointerY * layer.pointerAmt * 0.6 +
        scrollState.progress * layer.scrollAmt +
        Math.cos(e * 0.04) * layer.driftAmt * 0.6;
      groupRef.current.position.x += (tx - groupRef.current.position.x) * 0.045;
      groupRef.current.position.y += (ty - groupRef.current.position.y) * 0.045;
      groupRef.current.rotation.z = e * 0.006;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={matRef}
          vertexShader={starsVertex}
          fragmentShader={starsFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

const STAR_LAYERS: StarLayer[] = [
  { count: 120, zNear: -4, zRange: 12, sizeMin: 0.26, sizeRange: 0.55, opacity: 0.6, pointerAmt: 1.4, scrollAmt: 14, driftAmt: 1.1 },
  { count: 140, zNear: -14, zRange: 14, sizeMin: 0.2, sizeRange: 0.4, opacity: 0.42, pointerAmt: 0.85, scrollAmt: 9, driftAmt: 0.8 },
  { count: 160, zNear: -26, zRange: 18, sizeMin: 0.16, sizeRange: 0.3, opacity: 0.3, pointerAmt: 0.4, scrollAmt: 4.5, driftAmt: 0.5 },
];

function Cloud({
  targets,
  bloomRef,
}: {
  targets: Float32Array[];
  bloomRef: React.MutableRefObject<any>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const segRef = useRef(-1);
  const smoothDarkRef = useRef(0);

  const { geometry, aStart, aEnd } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const aStart = new THREE.BufferAttribute(new Float32Array(targets[0]), 3);
    const aEnd = new THREE.BufferAttribute(new Float32Array(targets[1]), 3);

    const scatter = new Float32Array(PARTICLE_COUNT * 3);
    const rand = new Float32Array(PARTICLE_COUNT);
    const color = new Float32Array(PARTICLE_COUNT * 3);

    const setColor = (i: number, r: number, gC: number, b: number) => {
      color[i * 3] = r;
      color[i * 3 + 1] = gC;
      color[i * 3 + 2] = b;
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = 3.7 * Math.cbrt(Math.random());
      scatter[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.15;
      scatter[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      scatter[i * 3 + 2] = r * Math.cos(phi);
      rand[i] = Math.random();

      const c = Math.random();
      const j = 0.9 + Math.random() * 0.35;
      if (c < 0.38) {
        setColor(i, 0.96 * j, 0.95 * j, 0.92 * j);
      } else if (c < 0.6) {
        setColor(i, 1.0 * j, 0.62 * j, 0.18 * j);
      } else if (c < 0.78) {
        setColor(i, 1.0 * j, 0.42 * j, 0.13 * j);
      } else {
        setColor(i, 0.26 * j, 0.52 * j, 1.0 * j);
      }
    }

    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(targets[0]), 3));
    g.setAttribute("aStart", aStart);
    g.setAttribute("aEnd", aEnd);
    g.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    return { geometry: g, aStart, aEnd };
  }, [targets]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 16 },
      uOpacity: { value: 1.0 },
      uFogNear: { value: 9.0 },
      uFogFar: { value: 24.0 },
      uMouse: { value: new THREE.Vector3(9999, 9999, 0) },
      uMouseRadius: { value: 2.7 },
      uMouseStrength: { value: 1.25 },
      uEnergy: { value: 0 },
      uLight: { value: 0 },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1,
      },
    }),
    []
  );

  const tilt = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef(new THREE.Vector3(9999, 9999, 0));
  const ray = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.visible = scrollState.light < 0.44;
    }
    if (scrollState.light >= 0.44) return;

    const n = targets.length;
    const DARK_END = 0.46;
    const rawDarkT = Math.min(1, scrollState.progress / DARK_END);
    const aSmooth = 1 - Math.exp(-4.5 * Math.min(delta, 0.05));
    smoothDarkRef.current += (rawDarkT - smoothDarkRef.current) * aSmooth;
    const darkT = smoothDarkRef.current;
    const t = darkT * (n - 1);
    const i0 = Math.min(Math.floor(t), n - 1);
    const i1 = Math.min(i0 + 1, n - 1);
    const f = t - i0;

    if (segRef.current !== i0) {
      segRef.current = i0;
      (aStart.array as Float32Array).set(targets[i0]);
      (aEnd.array as Float32Array).set(targets[i1]);
      aStart.needsUpdate = true;
      aEnd.needsUpdate = true;
    }

    const energy = scrollState.energy;

    if (matRef.current) {
      matRef.current.uniforms.uProgress.value = f;
      matRef.current.uniforms.uTime.value += delta;
      matRef.current.uniforms.uEnergy.value = energy;
      matRef.current.uniforms.uLight.value = scrollState.light;
      matRef.current.uniforms.uOpacity.value = 0.46 + 0.54 * energy;
      if (bloomRef.current) bloomRef.current.intensity = 0.3 + 0.55 * energy;

      const cam = state.camera;
      if (scrollState.pointerActive) {
        ray.current
          .set(scrollState.pointerX, -scrollState.pointerY, 0.5)
          .unproject(cam)
          .sub(cam.position)
          .normalize();
        const tt = -cam.position.z / ray.current.z;
        mouseTarget.current.copy(cam.position).addScaledVector(ray.current, tt);
      } else {
        mouseTarget.current.set(9999, 9999, 0);
      }
      const um = matRef.current.uniforms.uMouse.value as THREE.Vector3;
      um.lerp(mouseTarget.current, 0.18);
    }

    if (groupRef.current) {
      const e = state.clock.elapsedTime;
      const swayY = Math.sin(e * 0.33) * 0.08 + Math.sin(e * 0.13 + 0.7) * 0.04;
      const swayX = Math.cos(e * 0.29) * 0.05 + Math.sin(e * 0.11) * 0.025;
      const swayZ = Math.sin(e * 0.45) * 0.07 + Math.sin(e * 0.19 + 1.1) * 0.035;
      const hipX = Math.sin(e * 0.5) * 0.2 + Math.sin(e * 0.23 + 1.3) * 0.11;
      const hipY = Math.cos(e * 0.42) * 0.13 + Math.sin(e * 0.17) * 0.06;

      const targetRotY = scrollState.pointerX * 0.18;
      const targetRotX = scrollState.pointerY * 0.12;
      tilt.current.y += (targetRotY - tilt.current.y) * 0.045;
      tilt.current.x += (targetRotX - tilt.current.x) * 0.045;
      groupRef.current.rotation.y =
        tilt.current.y + swayY * (0.45 + 0.55 * energy);
      groupRef.current.rotation.x = tilt.current.x + swayX * (0.4 + 0.6 * energy);

      const penTilt = 0.26 * Math.max(0, 1 - darkT / 0.16);
      groupRef.current.rotation.z = penTilt + swayZ;

      const targetCloudX = IS_MOBILE
        ? scrollState.cloudX * 0.28
        : scrollState.cloudX;
      groupRef.current.position.x +=
        (targetCloudX + hipX - groupRef.current.position.x) * 0.045;
      groupRef.current.position.y +=
        (scrollState.cloudY + hipY - groupRef.current.position.y) * 0.045;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    if (scrollState.light > 0.45) return;
    const tx = scrollState.pointerX * 1.5;
    const ty = -scrollState.pointerY * 0.9 + scrollState.progress * 0.7;
    const tz = 12 - scrollState.progress * 2.2;
    camera.position.x += (tx - camera.position.x) * 0.035;
    camera.position.y += (ty - camera.position.y) * 0.035;
    camera.position.z += (tz - camera.position.z) * 0.035;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// Monitor automático de FPS idêntico ao bundle em produção do WolfStone (Módulo 1444)
function PerfGuard({ onDegrade }: { onDegrade: (level: number) => void }) {
  const stats = useRef({ t0: 0, frames: 0, level: 0, warmup: 0 });
  useFrame(() => {
    const s = stats.current;
    const now = performance.now();
    if (!s.t0) {
      s.t0 = now;
      return;
    }
    s.frames++;
    const elapsed = now - s.t0;
    if (elapsed < 1500) return;
    const fps = (s.frames * 1000) / elapsed;
    s.t0 = now;
    s.frames = 0;
    if (s.warmup === 0) {
      s.warmup = 1;
      return;
    }
    if (s.level === 0 && fps < 45) {
      s.level = 1;
      onDegrade(1);
    } else if (s.level === 1 && fps < 30) {
      s.level = 2;
      onDegrade(2);
    }
  });
  return null;
}

export function ParticleField() {
  const [targets, setTargets] = useState<Float32Array[] | null>(null);
  const [degradeLevel, setDegradeLevel] = useState(0);
  const bloomRef = useRef<any>(null);

  useEffect(() => {
    let alive = true;
    Promise.all(SHAPES.map(sampleImage))
      .then((res) => {
        if (alive) setTargets(res);
      })
      .catch((e) => console.error("Falha ao amostrar partículas:", e));
    return () => {
      alive = false;
    };
  }, []);

  const enablePost = degradeLevel === 0 && !IS_MOBILE;

  return (
    <div className="particle-canvas">
      <div className="cloud-skeleton" data-ready={targets ? "true" : "false"} aria-hidden />
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        dpr={degradeLevel >= 1 || IS_MOBILE ? 1 : [1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <PerfGuard onDegrade={setDegradeLevel} />
        <CameraRig />
        {degradeLevel < 2 &&
          STAR_LAYERS.map((l, i) => <Stars key={i} layer={l} />)}
        {targets && <Cloud targets={targets} bloomRef={bloomRef} />}
        {enablePost && (
          <EffectComposer multisampling={0}>
            <Bloom
              ref={bloomRef}
              intensity={0.65}
              luminanceThreshold={0.16}
              luminanceSmoothing={0.3}
              mipmapBlur
              radius={0.55}
            />
            <Vignette eskil={false} offset={0.3} darkness={0.5} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

export default ParticleField;
