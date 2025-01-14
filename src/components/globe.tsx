"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const Globe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const brainRef = useRef<THREE.Mesh | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isMounted) return;

    const container = containerRef.current;

    // Scene setup
    sceneRef.current = new THREE.Scene();

    // Camera setup
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 5;

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
    rendererRef.current.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 1);
    directionalLight.position.set(1, 1, 1);
    sceneRef.current.add(ambientLight, directionalLight);

    // Brain mesh (using a sphere as placeholder)
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x808080,
      emissive: 0x00ffff,
      emissiveIntensity: 0.2,
      wireframe: true,
    });
    brainRef.current = new THREE.Mesh(geometry, material);
    sceneRef.current.add(brainRef.current);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current)
        return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      rendererRef.current.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Animation
    const animate = () => {
      if (
        !brainRef.current ||
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current
      )
        return;

      requestAnimationFrame(animate);
      brainRef.current.rotation.y += 0.002;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, [isMounted]);

  return (
    <div
      ref={containerRef}
      className="brain-container w-full h-[300px] md:h-[400px] flex items-center justify-center"
      style={{ visibility: isMounted ? "visible" : "hidden" }}
    />
  );
};
