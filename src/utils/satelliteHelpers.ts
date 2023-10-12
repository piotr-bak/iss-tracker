import * as THREE from "three";
import { EARTH_RADIUS, MODEL_SCALE } from "../constants/earthConstants.ts";

export function splitTLE(twoLineElement: string): string[] {
    return twoLineElement.split("\n").map((line) => line.trim());
}

export function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}

export function geoToSpherical(lat, lon, alt = 0) {
    const phi = degreesToRadians(lat);
    const theta = degreesToRadians(lon);
    const radius = ((EARTH_RADIUS + alt) / EARTH_RADIUS) * MODEL_SCALE;

    return {
        phi,
        theta,
        radius,
    };
}

export function calcSatPosition(lat, lon, alt) {
    const { phi, theta, radius } = geoToSpherical(lon, lat, alt);
    const x = Math.cos(phi) * Math.cos(theta) * radius;
    const y = Math.sin(phi) * radius;
    const z = -Math.cos(phi) * Math.sin(theta) * radius;
    return new THREE.Vector3(x, y, z);
}

export function calcSatRotation(lat, lon) {
    const { phi, theta } = geoToSpherical(lat, lon);
    const x = 0;
    const y = theta;
    const z = phi * Math.PI * 0.33;
    return new THREE.Euler(x, y, z);
}
