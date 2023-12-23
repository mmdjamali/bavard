import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"

export const DELETED_POSTS_CONTEXT_KEY = "deleted-posts"

export const setDeletedPostsContext = () => {
    const store = writable<string[]>([])
    setContext(DELETED_POSTS_CONTEXT_KEY, store)
}

export const getDeletedPostsContext = () => {
    return getContext<Writable<string[]>>(DELETED_POSTS_CONTEXT_KEY)
}
