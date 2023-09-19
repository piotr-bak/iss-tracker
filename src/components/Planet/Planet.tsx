import { useState, useMemo, useEffect, useRef } from "react";
import * as satellite from "satellite.js";
import * as THREE from "three";
import Globe from "react-globe.gl";
//import { useFetch } from "../../hooks/useFetch.ts";

const EARTH_RADIUS_KM = 6371;
const SAT_SIZE = 80;
//const TIME_STEP = 3 * 1000; //per frame

export function Planet() {
    //const { data, isError, isLoading } = useFetch();
    const globeEl = useRef();
    const [time, setTime] = useState(new Date());
    const [globeRadius, setGlobeRadius] = useState("");

    const TLE = `1 25544U 98067A   23262.35054104  .00014745  00000-0  27129-3 0  9992
  2 25544  51.6415 222.0994 0005856  35.8467 129.0291 15.49409802416398`;

    const splitTLE = (twoLineElement: string): string[] =>
        twoLineElement.split("\n").map((line) => line.trim());

    const satrec = satellite.twoline2satrec(
        ...(splitTLE(TLE) as [string, string])
    );

    // useEffect(() => {
    //     //ticker
    //     (function frameTicker() {
    //         requestAnimationFrame(frameTicker);
    //         setTime((time) => new Date(+time + TIME_STEP));
    //     })();
    // }, []);

    useEffect(() => {
        setInterval(() => {
            setTime((time) => new Date(+time + 500));
        }, 500);
    }, []);

    const satelliteData = useMemo(() => {
        const gmst = satellite.gstime(time);
        const eci = satellite.propagate(satrec, time);
        if (eci.position) {
            const gdPos = satellite.eciToGeodetic(eci.position, gmst);
            const lat = satellite.degreesLat(gdPos.latitude);
            const lng = satellite.degreesLong(gdPos.longitude);
            const alt = gdPos.height / EARTH_RADIUS_KM;
            return [{ lat, lng, alt }];
        }
    }, [time]);

    const issStation = useMemo(() => {
        if (!globeRadius) return undefined;

        const satGeometry = new THREE.OctahedronGeometry(
            (SAT_SIZE * globeRadius) / EARTH_RADIUS_KM / 2,
            0
        );
        const satMaterial = new THREE.MeshLambertMaterial({
            color: "palegreen",
            transparent: true,
            opacity: 0.7,
        });
        return new THREE.mesh(satGeometry, satMaterial);
    }, []);

    useEffect(() => {
        setGlobeRadius(globeEl.current.getGlobeRadius());
        globeEl.current.pointOfView({ altitude: 3.5 });
    }, []);

    return (
        <div className='globe-wrapper'>
            <Globe
                ref={globeEl}
                globeImageUrl='//unpkg.com/three-globe/example/img/earth-night.jpg'
                backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
                objectsData={satelliteData}
                objectLat='lat'
                objectLng='lng'
                objectAltitude='alt'
                objectFacesSurfaces={false}
                objectThreeObject={issStation}
            />
        </div>
    );
}
