<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { fetchWithToken } from "$lib/custom-fetch";
  import type { ApiResponse } from "$lib/types/api";
  import type { ProfileEntity } from "$lib/types/entity";
  import {
    createMutation,
    createQuery,
    useQueryClient,
  } from "@tanstack/svelte-query";

  export let data: ProfileEntity;

  const queryClient = useQueryClient();

  $: followed = createQuery({
    queryKey: ["profile", "followed", data.username],
    queryFn: async () => {
      const res: ApiResponse<{
        followed: boolean;
      }> = await fetchWithToken(
        PUBLIC_BACKEND_URL +
          `/api/profile/check-follow?username=${data.username}`,
      ).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });

  $: follow = createMutation({
    mutationKey: ["profile", "follow", data.username],
    mutationFn: async () => {
      const res: ApiResponse<{
        followed: boolean;
      }> = await fetchWithToken(
        PUBLIC_BACKEND_URL + `/api/profile/follow?username=${data.username}`,
      ).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data;
    },
    onSuccess(v) {
      if (v)
        queryClient.setQueryData(["profile", "followed", data.username], v);
    },
  });

  $: unfollow = createMutation({
    mutationKey: ["profile", "unfollow", data.username],
    mutationFn: async () => {
      const res: ApiResponse<{
        followed: boolean;
      }> = await fetchWithToken(
        PUBLIC_BACKEND_URL + `/api/profile/unfollow?username=${data.username}`,
      ).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data;
    },
    onSuccess(v) {
      if (v)
        queryClient.setQueryData(["profile", "followed", data.username], v);
    },
  });
</script>

{#if $followed.isLoading}
  <div
    class="h-9 bg-base-300 animate-pulse w-24 ease-emil rounded-full px-5 text-transparent"
  />
{:else if $followed.data?.followed === true}
  <button
    on:click={() => {
      if ($unfollow.isPending || $follow.isPending) return;

      $unfollow.mutate();
    }}
    class="btn group rounded-full px-5 !h-9 hover:btn-error"
  >
    <span class="absolute text-white opacity-0 group-hover:opacity-100">
      Unfollow
    </span>
    <span class="group-hover:opacity-0"> Following </span>
    {#if $unfollow.isPending}
      <span class="loading loading-spinner loading-xs" />
    {/if}
  </button>
{:else if $followed.data?.followed === false}
  <button
    on:click={() => {
      if ($unfollow.isPending || $follow.isPending) return;

      $follow.mutate();
    }}
    class="btn rounded-full !h-9 px-5 btn-primary"
  >
    Follow
    {#if $follow.isPending}
      <span class="loading loading-spinner loading-xs" />
    {/if}
  </button>
{/if}
