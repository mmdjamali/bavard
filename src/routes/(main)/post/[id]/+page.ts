import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { ApiResponse } from '$lib/types/api';
import type { PostEntity } from '$lib/types/entity';
import type { PageLoad } from './$types';

export const ssr = true

export const load: PageLoad = async ({ params, fetch }) => {
    const res: ApiResponse<{ post: PostEntity | null }> = await fetch(PUBLIC_BACKEND_URL + "/api/post/" + params.id).then(res => res?.json())

    return {
        post: res.data?.post
    }
}