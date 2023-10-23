import { useSatDataContext } from "../../context/SatelliteDataContext.tsx";
import styles from "./Infopanel.module.scss";

export function Infopanel() {
    const info = useSatDataContext();
    return (
        <div className={styles.panel}>
            <h1>ISS Tracker</h1>
            <div className={styles.infobox}>
                <p>Current ISS position:</p>
                <p>
                    Longitude: {info.satData.lon.toFixed(3)}
                    <br />
                    Latitude: {info.satData.alt.toFixed(3)}
                    <br />
                    Altitude: {info.satData.lat.toFixed(3)} km
                </p>
            </div>
        </div>
    );
}
