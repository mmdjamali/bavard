<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { fetchWithToken } from "$lib/custom-fetch";
  import type { ApiResponse } from "$lib/types/api";
  import type { ProfileEntity } from "$lib/types/entity";
  import { createQuery } from "@tanstack/svelte-query";
  import Icon from "../icon.svelte";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";

  export let data: { username: string };

  $: profile = createQuery({
    queryKey: ["profile", data.username],
    queryFn: async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("");
        }, 3000);
      });

      const res: ApiResponse<{
        profile: ProfileEntity | null;
      }> = await fetchWithToken(
        PUBLIC_BACKEND_URL +
          `/api/profile/get-by-username?username=${data.username}`,
      ).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });

  const userProfile = getProfileContext();
</script>

{#if $profile.isLoading || (!$profile.data && !$profile.isError)}
  <div class="flex relative items-center flex-col">
    <div class="w-full h-[150px] bg-base-300 animate-pulse ease-emil px-4 py-4">
      <button
        on:click={() => {
          history.back();
        }}
        class="btn btn-square"
      >
        <Icon class="ri-arrow-left-line text-[21px]" />
      </button>
    </div>

    <div class="w-full px-4 relative flex items-center justify-end">
      <div
        class="w-20 shadow-md shadow-base-content/10 top-0 bg-base-100 left-4 absolute h-20 grid aspect-square border-2 border-base-100 rounded-full translate-y-[-50%]"
      >
        <div
          class="w-full aspect-square bg-base-300 animate-pulse ease-emil rounded-full inline-grid place-items-center"
        />
      </div>

      <div class="flex items-center justify-center gap-3 py-2">
        <div
          class="h-10 bg-base-300 animate-pulse w-24 ease-emil rounded-full px-5 text-transparent"
        />

        <div
          class="h-10 w-10 bg-base-300 animate-pulse ease-emil rounded-full text-transparent"
        />
      </div>
    </div>

    <div class="w-full flex flex-col px-4">
      <span class="w-40 h-6 rounded-full animate-pulse ease-emil bg-base-300" />

      <span
        class="w-24 h-4 rounded-full animate-pulse ease-emil bg-base-300 my-1"
      />

      <div class="flex items-center gap-3 py-1">
        <span
          class="w-56 h-4 rounded-full animate-pulse ease-emil bg-base-300"
        />
      </div>
    </div>
  </div>
{:else}
  <div class="flex relative items-center flex-col">
    <div class="w-full h-[150px] bg-primary px-4 py-4">
      <button
        on:click={() => {
          history.back();
        }}
        class="btn btn-square"
      >
        <Icon class="ri-arrow-left-line text-[21px]" />
      </button>
    </div>

    <div class="w-full px-4 relative flex items-center justify-end">
      <div
        class="w-20 shadow-md shadow-base-content/10 top-0 bg-base-100 left-4 absolute h-20 grid aspect-square border-2 border-base-100 rounded-full translate-y-[-50%]"
      >
        {#if $profile.data?.profile?.picture}
          <img
            alt=""
            class="w-full aspect-square rounded-full object-cover"
            src={$profile.data?.profile.picture}
          />
        {:else}
          <div
            class="w-full aspect-square rounded-full inline-grid place-items-center"
          >
            <Icon class="ri-user-fill text-3xl text-base-300" />
          </div>
        {/if}
      </div>

      <div class="flex items-center justify-center gap-3 py-2">
        {#if $userProfile.data?.profile?.id === $profile.data?.profile?.id}
          <button class="btn rounded-full px-5">
            Edit <Icon class="text-[18px] ri-edit-fill" />
          </button>
        {:else}
          <button class="btn rounded-full px-5 btn-primary"> Follow </button>
        {/if}
        <button class="btn btn-square rounded-full">
          <Icon class="ri-more-fill text-[21px]" />
        </button>
      </div>
    </div>

    <div class="w-full flex flex-col px-4">
      <h1 class="text-lg text-base-content font-semibold">
        {$profile.data?.profile?.name}
      </h1>

      <span class="text-sm text-base-content/75">
        @{$profile.data?.profile?.username}
      </span>

      <div class="flex items-center gap-3 py-1">
        <span class="text-base-content/75">
          <span class="text-base-content font-semibold">
            {$profile.data?.profile?.follower_count}
          </span> followers
        </span>

        <span class="text-base-content/75">
          <span class="text-base-content font-semibold">
            {$profile.data?.profile?.follower_count}
          </span> following
        </span>

        <span class="text-base-content/75">
          <span class="text-base-content font-semibold">
            {$profile.data?.profile?.post_count}
          </span> posts
        </span>
      </div>

      {#if $profile.data?.profile?.bio}
        <p>{$profile.data?.profile?.bio}</p>
      {/if}
    </div>
  </div>
{/if}
