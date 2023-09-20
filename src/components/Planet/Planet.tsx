import { useState, useMemo, useEffect, useRef } from "react";
import * as satellite from "satellite.js";
import * as THREE from "three";
import Globe from "react-globe.gl";
//import { useFetch } from "../hooks/useFetch.js";

export function Planet() {
    //const { data, isError, isLoading } = useFetch();

    const N = 1;
    const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() / 3,
        color: ["red"][Math.round(Math.random() * 0.5)],
    }));

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
