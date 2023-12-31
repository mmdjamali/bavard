<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { getCreatedPostsContext } from "$lib/contexts/created-posts/created-posts-context";
  import { getDeletedPostsContext } from "$lib/contexts/deleted-posts";
  import { fetchWithToken } from "$lib/custom-fetch";
  import type { ApiResponse, PaginatedData } from "$lib/types/api";
  import type { PostEntity, ProfileEntity } from "$lib/types/entity";
  import { createInfiniteQuery } from "@tanstack/svelte-query";
  import Repost from "../repost.svelte";
  import RepostWithContent from "../repost-with-content.svelte";
  import Post from "../post.svelte";
  import viewport from "$lib/actions/viewport";
  import PostLoader from "../post/post-loader.svelte";
  import { getLikedPostsContext } from "$lib/contexts/liked-posts";

  export let data: ProfileEntity;

  const likedPosts = getLikedPostsContext();

  $: feed = createInfiniteQuery({
    queryKey: ["profile", "replies", data.username],
    queryFn: async ({ pageParam = 1 }) => {
      const res: ApiResponse<
        {
          feed: null | PostEntity[];
        } & PaginatedData
      > = await fetchWithToken(
        PUBLIC_BACKEND_URL +
          `/api/post/profile-replies?username=${data.username}&page=${pageParam}&pageSize=5`,
      ).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data;
    },
    getNextPageParam: (data) => {
      if (typeof data?.next_page !== "number") return;

      if (!data?.has_next_page) return;

      return data.next_page;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  $: likedPosts.update((prev) => {
    $feed.data?.pages.forEach((row) => {
      if (!row) return;

      row.feed?.forEach((post) => {
        let post_id =
          !post.content && !!post?.repost?.id ? post.repost.id : post?.id;
        let post_liked =
          !post.content && !!post?.repost?.id ? post.repost.liked : post?.liked;

        if (!post_id) return;

        if (typeof prev[post_id] === "boolean") return;

        if (typeof post_liked !== "boolean") return;

        prev[post_id] = post_liked;
      });
    });

    return prev;
  });

  const createdPosts = getCreatedPostsContext();
  const deletedPosts = getDeletedPostsContext();
</script>

{#if $feed.isLoading}
  <PostLoader />
  <PostLoader />
  <PostLoader />
  <PostLoader />
  <PostLoader />
{:else if $feed.data?.pages.length}
  {#each $feed.data.pages as page, idx (idx)}
    {#if page?.feed && page.feed?.length}
      {#each page.feed as post (post.id)}
        {#if !$createdPosts.some(({ id }) => id === post.id)}
          {#if post.id && !$deletedPosts.includes(post.id)}
            {#if !post.content && post.repost?.id}
              <Repost data={post} />
            {:else if post.content && post.repost?.id}
              <RepostWithContent data={post} />
            {:else}
              <Post data={post} />
            {/if}
          {/if}
        {/if}
      {/each}
    {/if}
  {/each}
{/if}

{#if $feed.isFetchingNextPage}
  <PostLoader />
  <PostLoader />
  <PostLoader />
{/if}

{#if $feed.hasNextPage && $feed.data && !$feed.isLoading}
  <div
    use:viewport={{
      enterViewport() {
        console.log("yo");

        if (
          !$feed.isLoading &&
          !$feed.isFetchingNextPage &&
          $feed.hasNextPage
        ) {
          $feed.fetchNextPage();
        }
      },
    }}
    class="btn w-full"
  >
    Next Page
  </div>
{/if}
