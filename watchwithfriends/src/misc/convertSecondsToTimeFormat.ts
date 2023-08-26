
export function convertSecondsToTimeFormat(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const timeFormatted: string = `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;

    return timeFormatted;
}