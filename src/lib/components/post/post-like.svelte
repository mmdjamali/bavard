<script lang="ts">
  import type { PostEntity } from "$lib/types/entity";
  import { createMutation } from "@tanstack/svelte-query";
  import Count from "../count.svelte";
  import Icon from "../icon.svelte";
  import type { ApiResponse } from "$lib/types/api";
  import { fetchWithToken } from "$lib/custom-fetch";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { writable } from "svelte/store";
  import { getLikedPostsContext } from "$lib/contexts/liked-posts";
  import { onMount } from "svelte";

  export let data: PostEntity;
  export let size: "sm" | "lg" | undefined = "sm";

  const likedPosts = getLikedPostsContext();

  const like_count = writable(Number.parseInt(data.like_count ?? "0"));

  $: liked = data.id ? $likedPosts[data.id] ?? false : null;

  const like = createMutation({
    mutationKey: ["post", "like", data.id],
    mutationFn: async () => {
      const res: ApiResponse<{ liked: boolean }> = await fetchWithToken(
        PUBLIC_BACKEND_URL + "/api/post/" + data.id + "/like",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res?.json());

      if (!res.success) return null;

      return res.data;
    },
    onSuccess(v) {
      if (typeof v?.liked === "boolean") {
        likedPosts.update((prev) => {
          if (!data.id || typeof v?.liked !== "boolean") return prev;

          prev[data.id] = v.liked;

          return prev;
        });
        like_count.update((prev) => prev + 1);
      }
    },
  });

  const removeLike = createMutation({
    mutationKey: ["post", "remove-like", data.id],
    mutationFn: async () => {
      const res: ApiResponse<{ liked: boolean }> = await fetchWithToken(
        PUBLIC_BACKEND_URL + "/api/post/" + data.id + "/remove-like",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res?.json());

      if (!res.success) return null;

      return res.data;
    },
    onSuccess(v) {
      if (typeof v?.liked === "boolean") {
        likedPosts.update((prev) => {
          if (!data.id || typeof v?.liked !== "boolean") return prev;

          prev[data.id] = v.liked;

          return prev;
        });

        like_count.update((prev) => prev - 1);
      }
    },
  });
</script>

<button
  data-size={size}
  on:click={(e) => {
    e.preventDefault();
    e.stopPropagation();

    if ($like.isPending || $removeLike.isPending) return;

    if (liked === true) return $removeLike.mutate();

    if (liked === false) return $like.mutate();
  }}
  disabled={$like.isPending || $removeLike.isPending}
  type="button"
  class="btn shadow-none group text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-rose-500/10 hover:text-rose-500 border-none data-[size=sm]:!h-9 data-[size=sm]:!w-9 data-[size=lg]:!w-10 data-[size=lg]:!h-10"
>
  {#if $like.isPending || $removeLike.isPending}
    <span
      class="loading-spinner loading loading-sm text-red-500 group-data-[size=sm]:text-[18px] group-data-[size=lg]:text-[21px]"
    />
  {:else if liked}
    <Icon
      class="ri-heart-fill text-rose-500 group-data-[size=sm]:text-[18px] group-data-[size=lg]:text-[21px]"
    />
  {:else}
    <Icon
      class="ri-heart-line text-[18px] group-data-[size=sm]:text-[18px] group-data-[size=lg]:text-[21px]"
    />
  {/if}
  <Count value={$like_count} />
</button>
