import { useState, useMemo, useEffect, useRef, SetStateAction } from "react";
import * as satellite from "satellite.js";
import * as THREE from "three";
import Globe from "react-globe.gl";
//import { useFetch } from "../../hooks/useFetch.ts";

type RingSettings = {
    lat: number;
    lng: number;
    maxR: number;
    propagationSpeed: number;
    repeatPeriod: number;
};

const EARTH_RADIUS_KM = 6371;
const SAT_SIZE = 80;

export function Planet() {
    //const { data, isError, isLoading } = useFetch();
    const globeEl = useRef();
    const [time, setTime] = useState(new Date());
    const [globeRadius, setGlobeRadius] = useState("");
    const [ringsData, setRingsData] = useState<RingSettings[]>();
    const [countries, setCountries] = useState({ features: [] });

    const [altitude, setAltitude] = useState(0.1);
    const [transitionDuration, setTransitionDuration] = useState(1000);

    const TLE = `1 25544U 98067A   23262.35054104  .00014745  00000-0  27129-3 0  9992
  2 25544  51.6415 222.0994 0005856  35.8467 129.0291 15.49409802416398`;

    const splitTLE = (twoLineElement: string): string[] =>
        twoLineElement.split("\n").map((line) => line.trim());

    const satrec = satellite.twoline2satrec(
        ...(splitTLE(TLE) as [string, string])
    );

    useEffect(() => {
        setInterval(() => {
            setTime((time) => new Date(+time + 500));
        }, 500);
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await fetch(
    //                 "../src/data/ne_110m_admin_0_countries.geojson"
    //             );
    //             const json = await response.json();
    //             setGeoData(json);
    //             console.log("Data loaded sucessfully");
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     })();
    // }, []);
    useEffect(() => {
        // load data
        fetch("../src/data/ne_110m_admin_0_countries.geojson")
            .then((res) => res.json())
            .then((countries) => {
                setCountries(countries);

                setTimeout(() => {
                    setAltitude(0.1);
                }, 3000);
            });
    }, []);

    // fetch("../../data/ne_110m_admin_0_countries.geojson")
    // .then((res) => res.json())
    // .then(setGeoData)
    // .catch((err) => console.error("Something went wrong. Error:", err));
    const satelliteData = useMemo(() => {
        const gmst = satellite.gstime(time);
        const eci = satellite.propagate(satrec, time);
        if (eci.position) {
            const gdPos = satellite.eciToGeodetic(
                eci.position as satellite.EciVec3<number>,
                gmst
            );
            const lat = satellite.degreesLat(gdPos.latitude);
            const lng = satellite.degreesLong(gdPos.longitude);
            const alt = gdPos.height / EARTH_RADIUS_KM;
            prepareRings(lat, lng);
            return [{ lat, lng, alt }];
        }
    }, [time]);

    function prepareRings(lat: number, lng: number): void {
        setRingsData(() => [
            {
                lat,
                lng,
                maxR: 20.2,
                propagationSpeed: 5,
                repeatPeriod: 1000,
            },
        ]);
    }

    const colorInterpolator = (t: number) =>
        `rgba(255,100,50,${Math.sqrt(1 - t)})`;

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
                ringsData={ringsData}
                ringColor={() => colorInterpolator}
                ringMaxRadius='maxR'
                ringPropagationSpeed='propagationSpeed'
                ringRepeatPeriod='repeatPeriod'
                polygonsData={countries.features}
                ringAltitude={0.02}
                polygonAltitude={0.001}
                polygonCapColor={() => "rgba(0, 0, 0, 0)"}
                polygonSideColor={() => "rgba(0, 0, 0, 0.0)"}
                polygonStrokeColor={() => "steelblue"}
                // polygonLabel={({ properties: d }) => `
                //   <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
                //   Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i>
                // `}
                polygonsTransitionDuration={transitionDuration}
            />
        </div>
    );
}
