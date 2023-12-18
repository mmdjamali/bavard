import { onDestroy } from "svelte";
import { writable } from "svelte/store";

type Options = {
    defaultValue?: string,
    delay?: number,
}

export const createDeboundedInput = ({ defaultValue = "", delay = 500 }: Options) => {
    const value = writable(defaultValue)
    const registerValue = writable(defaultValue)
    let timeout: ReturnType<typeof setTimeout> | null = null

    const unsub = registerValue.subscribe((newValue) => {
        if (timeout) clearTimeout(timeout)

        timeout = setTimeout(() => {
            value.set(newValue)
        }, delay)
    })

    onDestroy(() => {
        unsub()
    })

    return [value, registerValue] as const
}