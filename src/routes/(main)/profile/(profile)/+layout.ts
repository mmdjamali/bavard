import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { ApiResponse } from '$lib/types/api';
import type { ProfileEntity } from '$lib/types/entity';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
    const res: ApiResponse<{ profile: ProfileEntity | null }> = await fetch(PUBLIC_BACKEND_URL + "/api/profile/get-by-username?username=" + params.username).then(res => res?.json())

    return {
        profile: res.data?.profile,
        username: params.username,
    }
}   