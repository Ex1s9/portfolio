"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';


interface GlassEffectProps {
  width: number;
  height: number;
  borderRadius: number;
  intensity?: number; // 0.1 (слабый) - 1.0 (максимальный)
}

export const GlassEffect = ({ width, height, borderRadius, intensity = 0.8 }: GlassEffectProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // Create environment texture for reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new THREE.Scene(), 0.04).texture;

    // Create gradient environment map
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#87CEEB');  // Sky blue
    gradient.addColorStop(0.5, '#98FB98'); // Pale green
    gradient.addColorStop(1, '#F0E68C');   // Khaki
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const envMapTexture = new THREE.CanvasTexture(canvas);
    envMapTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envMapTexture;

    // Calculate glass properties based on intensity (support values > 1.0 for extreme effects)
    const clampedIntensity = Math.max(0.1, Math.min(10.0, intensity));

    // Enhanced glass material with extreme intensity support
    const normalizedIntensity = Math.min(clampedIntensity, 1.0); // For standard parameters
    const extremeMultiplier = clampedIntensity; // Allow extreme values for special effects

    // Create ultra-refractive glass material for border effect
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      transmission: 1.0, // Full transparency for maximum refraction
      thickness: 0.5 + (extremeMultiplier * 2.0), // Much thicker glass for strong distortion
      roughness: 0.001, // Mirror smooth
      ior: 1.5 + (extremeMultiplier * 1.5), // Very high IOR for extreme refraction
      transparent: true,
      opacity: 0.95,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.001,
      envMap: envMapTexture,
      envMapIntensity: 1.0 + (extremeMultiplier * 3.0), // Super strong reflections
      reflectivity: 0.8,
      // Maximum dispersion for rainbow edge effects
      dispersion: extremeMultiplier * 0.2, // Up to 0.2 for extreme rainbow effects
      // Additional properties for better glass effect
      attenuationDistance: 0.5,
      attenuationColor: new THREE.Color(0.9, 0.95, 1.0), // Slight blue tint like real glass
    });

    // Create glass border geometry - rounded frame that follows the exact border
    const borderThickness = Math.max(20, 10 + (extremeMultiplier * 20)); // Dynamic thickness based on intensity
    const glassElements: THREE.Mesh[] = [];

    // Create rounded rectangle frame using RingGeometry approach
    const outerRadius = Math.min(width, height) / 2;
    const innerRadius = outerRadius - borderThickness;

    // Create shape for rounded rectangle border
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    const w = width;
    const h = height;
    const r = borderRadius;

    // Outer rounded rectangle
    shape.moveTo(x, y + r);
    shape.lineTo(x, y + h - r);
    shape.quadraticCurveTo(x, y + h, x + r, y + h);
    shape.lineTo(x + w - r, y + h);
    shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
    shape.lineTo(x + w, y + r);
    shape.quadraticCurveTo(x + w, y, x + w - r, y);
    shape.lineTo(x + r, y);
    shape.quadraticCurveTo(x, y, x, y + r);

    // Inner rounded rectangle (hole)
    const hole = new THREE.Path();
    const holeX = x + borderThickness;
    const holeY = y + borderThickness;
    const holeW = w - borderThickness * 2;
    const holeH = h - borderThickness * 2;
    const holeR = Math.max(0, r - borderThickness);

    hole.moveTo(holeX, holeY + holeR);
    hole.lineTo(holeX, holeY + holeH - holeR);
    hole.quadraticCurveTo(holeX, holeY + holeH, holeX + holeR, holeY + holeH);
    hole.lineTo(holeX + holeW - holeR, holeY + holeH);
    hole.quadraticCurveTo(holeX + holeW, holeY + holeH, holeX + holeW, holeY + holeH - holeR);
    hole.lineTo(holeX + holeW, holeY + holeR);
    hole.quadraticCurveTo(holeX + holeW, holeY, holeX + holeW - holeR, holeY);
    hole.lineTo(holeX + holeR, holeY);
    hole.quadraticCurveTo(holeX, holeY, holeX, holeY + holeR);

    shape.holes.push(hole);

    // Create geometry from shape
    const frameGeometry = new THREE.ShapeGeometry(shape);
    const frameGlass = new THREE.Mesh(frameGeometry, glassMaterial);
    frameGlass.position.set(0, 0, 0.1);
    scene.add(frameGlass);
    glassElements.push(frameGlass);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // Multiple directional lights for better realism
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(10, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.3);
    fillLight.position.set(-5, -5, 3);
    scene.add(fillLight);

    // Add point lights for more complex reflections
    const pointLight1 = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight1.position.set(50, 50, 50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x87CEEB, 0.6, 100);
    pointLight2.position.set(-50, -50, 50);
    scene.add(pointLight2);

    // Animation loop with enhanced effects
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate glass properties based on intensity
      glassElements.forEach((element, index) => {
        const material = element.material as THREE.MeshPhysicalMaterial;
        const baseRoughness = 0.08 - (clampedIntensity * 0.05);
        const baseIor = 1.2 + (clampedIntensity * 0.32);
        const baseEnvIntensity = 0.5 + (clampedIntensity * 1.5);
        const baseTransmission = 0.3 + (clampedIntensity * 0.7);

        // Animation intensity scales with glass intensity
        const animationStrength = clampedIntensity * 0.5;

        // Subtle roughness animation
        material.clearcoatRoughness = baseRoughness + Math.sin(time * 2 + index) * (0.01 * animationStrength);

        // Animate IOR for subtle dispersion effect
        material.ior = baseIor + Math.sin(time * 3 + index * 0.5) * (0.02 * animationStrength);

        // Animate environment map intensity
        material.envMapIntensity = baseEnvIntensity + Math.sin(time * 1.5 + index * 0.3) * (0.3 * animationStrength);

        // Subtle transmission animation
        material.transmission = baseTransmission + Math.sin(time * 0.8 + index * 0.7) * (0.05 * animationStrength);
      });

      // Animate lights for dynamic reflections
      pointLight1.intensity = 0.8 + Math.sin(time * 2) * 0.2;
      pointLight2.intensity = 0.6 + Math.cos(time * 1.5) * 0.2;

      // Rotate point lights slightly
      pointLight1.position.x = 50 + Math.sin(time * 0.5) * 10;
      pointLight2.position.x = -50 + Math.cos(time * 0.7) * 10;

      renderer.render(scene, camera);
    };

    mountRef.current.appendChild(renderer.domElement);
    animate();

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [width, height, borderRadius, intensity]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1.5 // Between background (1) and content (2)
      }}
    />
  );
};