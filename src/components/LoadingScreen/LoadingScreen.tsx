import { useLoadingContext } from "../../contexts/LoadingContext.tsx";
import styles from "./LoadingScreen.module.scss";
import spinner from "/assets/spinner-white.svg";

export function LoadingScreen() {
    const { isLoaded } = useLoadingContext();
    return !isLoaded ? (
        <div className={styles.backdrop}>
            <img src={spinner} alt='loading data' />
            <p className={styles.text}>iss tracker - loading data</p>
        </div>
    ) : null;
}
