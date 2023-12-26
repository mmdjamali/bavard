<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import FollowedFeed from "$lib/components/feed/followed-feed.svelte";
  import Icon from "$lib/components/icon.svelte";
  import Navbar from "$lib/components/layout/navbar.svelte";
  import NewPostHome from "$lib/components/new-post-home.svelte";
  import Post from "$lib/components/post.svelte";
  import WithProfile from "$lib/components/with-profile.svelte";
  import { getCreatedPostsContext } from "$lib/contexts/created-posts/created-posts-context";
  import { getDeletedPostsContext } from "$lib/contexts/deleted-posts";
  import { fetchWithToken } from "$lib/custom-fetch";

  import type { ApiResponse } from "$lib/types/api";
  import type { PostEntity } from "$lib/types/entity";
  import { createQuery } from "@tanstack/svelte-query";

  const feed = createQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const res: ApiResponse<{
        feed: null | PostEntity[];
      }> = await fetchWithToken(PUBLIC_BACKEND_URL + "/api/post/feed").then(
        (res) => res?.json(),
      );

      if (!res?.success) return null;

      return res.data?.feed ?? null;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });

  const createdPosts = getCreatedPostsContext();
  const deletedPosts = getDeletedPostsContext();
</script>

<svelte:head>
  <title>Followed | Percent</title>
  <meta name="description" content="Percent | " />
</svelte:head>

<FollowedFeed />
