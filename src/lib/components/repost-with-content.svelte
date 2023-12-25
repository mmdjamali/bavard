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

  const repostRows = data.repost?.content?.split("\n") ?? [];
</script>

<a
  href="/post/{data.id}"
  class="grid grid-cols-[40px_1fr] gap-3 px-4 border-b border-base-300"
>
  <a
    href="/profile/{data.profile?.username}"
    class="w-full relative h-full py-3 shrink-0"
  >
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

  <div class="flex flex-col w-full">
    <div class="flex w-full justify-between text-sm text-[15px] pt-3 mt-0.5">
      <span class="font-semibold tracking-[1px]">{data.profile?.name}</span>

      <span class="text-base-content text-sm text-opacity-75 px-2">
        {timeFormater(new Date(data.created_at ?? ""))}
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

    <a
      href="/post/{data.repost?.id}"
      class="grid gap-3 mt-2 px-4 py-3 border rounded-md border-base-300"
    >
      <div class="w-full flex gap-3 items-center relative h-full shrink-0">
        <div class="w-10 h-10 aspect-square relative">
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
        </div>
        <div class="flex w-full justify-between text-sm text-[15px]">
          <span class="font-semibold tracking-[1px]"
            >{data?.repost?.profile?.name}</span
          >

          <span class="text-base-content text-sm text-opacity-75 px-2">
            {timeFormater(new Date(data.repost?.created_at ?? ""))}
          </span>
        </div>
      </div>

      <div class="flex flex-col w-full">
        <div class="text-[15px]">
          {#each repostRows as row}
            {#if row === ""}
              <br />
            {:else}
              <p>{row}</p>
            {/if}
          {/each}
        </div>
      </div>
    </a>

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
