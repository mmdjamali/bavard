<script lang="ts">
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import type { PostEntity } from "$lib/types/entity";
  import { timeFormater } from "$lib/utils";
  import Icon from "./icon.svelte";
  import PostReply from "./post-reply.svelte";
  import PostLike from "./post/post-like.svelte";
  import PostMore from "./post/post-more.svelte";
  import PostRepost from "./post/post-repost.svelte";

  export let data: PostEntity;

  const repost = data.repost;

  const rows = repost?.content?.split("\n") ?? [];

  const profile = getProfileContext();
</script>

{#if repost}
  <a
    href="/post/{data.repost?.id}"
    class="grid grid-cols-[40px_1fr] gap-x-3 pt-1 px-4 border-b border-base-300"
  >
    <span class="w-full flex items-center justify-end">
      <Icon class="ri-loop-right-line text-[16px]" />
    </span>

    <span class="font-medium text-base-content/75 text-sm">
      reposted by <a
        href="/profile/{data?.profile?.username}"
        class="font-semibold link link-hover"
        >{data.profile?.username === $profile.data?.profile?.username
          ? "you"
          : data?.profile?.name}</a
      >
    </span>

    <a
      href="/profile/{repost.profile?.username}"
      class="w-full pt-1 relative h-full pb-3 shrink-0"
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
      <div class="flex w-full justify-between text-sm pt-1 mt-0.5">
        <span class="font-semibold tracking-[1px]">{repost.profile?.name}</span>

        <span class="text-base-content text-xs text-opacity-75 px-2">
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

          <PostMore {data} />
        </div>
      </div>
    </div>
  </a>
{/if}
