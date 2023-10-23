import { useSatDataContext } from "../../context/SatelliteDataContext.tsx";
import styles from "./Infopanel.module.scss";

export function Infopanel() {
    const info = useSatDataContext();
    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <h1>ISS Tracker</h1>
            </div>
            <div className={styles.infobox}>
                <p>Current {info.satData.satName} position:</p>
                <p>
                    Longitude: {info.satData.lon.toFixed(3)}
                    <br />
                    Latitude: {info.satData.lat.toFixed(3)}
                    <br />
                    Altitude: {info.satData.alt.toFixed(2)} km
                </p>
            </div>
        </div>
    );
}
