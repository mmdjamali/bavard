<script lang="ts">
  import Navbar from "$lib/components/layout/navbar.svelte";
  import WithProfile from "$lib/components/with-profile.svelte";

  import type { LayoutData } from "./$types";
  import Profile from "$lib/components/profile/profile.svelte";
  import { cn } from "$lib/utils";
  import { page } from "$app/stores";
  import Icon from "$lib/components/icon.svelte";

  export let data: LayoutData;

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
  <title>{data.profile?.name} | Bavard</title>
  <meta name="description" content="Percent | " />
</svelte:head>

<Navbar />

<section
  class="sm:border-x flex flex-col relative max-w-[600px] mx-auto h-fit min-h-[100svh] w-full border-base-300"
>
  <WithProfile>
    <header
      class="sticky px-4 flex z-50 !min-h-0 h-14 p-0 top-0 w-full navbar bg-base-100/75 backdrop-blur-sm border-b border-base-300"
    >
      <button
        on:click={() => {
          history.back();
        }}
        class="h-full aspect-square"
      >
        <Icon class="ri-arrow-left-line text-[21px]" />
      </button>
      <div class="flex items-start justify-center flex-col w-full">
        <span class="text-xl text-start font-bold">
          {data?.profile?.name}
        </span>

        <span class="text-[13px]">
          <span>{data?.profile?.post_count}</span>
          posts
        </span>
      </div>
    </header>

    <Profile data={{ username: data.username }} />

    <div class="tabs mt-2 bg-base-100 border-b border-base-300">
      {#each tabs as tab (tab.title)}
        <a
          href={tab.path}
          class={cn(
            "tab h-12 relative capitalize hover:bg-base-200",
            $page.url.pathname === tab.path ? "font-semibold" : "",
          )}
        >
          {tab.title}
          {#if $page.url.pathname === tab.path}
            <span
              class="w-[50%] bottom-0 absolute inset-x-0 mx-auto bg-primary h-1"
            />
          {/if}
        </a>
      {/each}
    </div>

    <slot />

    <div class="navbar invisible md:hidden"></div>
  </WithProfile>
</section>
