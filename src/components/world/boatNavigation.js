export function boatDirection(x, y) {
  return `${y < 0 ? "N" : y > 0 ? "S" : ""}${x < 0 ? "W" : x > 0 ? "E" : ""}`;
}

function clampPoint(point, geometry) {
  return {
    x: Math.max(geometry.minX, Math.min(geometry.maxX, point.x)),
    y: Math.max(geometry.minY, Math.min(geometry.maxY, point.y)),
  };
}

function inside(point, island) {
  return Math.hypot((point.x - island.x) / island.rx, (point.y - island.y) / island.ry) < 1;
}

export function isNavigable(point, geometry) {
  return point.x >= geometry.minX && point.x <= geometry.maxX
    && point.y >= geometry.minY && point.y <= geometry.maxY
    && !geometry.obstacles.some((island) => inside(point, island));
}

// Recover safely if image loading or a viewport resize changes the shoreline.
export function recoverBoatPosition(point, geometry) {
  const bounded = clampPoint(point, geometry);
  if (isNavigable(bounded, geometry)) return bounded;
  const candidates = [];
  for (const island of geometry.obstacles) {
    for (let step = 0; step < 64; step += 1) {
      const angle = step / 64 * Math.PI * 2;
      candidates.push({
        x: island.x + Math.cos(angle) * (island.rx + 2),
        y: island.y + Math.sin(angle) * (island.ry + 2),
      });
    }
  }
  // Include open-water candidates where adjacent island boundaries overlap.
  for (let row = 0; row <= 8; row += 1) {
    for (let column = 0; column <= 8; column += 1) {
      candidates.push({
        x: geometry.minX + (geometry.maxX - geometry.minX) * column / 8,
        y: geometry.minY + (geometry.maxY - geometry.minY) * row / 8,
      });
    }
  }
  return candidates.filter((candidate) => isNavigable(candidate, geometry))
    .sort((a, b) => Math.hypot(a.x - point.x, a.y - point.y) - Math.hypot(b.x - point.x, b.y - point.y))[0] || bounded;
}

export function moveBoatWithCollisions(position, delta, geometry, velocity) {
  let point = { ...position };
  // Small substeps prevent a fast frame from tunneling across a shoreline.
  const steps = Math.max(1, Math.ceil(Math.hypot(delta.x, delta.y) / 4));
  for (let step = 0; step < steps; step += 1) {
    const candidate = clampPoint({ x: point.x + delta.x / steps, y: point.y + delta.y / steps }, geometry);
    if (candidate.x === geometry.minX || candidate.x === geometry.maxX) velocity.x = 0;
    if (candidate.y === geometry.minY || candidate.y === geometry.maxY) velocity.y = 0;
    for (let pass = 0; pass < 8; pass += 1) {
      let corrected = false;
      for (const island of geometry.obstacles) {
        if (!inside(candidate, island)) continue;
        let x = (candidate.x - island.x) / island.rx;
        let y = (candidate.y - island.y) / island.ry;
        let length = Math.hypot(x, y);
        if (length < 0.0001) {
          x = (point.x - island.x) / island.rx;
          y = (point.y - island.y) / island.ry;
          length = Math.hypot(x, y) || 1;
        }
        x /= length;
        y /= length;
        const normalLength = Math.hypot(x / island.rx, y / island.ry) || 1;
        const normal = { x: x / island.rx / normalLength, y: y / island.ry / normalLength };
        candidate.x = island.x + x * island.rx + normal.x * 0.5;
        candidate.y = island.y + y * island.ry + normal.y * 0.5;
        const inwardSpeed = velocity.x * normal.x + velocity.y * normal.y;
        if (inwardSpeed < 0) {
          velocity.x -= inwardSpeed * normal.x;
          velocity.y -= inwardSpeed * normal.y;
        }
        corrected = true;
      }
      if (!corrected) break;
    }
    if (isNavigable(candidate, geometry)) point = candidate;
    else {
      velocity.x = 0;
      velocity.y = 0;
      break;
    }
  }
  return point;
}
