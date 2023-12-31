import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"

const LIKED_POSTS_KEY = "LIKED_POSTS"

export const setLikedPostsContext = () => {
    const store = writable<Record<string, boolean>>({})
    setContext(LIKED_POSTS_KEY, store)
}

export const getLikedPostsContext = () => {
    return getContext<Writable<Record<string, boolean>>>(LIKED_POSTS_KEY)
}