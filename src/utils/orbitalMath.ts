export interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  visible: boolean;
}

const DEG_TO_RAD = Math.PI / 180;

/**
 * Projects a geographic coordinate (lat, lon in degrees) onto a rotated 3D unit sphere,
 * returning screen coordinates centered at (cx, cy) with radius `radius`.
 */
export function projectLatLonToGlobe(
  latDeg: number,
  lonDeg: number,
  rotationLonDeg: number,
  tiltLatDeg: number,
  cx: number,
  cy: number,
  radius: number,
): ProjectedPoint {
  const lat = latDeg * DEG_TO_RAD;
  const lon = (lonDeg - rotationLonDeg) * DEG_TO_RAD;
  const tilt = tiltLatDeg * DEG_TO_RAD;

  // Cartesian coordinates on unit sphere (z points toward viewer)
  const cosLat = Math.cos(lat);
  const x0 = cosLat * Math.sin(lon);
  const y0 = Math.sin(lat);
  const z0 = cosLat * Math.cos(lon);

  // Rotate around X-axis for axial tilt
  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);
  const y1 = y0 * cosTilt - z0 * sinTilt;
  const z1 = y0 * sinTilt + z0 * cosTilt;

  return {
    x: cx + x0 * radius,
    y: cy - y1 * radius,
    z: z1,
    visible: z1 >= 0,
  };
}

/**
 * Computes a 3D point on an inclined circular orbit around the globe center.
 */
export function computeOrbitalPoint(
  phaseRad: number,
  inclinationDeg: number,
  ascendingNodeDeg: number,
  rotationLonDeg: number,
  tiltLatDeg: number,
  cx: number,
  cy: number,
  orbitRadius: number,
): ProjectedPoint {
  const inc = inclinationDeg * DEG_TO_RAD;
  const raan = (ascendingNodeDeg - rotationLonDeg) * DEG_TO_RAD;
  const tilt = tiltLatDeg * DEG_TO_RAD;

  // Position in orbital plane
  const xOrb = Math.cos(phaseRad);
  const yOrb = Math.sin(phaseRad);

  // Inclination rotation around X-like orbital line of nodes, then RAAN around Y (polar axis)
  const xPre = xOrb;
  const yPre = yOrb * Math.sin(inc);
  const zPre = yOrb * Math.cos(inc);

  const cosRaan = Math.cos(raan);
  const sinRaan = Math.sin(raan);

  const xWorld = xPre * cosRaan + zPre * sinRaan;
  const yWorld = yPre;
  const zWorld = -xPre * sinRaan + zPre * cosRaan;

  // Apply globe axial tilt around X-axis
  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);
  const yView = yWorld * cosTilt - zWorld * sinTilt;
  const zView = yWorld * sinTilt + zWorld * cosTilt;

  return {
    x: cx + xWorld * orbitRadius,
    y: cy - yView * orbitRadius,
    z: zView,
    visible: zView >= 0,
  };
}
