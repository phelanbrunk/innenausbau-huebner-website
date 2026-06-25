import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GridLines() {
  const groupRef = useRef<THREE.Group>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const scrollPos = useRef(0)

  /* Track mouse position */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetPos.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const handleScroll = () => {
      scrollPos.current = window.scrollY * 0.001
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /* Build the grid geometry */
  const lineSegments = useMemo(() => {
    const gridSize = 20
    const spacing = 2
    const points: THREE.Vector3[] = []

    // Horizontal lines (with perspective - converge toward center)
    for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
      const y = i * spacing * 0.5
      points.push(new THREE.Vector3(-gridSize, y, -10))
      points.push(new THREE.Vector3(gridSize, y, 10))
    }

    // Vertical lines
    for (let i = -gridSize; i <= gridSize; i++) {
      const x = i * spacing
      points.push(new THREE.Vector3(x, -gridSize / 2 * spacing * 0.5, 0))
      points.push(new THREE.Vector3(x, gridSize / 2 * spacing * 0.5, 0))
    }

    // Perspective depth lines
    for (let i = -gridSize; i <= gridSize; i += 2) {
      const x = i * spacing
      points.push(new THREE.Vector3(x, -gridSize * 0.5, -15))
      points.push(new THREE.Vector3(x, -gridSize * 0.5, 15))
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    return geometry
  }, [])

  /* Animate the grid */
  useFrame(() => {
    if (!groupRef.current) return

    // Lerp mouse parallax
    mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.05
    mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.05

    // Apply subtle rotation based on mouse + scroll
    groupRef.current.rotation.x = mousePos.current.y * 0.05 + scrollPos.current * 0.1
    groupRef.current.rotation.y = mousePos.current.x * 0.05
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineSegments}>
        <lineBasicMaterial color="#39FF14" transparent opacity={0.1} />
      </lineSegments>
    </group>
  )
}

export default function ArchitecturalGrid() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 5, 15], fov: 75, near: 0.1, far: 100 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
      >
        <GridLines />
      </Canvas>
    </div>
  )
}
