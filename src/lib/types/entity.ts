export type ProfileEntity = {
    id?: string,
    bio?: string,
    name?: string,
    username?: string,
    picture?: string,
    created_at?: string
}

export type PostEntity = {
    id?: string,
    content?: string,
    deleted?: boolean,
    reply_count?: string,
    like_count?: string,
    repost_count?: string,
    created_by?: string,
    created_at?: string
}

export type PostWithParent = {
    parent?: PostEntity
}