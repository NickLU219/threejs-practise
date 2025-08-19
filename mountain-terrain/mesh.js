import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'

const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100)

const noise = createNoise2D()

export function updatePosition() {
  const positions = geometry.attributes.position

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i)
    const y = positions.getY(i)
    const z = noise(x / 300, y / 300) * 100
    const sinNum =
      Math.sin(Date.now() * 0.002 + x * 0.5) * 5 +
      Math.cos(Date.now() * 0.002 + y * 0.5) * 5
    // Math.sin(Date.now() * 0.001 + x * 0.05) * 10

    positions.setZ(i, z + sinNum)
  }
  positions.needsUpdate = true
}

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color('orange'),
  doubleSide: true,
  wireframe: true,
})

const mesh = new THREE.Mesh(geometry, material)

mesh.rotateX(Math.PI / 2)

console.log(mesh)

export default mesh
