import * as THREE from "three";
import { EARTH_RADIUS, MODEL_SCALE } from "../constants/earthConstants.ts";

export function splitTLE(tleData: string) {
    // if (typeof tleData !== "string") {
    //     throw new Error(
    //         `TLE data is not a string. Received ${typeof tleData} instead.`
    //     );
    // }
    const lines = tleData.split("\n").map((line) => line.trim());
    if (lines.length >= 2) {
        // Returns the 1st line as the satellite name and the 2nd and 3rd line as the orbit data
        return {
            satName: lines[0],
            orbitData: [lines[1], lines[2]],
        };
    } else {
        throw new Error("Invalid TLE data format");
    }
}

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
    return new THREE.Vector3(x, y, z);
}

export function calcSatRotation(lat: number, lon: number): THREE.Euler {
    const { phi, theta } = geoToSpherical(lat, lon);

    //Magic numbers below are for visual purposes only - so the ISS looks better
    //on the screen. If you want to reflect actual ISS rotation, listed default values
    //may be a better starting point
    const x = Math.PI / 2; //Pitch, default: 0;
    const y = Math.PI * 0.66; //Yaw, default: theta;
    const z = Math.PI * 0.02; //Roll, default: phi * Math.PI;
    return new THREE.Euler(x, y, z);
}
