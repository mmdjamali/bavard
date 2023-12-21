import type { PostEntity } from "$lib/types/entity"
import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"

export const CREATED_POSTS_CONTEXT_KEY = "created-posts"

export const setCreatedPostsContext = () => {
    const store = writable<PostEntity[]>([])
    setContext(CREATED_POSTS_CONTEXT_KEY, store)
}

export const getCreatedPostsContext = () => {
    return getContext<Writable<PostEntity[]>>(CREATED_POSTS_CONTEXT_KEY)
}
