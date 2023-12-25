import { writable } from "svelte/store"
import { onDestroy } from "svelte"
import type { ApiResponse } from "$lib/types/api"
import { PUBLIC_BACKEND_URL } from "$env/static/public"
import { createDeboundedInput } from "./debounced-input"

export const createUsernameStore = ({ defaultValue = "" }: { defaultValue?: string }) => {
    const loading = writable(false)
    const exists = writable(false)
    const error = writable("")
    let first = true

    const [value, registerValue] = createDeboundedInput({
        defaultValue
    })

    const unsub = value.subscribe(async (newValue) => {
        if (!newValue && first) {
            first = false
            return
        }

        const noError = [
            {
                message: "Please don't leave this field empty.",
                validator: /./
            }
        ].every(({ message, validator }) => {
            if (validator.test(newValue)) {
                return true
            }
            error.set(message)
            return false
        })

        if (!noError) return

        loading.set(true)

        try {
            const res: ApiResponse<{ exists: boolean }> = await fetch(PUBLIC_BACKEND_URL + "/api/profile/check-username?username=" + encodeURIComponent(newValue)).then(res => res?.json())

            if (!res?.success) {
                error.set(res.message)
                loading.set(false)
                return
            }

            error.set(res.data.exists ? "Already in use." : "")
            exists.set(res.data.exists)
            loading.set(false)
        } catch (err) {
            error.set("Something went wrong.")
            loading.set(false)
        }
    })

    onDestroy(() => {
        unsub()
    })


    return { value, error, registerValue, loading, exists } as const
}