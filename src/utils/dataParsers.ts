export function nameAndOrbitFromTLE(tleData: string[]) {
    // if (
    //     !Array.isArray(tleData) ||
    //     tleData.every((item) => typeof item === "string")
    // )
    //     throw new Error("Invalid TLE data format");
    return {
        satName: tleData[0],
        orbitData: [tleData[1], tleData[2]],
    };
}

export function splitDatasetIntoTLEs(dataset: string): string[][] {
    const lines = dataset.split("\n").map((line) => line.trim());

    const result: string[][] = lines.reduce(
        (chunks: string[][], line, index) => {
            const chunkIndex = Math.floor(index / 3);
            if (!chunks[chunkIndex]) {
                chunks[chunkIndex] = [];
            }
            chunks[chunkIndex].push(line);
            return chunks;
        },
        []
    );
    return result;
}
