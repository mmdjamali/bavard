import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { ApiResponse } from "./types/api"

let token: string;

const refresh = async () => {
    const res: ApiResponse<{ accessToken: string }> = await fetch(PUBLIC_BACKEND_URL + "/api/auth/refresh", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => res?.json())

    if (res.status === 401) throw new Error("UNAUTHENTICATED")

    if (!res.success) throw res.message

    return res.data.accessToken
}

export const fetchWithToken = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
    if (!token) {
        token = await refresh()
    }

    const res = await fetch(
        input,
        {
            mode: "cors",
            ...(init ?? {}),
            headers: init?.headers
                ? {
                    ...init.headers,
                    Authorization: `Bearer ${token}`,
                }
                : {
                    Authorization: `Bearer ${token}`,
                },
        }
    );

    if (res.status !== 401) return res;

    token = await refresh();

    if (!token) return res;

    return await fetch(
        input,
        {
            mode: "cors",
            ...(init ?? {}),
            headers: init?.headers
                ? {
                    ...init.headers,
                    Authorization: `Bearer ${token}`,
                }
                : {
                    Authorization: `Bearer ${token}`,
                },
        }
    );
}
