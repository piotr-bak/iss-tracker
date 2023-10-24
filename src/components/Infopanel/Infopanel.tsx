import { useSatDataContext } from "../../contexts/SatelliteDataContext.tsx";
import { formatDegrees } from "../../utils/degreeFormatter.ts";
import styles from "./Infopanel.module.scss";

export function Infopanel() {
    const info = useSatDataContext();
    return (
        <div className={styles.panel}>
            <h1>ISS Tracker</h1>
            <div className={styles.infobox}>
                <p>Current {info.satData.satName} position:</p>
                <p>
                    Longitude:{" "}
                    <span className={styles.monospace}>
                        {formatDegrees("lon", info.satData.lon.toFixed(2))}
                    </span>
                    <br />
                    Latitude:{" "}
                    <span className={styles.monospace}>
                        {formatDegrees("lat", info.satData.lat.toFixed(2))}
                    </span>
                    <br />
                    Altitude:{" "}
                    <span className={styles.monospace}>
                        {info.satData.alt.toFixed(2)} km
                    </span>
                </p>
            </div>
        </div>
    );
}
// export function calcSatRotation(lat: number, lon: number): THREE.Euler {
//     const { phi, theta } = geoToSpherical(lat, lon);

//     //Magic numbers below are for visual purposes only - so the ISS looks better
//     //on the screen. If you want to reflect actual ISS rotation, listed default values
//     //may be a better starting point
//     const x = 2; //Pitch, default: 0;
//     const y = theta * Math.PI; //Yaw, default: theta;
//     const z = phi * Math.PI * 1.2; //Roll, default: phi * Math.PI;
//     return new THREE.Euler(x, y, z);
// }
