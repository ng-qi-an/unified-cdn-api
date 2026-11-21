export type Unit = "b" | "kb" | "mb" | "gb" | "tb" | "auto";

const conversionRate: Record<Exclude<Unit, "auto">, number> = {
    b: 1,
    kb: 1024,
    mb: 1024 ** 2,
    gb: 1024 ** 3,
    tb: 1024 ** 4,
};

export default function convertUnit(value: number, options?: {fromUnit?: Exclude<Unit, "auto">, toUnit?: Unit, precision?: number, addSpace?: boolean}): {value: number, unit: Unit, text: string} {
    let rate: number;
    let unit: Unit;
    if (options?.toUnit && options?.toUnit != "auto"){
        rate = conversionRate[options?.toUnit || "b"];
        unit = options?.toUnit || "b";
    } else {
        if (value < conversionRate.kb) {
            rate = conversionRate.b;
            unit = "b";
        } else if (value < conversionRate.mb) {
            rate = conversionRate.kb;
            unit = "kb";
        } else if (value < conversionRate.gb) {
            rate = conversionRate.mb;
            unit = "mb";
        } else if (value < conversionRate.tb) {
            rate = conversionRate.gb;
            unit = "gb";
        } else {
            rate = conversionRate.tb;
            unit = "tb";
        }
    }
    const finalVal = (value * conversionRate[options?.fromUnit || "b"]) / rate;
    return {value: finalVal, unit: unit, text: `${finalVal.toFixed(options?.precision || 2)}${options?.addSpace ? " " : ""}${unit}`};
}