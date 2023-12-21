<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import Icon from "$lib/components/icon.svelte";
  import Navbar from "$lib/components/layout/navbar.svelte";
  import NewPostHome from "$lib/components/new-post-home.svelte";
  import Post from "$lib/components/post.svelte";
  import WithProfile from "$lib/components/with-profile.svelte";
  import { getCreatedPostsContext } from "$lib/contexts/created-posts/created-posts-context";

  import type { ApiResponse } from "$lib/types/api";
  import type { PostEntity } from "$lib/types/entity";
  import { createQuery } from "@tanstack/svelte-query";

  const feed = createQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const res: ApiResponse<{
        feed: null | PostEntity[];
      }> = await fetch(PUBLIC_BACKEND_URL + "/api/post/feed").then((res) =>
        res?.json(),
      );

      if (!res?.success) return null;

      return res.data?.feed ?? null;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });

  const createdPosts = getCreatedPostsContext();

  $: console.log($feed);
</script>

<svelte:head>
  <title>Home | Percent</title>
  <meta name="description" content="Percent | " />
</svelte:head>

<Navbar />

<section
  class="border-x flex flex-col relative max-w-[600px] mx-auto h-fit min-h-[100svh] w-full border-base-300"
>
  <WithProfile>
    <header
      class="sticky flex !min-h-0 h-14 p-0 top-0 w-full navbar bg-base-100/50 backdrop-blur-sm border-b border-base-300"
    >
      <div class="flex h-full w-full text-[16px]">
        <button
          class="w-full relative font-semibold h-full transition-colors inline-grid place-items-center hover:bg-base-200"
        >
          For you
          <span class="absolute w-14 h-1 bg-primary bottom-0 mx-auto" />
        </button>
        <button
          class="w-full font-medium h-full transition-colors inline-grid place-items-center hover:bg-base-200"
        >
          Following
        </button>
      </div>

      <div class="aspect-square shrink-0 h-full inline-grid place-items-center">
        <button
          class="btn btn-square rounded-full hover:bg-base-300 bg-transparent border-none"
        >
          <Icon class="ri-settings-2-line text-[18px]" />
        </button>
      </div>
    </header>

    <NewPostHome />
    {#each $createdPosts as post (post.id)}
      <Post data={post} />
    {/each}

    {#if $feed.isLoading}
      <div class="w-full grid place-items-center justify-center h-32">
        <span class="loading loading-spinner loading-sm" />
      </div>
    {:else if $feed.data?.length}
      {#each $feed.data as post (post.id)}
        {#if !$createdPosts.some(({ id }) => id === post.id)}
          <Post data={post} />
        {/if}
      {/each}
    {/if}

    <div class="w-full text-center py-3 px-4">- End of feed -</div>
  </WithProfile>
</section>
