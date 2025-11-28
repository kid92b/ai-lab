"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const desktopQuery = "(min-width: 1024px)";

export default function AILab3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia(desktopQuery).matches) return;

    const isDark = () => document.documentElement.classList.contains("dark");

    const mountEl = mountRef.current;
    if (!mountEl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, mountEl.clientWidth / 320, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mountEl.clientWidth, 320);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountEl.appendChild(renderer.domElement);

    const particleCount = 1600;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1 + Math.random() * 0.15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions.set([x, y, z], i * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: isDark() ? new THREE.Color("#7dd3fc") : new THREE.Color("#0f172a"),
      opacity: isDark() ? 0.9 : 0.8,
    });

    const particles = new THREE.Points(geometry, particlesMaterial);
    scene.add(particles);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.MeshBasicMaterial({
        color: isDark() ? new THREE.Color("#818cf8") : new THREE.Color("#1e293b"),
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      })
    );
    scene.add(wire);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.45, 32, 32),
      new THREE.MeshBasicMaterial({
        color: isDark() ? new THREE.Color("#38bdf8") : new THREE.Color("#cbd5e1"),
        transparent: true,
        opacity: isDark() ? 0.06 : 0.08,
      })
    );
    scene.add(glow);

    const resize = () => {
      if (!mountRef.current) return;
      const { clientWidth } = mountRef.current;
      renderer.setSize(clientWidth, 320);
      camera.aspect = clientWidth / 320;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

    const observer = new MutationObserver(() => {
      const dark = isDark();
      particlesMaterial.color.set(dark ? "#7dd3fc" : "#0f172a");
      particlesMaterial.opacity = dark ? 0.9 : 0.8;
      wire.material.color.set(dark ? "#818cf8" : "#1e293b");
      glow.material.color.set(dark ? "#38bdf8" : "#cbd5e1");
      glow.material.opacity = dark ? 0.06 : 0.08;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime() * 0.18;
      particles.rotation.y = t;
      wire.rotation.y = -t * 0.6;
      glow.rotation.y = t * 0.2;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    let raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(raf);
      geometry.dispose();
      particlesMaterial.dispose();
      (wire.material as THREE.Material).dispose();
      (glow.material as THREE.Material).dispose();
      renderer.dispose();
      mountEl.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hidden md:block w-full h-[320px]" />;
}
