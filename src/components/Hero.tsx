import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { PageRoute } from '../types';
import './Hero.module.css';

interface HeroProps {
  onOpenAIAgent: (type?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
  onOpenCVAnalyzer: () => void;
  onNavigate?: (path: PageRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Coreografía Tipográfica con Curvas de Bézier Extremas
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.hero-line', {
      y: '0%',
      duration: 1.8,
      stagger: 0.15,
      ease: 'expo.out',
    })
    .to('.hero-fade', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out'
    }, "-=1.2");

    // 2. Setup Base WebGL (Three.js) para renderizado de partículas
    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;
    
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        alpha: true, 
        antialias: false 
      });
      
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Basic particle system for visual feedback (since TSL shader wasn't fully defined)
      const geometry = new THREE.BufferGeometry();
      const count = 1500;
      const positions = new Float32Array(count * 3);
      for(let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ size: 0.02, color: 0x00afe1, transparent: true, opacity: 0.5 });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 3;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
      };
    }
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative w-full h-screen bg-[#111112] text-[#EEEFEB] overflow-hidden grid grid-cols-12 gap-4 items-center px-[5vw]"
    >
      {/* Capa de Renderizado 3D Off-Thread */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80 mix-blend-screen"
      />

      {/* Contenedor Tipográfico en Tensión Asimétrica */}
      <div className="col-span-12 md:col-start-2 md:col-span-9 z-10 flex flex-col justify-center">
        <h1 
          ref={textRef}
          className="text-[12vw] leading-[0.85] font-serif tracking-tighter uppercase will-change-transform"
        >
          <span className="block overflow-hidden">
            <span className="block translate-y-[100%] hero-line">Talento</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block translate-y-[100%] hero-line italic text-[#00afe1]">Sin Fricción.</span>
          </span>
        </h1>
        
        <p className="mt-8 text-lg md:text-xl font-sans max-w-md font-light tracking-wide opacity-0 hero-fade">
          Arquitectura de equipos de alto rendimiento. Conectamos la élite del desarrollo mediante procesos algorítmicos.
        </p>

        <div className="mt-12 opacity-0 hero-fade">
          <button 
            onClick={() => onNavigate && onNavigate('/servicios')}
            className="group relative px-8 py-4 font-sans text-sm tracking-[0.2em] uppercase overflow-hidden rounded-none border border-[#EEEFEB]/20 hover:border-[#00afe1] transition-colors duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
          >
            <span className="relative z-10 group-hover:text-[#111112] transition-colors duration-500">Explorar Red</span>
            <div className="absolute inset-0 bg-[#00afe1] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
          </button>
        </div>
      </div>
    </section>
  );
};

