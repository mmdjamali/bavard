import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { fetchWithToken } from "$lib/custom-fetch";
import type { ApiResponse } from "$lib/types/api";
import type { ProfileEntity } from "$lib/types/entity";
import { createQuery, type CreateQueryResult } from "@tanstack/svelte-query";
import { getContext, setContext } from "svelte";

const CONTEXT_KEY = "PROFILE"

export const setProfileContext = () => {
    const profile = createQuery<null | { profile: ProfileEntity | null, user: { id: string } }>({
        queryKey: ["profile", "me"],
        queryFn: async () => {
            try {
                const res: ApiResponse<{
                    profile: ProfileEntity | null, user: { id: string }
                }> = await fetchWithToken(PUBLIC_BACKEND_URL + "/api/profile/me").then(
                    (res) => res?.json(),
                );

                if (res.status === 401) return null

                if (!res?.success) throw new Error(res.message);

                return res.data ?? null;
            } catch (err) {
                if ((err as Error)?.message === "UNAUTHENTICATED") return null
                throw err
            }
        },
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: Infinity,
    });

    setContext(CONTEXT_KEY, profile)
}

export const getProfileContext = () => {
    return getContext<CreateQueryResult<{ profile?: ProfileEntity | null, user?: { id?: string } } | null, Error>>(CONTEXT_KEY)
}