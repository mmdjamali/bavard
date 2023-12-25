<script lang="ts">
  import Navbar from "$lib/components/layout/navbar.svelte";
  import WithProfile from "$lib/components/with-profile.svelte";

  import type { PageData } from "./$types";
  import Profile from "$lib/components/profile/profile.svelte";
  import { cn } from "$lib/utils";
  import { page } from "$app/stores";

  export let data: PageData;

  $: tabs = [
    {
      path: `/profile/${data.username}`,
      title: "posts",
    },
    {
      path: `/profile/${data.username}/likes`,
      title: "likes",
    },
    {
      path: `/profile/${data.username}/replies`,
      title: "replies",
    },
  ] satisfies { path: string; title: string }[];
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
    <!-- <header
      class="sticky flex z-50 !min-h-0 h-14 p-0 top-0 w-full navbar bg-base-100/50 backdrop-blur-sm border-b border-base-300"
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
    </header> -->

    <Profile {data} />

    <div class="tabs sticky top-0 tabs-bordered">
      {#each tabs as tab (tab.title)}
        <button
          class={cn(
            "tab h-10 capitalize",
            $page.url.pathname === tab.path ? "tab-active" : "",
          )}
        >
          {tab.title}
        </button>
      {/each}
    </div>

    <!-- {#if $feed.isLoading}
        <div class="w-full grid place-items-center justify-center h-full my-auto">
          <span class="loading loading-spinner loading-sm" />
        </div>
      {:else if $feed.data?.length}
        {#each $feed.data as post (post.id)}
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
   -->

    <div class="w-full text-center py-3 px-4">- End of feed -</div>

    <div class="navbar invisible md:hidden"></div>
  </WithProfile>
</section>
