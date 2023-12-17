import { onDestroy } from "svelte";
import { writable } from "svelte/store";

type Options = {
    defaultValue?: string,
    patterns?: { message: string, validator: RegExp }[],
    skipOnFirstMount?: boolean
}

export const createFormField = ({
    defaultValue = "",
    patterns = [],
    skipOnFirstMount = true
}: Options) => {
    const store = writable(defaultValue)
    const error = writable("")
    let skip = skipOnFirstMount
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const unsub = store.subscribe((new_value) => {
        if (skip) {
            skip = false
            return
        }
        if (timeout) clearTimeout(timeout)

        timeout = setTimeout(() => {
            const noError = patterns.every(({ message, validator }) => {
                if (!validator.test(new_value)) {
                    error.set(message)
                    return false
                }
                return true
            })

            if (noError) error.set("")

        }, 500)

    })

    const reset = () => {
        store.set(defaultValue)
        error.set("")
        skip = skipOnFirstMount
    }


    onDestroy(() => {
        unsub()
    })

    return [store, error, reset] as const
}