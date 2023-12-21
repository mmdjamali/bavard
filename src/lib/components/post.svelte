<script lang="ts">
  import type { PostEntity, ProfileEntity } from "$lib/types/entity";
  import { timeFormater } from "$lib/utils";
  import { createQuery } from "@tanstack/svelte-query";
  import Icon from "./icon.svelte";
  import type { ApiResponse } from "$lib/types/api";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import Count from "./count.svelte";
  import PostReply from "./post-reply.svelte";

  export let data: PostEntity;

  const author = createQuery({
    queryKey: ["profile", data.created_by],
    queryFn: async () => {
      const res: ApiResponse<{
        profile: null | ProfileEntity;
      }> = await fetch(
        PUBLIC_BACKEND_URL + "/api/profile/id/" + data.created_by,
      ).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data?.profile ?? null;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 10,
  });

  const rows = data.content?.split("\n") ?? [];
</script>

<div class="grid grid-cols-[40px_1fr] gap-3 px-4 border-b border-base-300">
  <div class="w-full relative h-full py-3 shrink-0">
    {#if $author.data?.picture}
      <img
        class="w-full aspect-square rounded-full object-cover border border-base-300"
        src={$author.data.picture}
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

  <div class="flex flex-col w-full">
    <div class="flex w-full justify-between text-sm text-[15px] pt-3 mt-0.5">
      <span class="font-semibold tracking-[1px]">{$author.data?.name}</span>

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

    <div class="w-full relative flex justify-between py-2 gap-4">
      <div class="flex items-center justify-between w-full relative">
        <PostReply {data} />

        <button
          type="button"
          class="btn text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-green-500/10 hover:text-green-500 border-none !h-8 !w-8"
        >
          <Icon class="ri-loop-right-line text-[18px]" />
          <Count value={data?.repost_count ?? "0"} />
        </button>

        <button
          type="button"
          class="btn text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-rose-500/10 hover:text-rose-500 border-none !h-8 !w-8"
        >
          <Icon class="ri-heart-line text-[18px]" />
          <Count value={data?.like_count ?? "0"} />
        </button>

        <button
          type="button"
          class="btn text-base-content/75 hover:text-base-content relative btn-square rounded-full bg-transparent hover:bg-base-200 border-none !h-8 !w-8"
        >
          <Icon class="ri-more-fill text-[18px]" />
        </button>
      </div>
    </div>
  </div>
</div>
