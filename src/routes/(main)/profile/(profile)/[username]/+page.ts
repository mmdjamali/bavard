import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    return {
        profile: null,
        username: params.username,
    }
}   