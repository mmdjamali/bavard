import type { ApiResponse } from "./types/api"

let token: string;

const refresh = async () => {
    const res: ApiResponse<{ accessToken: string }> = await fetch("/", {
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => res?.json())

    if (!res.success) throw "somthing went wrong"

    return res.data.accessToken
}

export const fetchWithToken = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {

    try {
        if (!token) {
            token = await refresh()
        }

        const res = await fetch(
            input,
            init
                ? {
                    mode: "cors",
                    ...init,
                    headers: init.headers
                        ? {
                            ...init.headers,
                            Authorization: `Bearer ${token}`,
                        }
                        : {
                            Authorization: `Bearer ${token}`,
                        },
                }
                : undefined,
        );

        if (res.status !== 401) return res;

        token = await refresh();

        if (!token) return res;

        return await fetch(
            input,
            init
                ? {
                    mode: "cors",
                    ...init,
                    headers: init.headers
                        ? {
                            ...init.headers,
                            Authorization: `Bearer ${token}`,
                        }
                        : {
                            Authorization: `Bearer ${token}`,
                        },
                }
                : undefined,
        );
    }
    catch (err) {
        return;
    }
}