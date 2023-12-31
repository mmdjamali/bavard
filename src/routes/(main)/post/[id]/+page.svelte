<script lang="ts">
  import Icon from "$lib/components/icon.svelte";

  import Navbar from "$lib/components/layout/navbar.svelte";
  import PostAvatar from "$lib/components/post-avatar.svelte";
  import PostReply from "$lib/components/post-reply.svelte";
  import Post from "$lib/components/post.svelte";
  import PostBookmark from "$lib/components/post/post-bookmark.svelte";
  import PostLike from "$lib/components/post/post-like.svelte";
  import PostMore from "$lib/components/post/post-more.svelte";
  import PostRepost from "$lib/components/post/post-repost.svelte";
  import PostShare from "$lib/components/post/post-share.svelte";
  import WithProfile from "$lib/components/with-profile.svelte";
  import { timeFormater } from "$lib/utils";
  import type { PageData } from "./$types";

  export let data: PageData;

  let postElement: null | HTMLDivElement = null;

  const date = new Date(data?.post?.created_at ?? "");

  $: if (postElement) {
    setTimeout(() => {
      postElement?.scrollIntoView({ behavior: "auto", inline: "start" });
    }, 0);
  }
</script>

<Navbar />

<section
  class="border-x flex flex-col relative max-w-[600px] mx-auto h-fit min-h-[100svh] w-full border-base-300"
>
  <WithProfile>
    <header
      class="sticky px-4 flex z-50 !min-h-0 h-14 p-0 top-0 w-full navbar bg-base-100/75 backdrop-blur-sm"
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
        <span class="text-xl text-start font-bold"> Post </span>
      </div>
    </header>

    {#if data.post?.parent?.id}
      <a
        href="/post/{data?.post.parent.id}"
        class="grid hover:bg-base-content/3 grid-cols-[40px_1fr] gap-3 px-4"
      >
        <div
          class="w-full gap-1 relative flex items-center flex-col h-full pt-3 shrink-0"
        >
          <a
            class="w-full shrink-0 relative"
            href="/profile/{data.post.parent.profile?.username}"
          >
            <PostAvatar profile={data.post.parent.profile} />
          </a>

          <span class="flex w-0.5 h-full bg-base-300" />
        </div>

        <div class="flex flex-col w-full">
          <div class="flex w-full justify-between pt-3 mt-0.5">
            <div class="flex items-center gap-2">
              <a
                href="/profile/{data.post.parent.profile?.username}"
                class="font-semibold link link-hover"
                >{data.post.parent.profile?.name}</a
              >
              <a
                href="/profile/{data.post.parent.profile?.username}"
                class="text-base-content/75 link link-hover"
                >@{data.post.parent.profile?.username}</a
              >
            </div>

            <span class="text-base-content text-xs text-opacity-75 px-2">
              {timeFormater(new Date(data.post.parent.created_at ?? ""))}
            </span>
          </div>

          <!-- {#if data.parent?.profile?.username}
        <ReplyingTo {data} />
      {/if} -->

          <div class="text-[15px]">
            {#each data.post?.parent.content?.split("\n") ?? [] as row, idx (idx)}
              {#if row === ""}
                <br />
              {:else}
                <p>{row}</p>
              {/if}
            {/each}
          </div>

          <div class="w-full relative flex justify-between py-2 gap-4">
            <div class="flex items-center justify-between w-full relative">
              <PostReply data={data.post.parent} />

              <PostRepost data={data.post.parent} />

              <PostLike data={data.post.parent} />

              <PostMore data={data.post.parent} />
            </div>
          </div>
        </div>
      </a>
    {/if}

    <div
      bind:this={postElement}
      class="flex scroll-m-14 flex-col w-full relative px-4"
    >
      <div
        class="items-center justify-between grid gap-x-3 pt-3 grid-cols-[40px_1fr]"
      >
        <div class="flex items-center justify-center">
          {#if data.post?.parent?.id}
            <span class="absolute top-0 h-2 bg-base-300 w-0.5"></span>
          {/if}
          <PostAvatar profile={data.post?.profile} />
        </div>

        <div
          class="flex w-full relative items-center justify-between overflow-hidden"
        >
          <div class="flex flex-col gap-0.5 overflow-hidden">
            <span
              class="link whitespace-nowrap text-ellipsis overflow-hidden link-hover font-bold leading-none"
              >{data.post?.profile?.name}</span
            >
            <span
              class="leading-none whitespace-nowrap overflow-hidden text-ellipsis text-base-content/75"
              >@{data.post?.profile?.username}</span
            >
          </div>

          <PostMore data={data.post ?? {}} />
        </div>
      </div>
      <div class="text-[17px] mt-3">
        {#each data.post?.content?.split("\n") ?? [] as row, idx (idx)}
          {#if row === ""}
            <br />
          {:else}
            <p>{row}</p>
          {/if}
        {/each}
      </div>
      <div class="w-full relative py-3">
        <span class="text-base-content/75 font-medium"
          >{date.toLocaleString("en-us", {
            hour: "2-digit",
            hour12: true,
            minute: "2-digit",
          })}
          ·
          {date.toLocaleString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}</span
        >
      </div>

      <div
        class="w-full flex items-center justify-between border-y border-base-300 py-1"
      >
        <PostReply size="lg" data={data.post ?? {}} />
        <PostRepost size="lg" data={data.post ?? {}} />
        <PostLike size="lg" data={data.post ?? {}} />
        <PostBookmark size="lg" data={data.post ?? {}} />
        <PostShare size="lg" data={data.post ?? {}} />
      </div>
    </div>

    <div class="flex invisible pointer-events-none h-[100svh]"></div>

    <div class="navbar invisible sm:hidden"></div>
  </WithProfile>
</section>
