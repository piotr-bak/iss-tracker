import { Euler, Vector3 } from "three";
import { EARTH_RADIUS, MODEL_SCALE } from "../constants/earthConstants.ts";

export function degreesToRadians(deg: number): number {
    return deg * (Math.PI / 180);
}

export function geoToSpherical(lat: number, lon: number, alt: number = 0) {
    const phi = degreesToRadians(lat);
    const theta = degreesToRadians(lon);
    const radius = ((EARTH_RADIUS + alt) / EARTH_RADIUS) * MODEL_SCALE;

    return {
        phi,
        theta,
        radius,
    };
}

export function calcSatPosition(
    lat: number,
    lon: number,
    alt: number
): THREE.Vector3 {
    const { phi, theta, radius } = geoToSpherical(lon, lat, alt);
    const x = Math.cos(phi) * Math.cos(theta) * radius;
    const y = Math.sin(phi) * radius;
    const z = -Math.cos(phi) * Math.sin(theta) * radius;
    return new Vector3(x, y, z);
}

export function calcSatRotation(lat: number, lon: number): Euler {
    const { phi, theta } = geoToSpherical(lat, lon);
    const x = phi; //Pitch
    const y = theta; //Yaw
    const z = 0; //Roll
    return new Euler(x, y, z);
}
