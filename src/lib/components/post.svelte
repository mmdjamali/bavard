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
  class="grid grid-cols-[40px_1fr] gap-3 px-4 border-b border-base-300"
>
  <div class="w-full relative h-full py-3 shrink-0">
    <a class="w-full relative" href="/profile/{data.profile?.username}">
      {#if data.profile?.picture}
        <img
          class="w-full aspect-square rounded-full object-cover border border-base-300"
          src={data.profile.picture}
          alt="profile"
        />
      {:else}
        <div
          class="w-full aspect-square rounded-full inline-grid place-items-center border border-base-300"
        >
          <Icon class="ri-user-fill text-2xl text-base-300" />
        </div>
      {/if}
    </a>
  </div>

  <div class="flex flex-col w-full">
    <div class="flex w-full justify-between text-sm text-[15px] pt-3 mt-0.5">
      <div class="flex items-center gap-2">
        <span class="font-semibold">{data.profile?.name}</span>
        <span class="text-base-content/75">@{data.profile?.username}</span>
      </div>

      <span class="text-base-content text-sm text-opacity-75 px-2">
        {timeFormater(new Date(data.created_at ?? ""))}
      </span>
    </div>

    {#if data.parent?.profile?.username}
      <ReplyingTo {data} />
    {/if}

    <div class="text-[15px]">
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
