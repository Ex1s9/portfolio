'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TopArcIcon } from './TopArcIcon';

interface AnimatedTopArcIconProps {
  className?: string;
  width?: number;
  height?: number;
  waveIntensity?: number;
  waveSpeed?: number;
  staticZone?: number; // размер статичной зоны в пикселях
}

// Vertex shader для волновой анимации
const vertexShader = `
  uniform float uTime;
  uniform float uWaveIntensity;
  uniform float uStaticZone;
  varying vec2 vUv;

  void main() {
    vec3 pos = position;
    
    // Нормализуем Y координату - инвертируем, чтобы верх был 0, низ был 1
    float normalizedY = (360.0 - pos.y) / 720.0; // height = 720, инвертируем направление
    
    // Создаем статичную зону сверху (первые пиксели от верха экрана)
    float staticZoneHeight = uStaticZone / 720.0; // конвертируем пиксели в нормализованные координаты
    
    // Рассчитываем коэффициент для плавного перехода от статичной зоны к волнам
    // Теперь 0 = верх экрана (статично), 1 = низ экрана (максимальные волны)
    float waveStrength = smoothstep(staticZoneHeight, staticZoneHeight + 0.05, normalizedY);
    
    // Создаем волновой эффект, который усиливается от верха к центру
    float wave = sin(pos.x * 8.0 + uTime * 2.0) * uWaveIntensity * waveStrength;
    wave += sin(pos.x * 12.0 + uTime * 3.0) * uWaveIntensity * 0.5 * waveStrength;
    
    // Добавляем волну, которая распространяется от верха экрана к центру
    // Используем положительный знак для правильного направления
    float propagatingWave = sin(normalizedY * 20.0 + uTime * 4.0) * uWaveIntensity * 0.4 * waveStrength;
    
    pos.y += wave + propagatingWave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
  }
`;

// Fragment shader для отображения текстуры
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    gl_FragColor = vec4(texColor.rgb, texColor.a * uOpacity);
  }
`;

export const AnimatedTopArcIcon = ({
  className,
  width = 950,
  height = 720,
  waveIntensity = 0.02,
  waveSpeed = 1.0,
  staticZone = 15
}: AnimatedTopArcIconProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Конвертация SVG в текстуру
  useEffect(() => {
    const convertSvgToTexture = async () => {
      try {
        // Загружаем SVG файл напрямую
        const response = await fetch('/top-arc.svg');
        const svgText = await response.text();

        // Создаем canvas для рендеринга SVG
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;

        // Рендерим SVG в canvas через Image
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          
          // Создаем текстуру из canvas
          const canvasTexture = new THREE.CanvasTexture(canvas);
          canvasTexture.needsUpdate = true;
          setTexture(canvasTexture);
          
          URL.revokeObjectURL(url);
        };
        
        img.src = url;
      } catch (error) {
        console.error('Error converting SVG to texture:', error);
        // Fallback - создаем простую текстуру
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = width;
          canvas.height = height;
          ctx.fillStyle = '#333';
          ctx.fillRect(0, 0, width, height);
          const fallbackTexture = new THREE.CanvasTexture(canvas);
          setTexture(fallbackTexture);
        }
      }
    };

    convertSvgToTexture();
  }, [width, height]);

  // Инициализация Three.js сцены
  useEffect(() => {
    if (!mountRef.current || !texture) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2, width / 2,
      height / 2, -height / 2,
      1, 1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    
    mountRef.current.appendChild(renderer.domElement);

    // Создаем geometry с высоким разрешением для плавных волн
    const geometry = new THREE.PlaneGeometry(width, height, 200, 150);
    
    // Создаем материал с шейдерами
    const uniforms = {
      uTime: { value: 0 },
      uTexture: { value: texture },
      uWaveIntensity: { value: waveIntensity },
      uStaticZone: { value: staticZone },
      uOpacity: { value: 1.0 }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Анимационный цикл
    const animate = () => {
      uniforms.uTime.value = performance.now() / 1000 * waveSpeed;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [texture, width, height, waveIntensity, waveSpeed, staticZone]);

  return (
    <div className={className}>
      <div 
        ref={mountRef}
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          display: texture ? 'block' : 'none'
        }}
      />
      
      {/* Fallback пока загружается текстура */}
      {!texture && (
        <TopArcIcon className="opacity-50" />
      )}
    </div>
  );
};