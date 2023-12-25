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

  const repost = data.repost;

  const rows = repost?.content?.split("\n") ?? [];
</script>

{#if repost}
  <a href="/post/{data.repost?.id}" class="w-full relative flex flex-col">
    <span class="px-4 pt-2 font-medium text-base-content/75 text-sm">
      Reposted by <a
        href="/profile/{data?.profile?.username}"
        class="font-semibold link link-hover">{data?.profile?.name}</a
      >
    </span>

    <div class="grid grid-cols-[40px_1fr] gap-3 px-4 border-b border-base-300">
      <a
        href="/profile/{repost.profile?.username}"
        class="w-full relative h-full py-3 shrink-0"
      >
        {#if repost.profile?.picture}
          <img
            class="w-full aspect-square rounded-full object-cover"
            src={repost.profile.picture}
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

      <div class="flex flex-col w-full">
        <div
          class="flex w-full justify-between text-sm text-[15px] pt-3 mt-0.5"
        >
          <span class="font-semibold tracking-[1px]"
            >{repost.profile?.name}</span
          >

          <span class="text-base-content text-sm text-opacity-75 px-2">
            {timeFormater(new Date(repost.created_at ?? ""))}
          </span>
        </div>

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
            <PostReply data={repost} />

            <PostRepost data={repost} />

            <PostLike data={repost} />

            <PostMore data={repost} />
          </div>
        </div>
      </div>
    </div>
  </a>
{/if}
