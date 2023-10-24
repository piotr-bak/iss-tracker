export function formatDegrees(coordType: string, coordValue: string): string {
    const value = Number(coordValue);
    if (coordType === "lat") {
        return value >= 0 ? `${coordValue}° N` : `${-coordValue}° S`;
    }
    if (coordType === "lon") {
        return value >= 0 ? `${coordValue}° E` : `${-coordValue}° W`;
    }
    return "invalid";
}
