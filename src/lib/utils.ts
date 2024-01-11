import { twMerge, type ClassNameValue } from "tailwind-merge"
import { clsx } from "clsx"

export const cn = (...inputs: ClassNameValue[]) => clsx(twMerge(inputs))

export const timeFormater = (
    date: Date
) => {

    let time = ((Date.now() - date.getTime()) / 1000)

    if (time <= 60) return (`${Math.floor(time)}s`)
    time = time / 60

    if (time <= 60) return (`${Math.floor(time)}min`)

    time = time / 60
    if (time <= 24) return (`${Math.floor(time)}h`)

    time = time / 24
    if (time <= 30) return (`${Math.floor(time) + (Math.floor(time) === 1 ? "day" : "days")}`)

    time = time / 30
    if (time <= 12) return (`${Math.floor(time)}mo`)

    time = time / 12
    return (`${Math.floor(time)}y`)
}
