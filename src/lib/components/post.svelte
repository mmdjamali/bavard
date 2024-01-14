<script lang="ts">
  import type { PostEntity } from "$lib/types/entity";
  import { timeFormater } from "$lib/utils";
  import Icon from "./icon.svelte";
  import PostReply from "./post-reply.svelte";
  import ReplyingTo from "./post/replying-to.svelte";
  import PostLike from "./post/post-like.svelte";
  import PostMore from "./post/post-more.svelte";
  import PostRepost from "./post/post-repost.svelte";

  export let data: PostEntity;

  const rows = data.content?.split("\n") ?? [];
</script>

<a
  href="/post/{data?.id}"
  class="grid hover:bg-base-content/3 grid-cols-[40px_1fr] gap-3 px-4 border-b border-base-300"
>
  <div class="w-full relative h-full py-3 shrink-0">
    <a class="w-full relative" href="/profile/{data.profile?.username}">
      <div
        class="w-full relative aspect-square rounded-full bg-white overflow-hidden"
      >
        {#if data.profile?.picture}
          <img
            class="w-full aspect-square rounded-full object-cover"
            src={data.profile.picture}
            alt="profile"
          />
        {:else}
          <div
            class="w-full bg-base-100 aspect-square rounded-full inline-grid place-items-center"
          >
            <Icon class="ri-user-fill text-2xl text-base-300" />
          </div>
        {/if}
      </div>
    </a>
  </div>

  <div class="flex flex-col w-full overflow-hidden relative">
    <div class="flex w-full justify-between pt-3 mt-0.5">
      <div class="flex items-center gap-2">
        <a
          href="/profile/{data.profile?.username}"
          class="font-semibold link link-hover">{data.profile?.name}</a
        >
        <a
          href="/profile/{data.profile?.username}"
          class="text-base-content/75 link link-hover"
          >@{data.profile?.username}</a
        >
      </div>

      <span class="text-base-content text-xs text-opacity-75 px-2">
        {timeFormater(new Date(data.created_at ?? ""))}
      </span>
    </div>

    {#if data.parent?.profile?.username}
      <ReplyingTo {data} />
    {/if}

    <div class="text-[15px] break-words">
      {#each rows as row}
        {#if row === ""}
          <br />
        {:else}
          <p>{row}</p>
        {/if}
      {/each}
    </div>

    <div class="w-full relative flex justify-between py-2 gap-4">
      <div class="flex items-center justify-between w-full relative">
        <PostReply {data} />

        <PostRepost {data} />

        <PostLike {data} />

        <PostMore {data} />
      </div>
    </div>
  </div>
</a>
