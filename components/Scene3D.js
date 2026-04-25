"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'

// A stylized 3D ballot box
function BallotBox(props) {
  const group = useRef()
  const [hovered, setHover] = useState(false)
  const [clicked, setClick] = useState(false)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Gentle floating and rotation
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, hovered ? Math.PI / 4 : 0, 0.1)
  })

  return (
    <group ref={group} {...props} dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
      onClick={() => setClick(!clicked)}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main Box Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={clicked ? "#f97316" : "#1a56db"} roughness={0.1} metalness={0.8} />
        </mesh>
        
        {/* Box Lid */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[2.2, 0.2, 2.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* The Ballot Slot */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 0.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>

        {/* A Ballot Paper slipping in */}
        <mesh position={[0, 1.4 + (clicked ? -0.8 : 0), 0]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[1, 1, 0.05]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.8} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <BallotBox position={[0, -0.5, 0]} />
      
      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}
