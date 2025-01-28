import {z} from "zod";

export const zodStringToNumber = z.preprocess(
    (value) => (typeof value === "string" ? parseInt(value, 10) : value),
    z.number().int()
)