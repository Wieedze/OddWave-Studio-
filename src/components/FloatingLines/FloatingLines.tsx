// FloatingLines — ambient WebGL line field behind the landing mid-section.
// Ported from design-handoff/FloatingLines.jsx to TypeScript + the `three`
// npm package (the original used a global window.THREE). Honors reduced motion
// (renders a single static frame, no RAF, no pointer listeners).

import { useEffect, useRef, type CSSProperties } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion } from '@/helpers';
import { fragmentShader, vertexShader } from './shaders';

export type WaveType = 'top' | 'middle' | 'bottom';

export interface WavePosition {
  x: number;
  y: number;
  rotate: number;
}

export interface FloatingLinesProps {
  linesGradient?: string[];
  enabledWaves?: WaveType[];
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: CSSProperties['mixBlendMode'];
}

const MAX_GRADIENT_STOPS = 8;

function hexToVec3(hex: string): THREE.Vector3 {
  let value = (hex || '').trim();
  if (value.startsWith('#')) value = value.slice(1);
  let r = 255;
  let g = 255;
  let b = 255;
  if (value.length === 3) {
    r = parseInt(value[0] + value[0], 16);
    g = parseInt(value[1] + value[1], 16);
    b = parseInt(value[2] + value[2], 16);
  } else if (value.length === 6) {
    r = parseInt(value.slice(0, 2), 16);
    g = parseInt(value.slice(2, 4), 16);
    b = parseInt(value.slice(4, 6), 16);
  }
  return new THREE.Vector3(r / 255, g / 255, b / 255);
}

export function FloatingLines({
  linesGradient,
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = [6],
  lineDistance = [5],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 },
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5.0,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = 'screen',
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getLineCount = (waveType: WaveType): number => {
    if (typeof lineCount === 'number') return lineCount;
    if (!enabledWaves.includes(waveType)) return 0;
    return lineCount[enabledWaves.indexOf(waveType)] ?? 6;
  };
  const getLineDistance = (waveType: WaveType): number => {
    if (typeof lineDistance === 'number') return lineDistance;
    if (!enabledWaves.includes(waveType)) return 0.1;
    return lineDistance[enabledWaves.indexOf(waveType)] ?? 0.1;
  };

  const topLineCount = enabledWaves.includes('top') ? getLineCount('top') : 0;
  const middleLineCount = enabledWaves.includes('middle') ? getLineCount('middle') : 0;
  const bottomLineCount = enabledWaves.includes('bottom') ? getLineCount('bottom') : 0;
  const topLineDistance = enabledWaves.includes('top') ? getLineDistance('top') * 0.01 : 0.01;
  const middleLineDistance = enabledWaves.includes('middle') ? getLineDistance('middle') * 0.01 : 0.01;
  const bottomLineDistance = enabledWaves.includes('bottom') ? getLineDistance('bottom') * 0.01 : 0.01;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = prefersReducedMotion();
    let active = true;

    const targetMouse = new THREE.Vector2(-1000, -1000);
    const currentMouse = new THREE.Vector2(-1000, -1000);
    let targetInfluence = 0;
    let currentInfluence = 0;
    const targetParallax = new THREE.Vector2(0, 0);
    const currentParallax = new THREE.Vector2(0, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const gradient = Array.from({ length: MAX_GRADIENT_STOPS }, () => new THREE.Vector3(1, 1, 1));
    let gradientCount = 0;
    if (linesGradient && linesGradient.length > 0) {
      const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS);
      gradientCount = stops.length;
      stops.forEach((hex, i) => {
        const color = hexToVec3(hex);
        gradient[i].set(color.x, color.y, color.z);
      });
    }

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      animationSpeed: { value: animationSpeed },
      enableTop: { value: enabledWaves.includes('top') },
      enableMiddle: { value: enabledWaves.includes('middle') },
      enableBottom: { value: enabledWaves.includes('bottom') },
      topLineCount: { value: topLineCount },
      middleLineCount: { value: middleLineCount },
      bottomLineCount: { value: bottomLineCount },
      topLineDistance: { value: topLineDistance },
      middleLineDistance: { value: middleLineDistance },
      bottomLineDistance: { value: bottomLineDistance },
      topWavePosition: {
        value: new THREE.Vector3(topWavePosition?.x ?? 10.0, topWavePosition?.y ?? 0.5, topWavePosition?.rotate ?? -0.4),
      },
      middleWavePosition: {
        value: new THREE.Vector3(middleWavePosition?.x ?? 5.0, middleWavePosition?.y ?? 0.0, middleWavePosition?.rotate ?? 0.2),
      },
      bottomWavePosition: {
        value: new THREE.Vector3(bottomWavePosition?.x ?? 2.0, bottomWavePosition?.y ?? -0.7, bottomWavePosition?.rotate ?? 0.4),
      },
      iMouse: { value: new THREE.Vector2(-1000, -1000) },
      interactive: { value: interactive && !reduce },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },
      parallax: { value: parallax && !reduce },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset: { value: new THREE.Vector2(0, 0) },
      lineGradient: { value: gradient },
      lineGradientCount: { value: gradientCount },
    };

    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const clock = new THREE.Clock();

    const setSize = (): void => {
      if (!active) return;
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1);
    };
    setSize();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => active && setSize()) : null;
    ro?.observe(container);

    const handlePointerMove = (event: PointerEvent): void => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      const dpr = renderer.getPixelRatio();
      if (inside) {
        targetMouse.set(x * dpr, (rect.height - y) * dpr);
        targetInfluence = 1.0;
        if (parallax) {
          const offsetX = (x - rect.width / 2) / rect.width;
          const offsetY = -(y - rect.height / 2) / rect.height;
          targetParallax.set(offsetX * parallaxStrength, offsetY * parallaxStrength);
        }
      } else {
        targetInfluence = 0.0;
      }
    };
    const handlePointerLeave = (): void => {
      targetInfluence = 0.0;
    };

    const liveInteractive = interactive && !reduce;
    if (liveInteractive) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('blur', handlePointerLeave);
    }

    if (reduce) {
      // Single static frame; no animation loop.
      renderer.render(scene, camera);
    } else {
      let raf = 0;
      const renderLoop = (): void => {
        if (!active) return;
        uniforms.iTime.value = clock.getElapsedTime();
        if (liveInteractive) {
          currentMouse.lerp(targetMouse, mouseDamping);
          uniforms.iMouse.value.copy(currentMouse);
          currentInfluence += (targetInfluence - currentInfluence) * mouseDamping;
          uniforms.bendInfluence.value = currentInfluence;
        }
        if (parallax) {
          currentParallax.lerp(targetParallax, mouseDamping);
          uniforms.parallaxOffset.value.copy(currentParallax);
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(renderLoop);
      };
      renderLoop();
      // Capture raf for cleanup via closure below.
      return () => {
        active = false;
        cancelAnimationFrame(raf);
        ro?.disconnect();
        if (liveInteractive) {
          window.removeEventListener('pointermove', handlePointerMove);
          window.removeEventListener('blur', handlePointerLeave);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.parentElement?.removeChild(renderer.domElement);
      };
    }

    return () => {
      active = false;
      ro?.disconnect();
      if (liveInteractive) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('blur', handlePointerLeave);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.parentElement?.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', mixBlendMode }}
    />
  );
}
