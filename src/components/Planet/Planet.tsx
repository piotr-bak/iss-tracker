import { useState, useMemo, useEffect, useRef, SetStateAction } from "react";
import * as satellite from "satellite.js";
import * as THREE from "three";
import Globe from "react-globe.gl";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

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
    const globeRef = useRef();
    const [time, setTime] = useState(new Date());
    const [globeRadius, setGlobeRadius] = useState("");
    const [ringsData, setRingsData] = useState<RingSettings[]>();
    const [issModel, setIssModel] = useState<THREE.Group | undefined>(
        undefined
    );
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
            setTime((time) => new Date(+time + 333));
        }, 333);
    }, []);

    useEffect(() => {
        const loader = new FBXLoader();
        loader.load("../../src/assets/models/iss/iss.fbx", (model) => {
            model.scale.set(1, 1, 1);
            setIssModel(model);
        });
    }, []);

    useEffect(() => {
        setGlobeRadius(globeRef.current.getGlobeRadius());
        globeRef.current.pointOfView({ altitude: 3.5 });
    }, []);

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
        //checkTurf(lng, lat);
    }

    const colorInterpolator = (t: number) =>
        `rgba(70,130,180,${Math.sqrt(1 - t)})`;

    return (
        <div className='globe-wrapper'>
            <Globe
                ref={globeRef}
                globeImageUrl='//unpkg.com/three-globe/example/img/earth-night.jpg'
                backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
                objectsData={satelliteData}
                objectLat='lat'
                objectLng='lng'
                objectAltitude='alt'
                objectFacesSurfaces={false}
                objectThreeObject={issModel}
                ringsData={ringsData}
                ringColor={() => colorInterpolator}
                ringMaxRadius='maxR'
                ringPropagationSpeed='propagationSpeed'
                ringRepeatPeriod='repeatPeriod'
                ringAltitude={0.02}
            />
        </div>
    );
}

// useEffect(() => {
//   (async () => {
//       try {
//           const response = await fetch(
//               "../src/data/ne_110m_admin_0_countries.geojson"
//           );
//           const json = await response.json();
//           setCountries(json);
//           console.log("Data loaded sucessfully");
//       } catch (err) {
//           console.error(err);
//       }
//   })();
// }, []);

// const [countries, setCountries] = useState({ features: [] });
// const [altitude, setAltitude] = useState(0.1);

// import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
// import * as turf from "@turf/helpers";

// useEffect(() => {
//     // load data
//     fetch("../src/data/ne_110m_admin_0_countries.geojson")
//         .then((res) => res.json())
//         .then((countries) => {
//             setCountries(countries);

//             setTimeout(() => {
//                 setAltitude(0.1);
//             }, 3000);
//         });
// }, []);

// fetch("../../data/ne_110m_admin_0_countries.geojson")
// .then((res) => res.json())
// .then(setGeoData)
// .catch((err) => console.error("Something went wrong. Error:", err));

// function checkTurf(lng, lat) {
//     if (!countries) return;
//     const satellitePosition = turf.point([lng, lat]);
//     console.log(satellitePosition);
//     // for (const feature of countries.features) {
//     //     const countryPolygon = turf.multiPolygon([
//     //         [[feature.geometry.coordinates]],
//     //     ]);
//     //     if (booleanPointInPolygon(satellitePosition, countryPolygon)) {
//     //         console.log("Success");
//     //         //console.log(feature.properties.FORMAL_EN);
//     //         break;
//     //     } else {
//     //         console.log("not success");
//     //         break;
//     //     }
//     // }
// }
// function checkTurf(lng, lat) {
//     // const satellitePoint = point([lng, lat]);
//     // console.log(satellitePoint);

//     // for (const feature of countries.features) {
//     //     const countryPolygon = polygon(feature.geometry);
//     //     console.log(feature);
//     // }
//     // if (countries) {
//     for (const feature of countries.features) {
//         const countryPolygon = polygon(feature);
//         const satellitePosition = point([lng, lat]);
//         console.log(countryPolygon);
//         //console.log(satellitePosition);
//         // if (booleanPointInPolygon(satellitePosition, countryPolygon)) {
//         //     console.log(true);
//         //     break;
//         // }
//     }
//     // }
//     return null;
// }
/* Globe component props:
                //polygonsData={countries.features}
                // polygonAltitude={0.001}
                // polygonCapColor={() => "rgba(0, 0, 0, 0.0)"}
                // polygonSideColor={() => "rgba(0, 0, 0, 0.0)"}
                // polygonStrokeColor={() => "rgba(70, 130, 180, .2)"}
                // polygonLabel={({ properties: d }) => `
                //   <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
                //   Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i>
                // `}
                // polygonsTransitionDuration={transitionDuration}
                */
