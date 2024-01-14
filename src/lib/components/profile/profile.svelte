<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { fetchWithToken } from "$lib/custom-fetch";
  import type { ApiResponse } from "$lib/types/api";
  import type { ProfileEntity } from "$lib/types/entity";
  import { createMutation, createQuery } from "@tanstack/svelte-query";
  import Icon from "../icon.svelte";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import FollowButton from "../follow-button.svelte";
  import ProfileEditModal from "./profile-edit-modal.svelte";
  import ProfileMore from "./profile-more.svelte";

  export let data: { username?: string };

  $: profile = createQuery({
    queryKey: ["profile", data.username],
    queryFn: async () => {
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
    <div
      class="aspect-[3/1] w-full bg-base-300 animate-pulse ease-emil px-4 py-4"
    />

    <div class="w-full px-4 mb-2 relative flex items-center justify-between">
      <div
        class="w-[25%] min-w-[48px] mt-[-12.5%] top-0 bg-base-100 grid aspect-square border-4 border-base-100 rounded-full"
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
      <span class="w-40 h-6 animate-pulse ease-emil bg-base-300" />

      <span class="w-24 h-4 animate-pulse ease-emil bg-base-300 mt-2" />

      <div class="flex items-center gap-3 pt-2">
        <span class="w-56 h-4 animate-pulse ease-emil bg-base-300" />
      </div>
    </div>
  </div>
{:else}
  <div class="flex w-full relative items-center flex-col">
    <div class="w-full aspect-[3/1] bg-primary/10 px-4 py-4"></div>

    <div class="w-full mb-2 px-4 relative flex justify-between items-start">
      <div
        class="w-[25%] relative min-w-[48px] bg-base-100 grid aspect-square rounded-full mt-[-12.5%] border-4 border-base-100"
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
          ></div>
        {/if}
      </div>

      <div class="flex items-center justify-center gap-3 py-2">
        {#if $userProfile.data?.profile?.id === $profile.data?.profile?.id}
          <ProfileEditModal data={$userProfile.data?.profile ?? {}} />
        {:else}
          <FollowButton {data} />
        {/if}
        <ProfileMore data={$profile.data?.profile ?? {}} />
      </div>
    </div>

    <div class="w-full flex flex-col px-4">
      <h1 class="text-xl font-bold tracking-[0.5px] text-base-content">
        {$profile.data?.profile?.name}
      </h1>

      <span class="text-base-content/90">
        @{$profile.data?.profile?.username}
      </span>

      {#if $profile.data?.profile?.bio}
        <div class="mt-2">
          {#each $profile.data.profile.bio.split("\n") as row}
            {#if row === ""}
              <br />
            {/if}
            <p>{row}</p>
          {/each}
        </div>
      {/if}

      <div class="flex items-center mt-2">
        {#if $profile.data?.profile?.created_at}
          <div
            class="flex justify-center text-base-content/75 font-medium gap-1 items-center"
          >
            <Icon class="ri-calendar-line leading-none text-[18px]" />
            <span class="text-sm"
              >Joined {new Date(
                $profile.data?.profile?.created_at || "2020",
              ).toLocaleDateString("en-us", {
                month: "long",
                year: "numeric",
              })}</span
            >
          </div>
        {/if}
      </div>

      <div class="flex items-center gap-3 mt-2">
        <span class="text-base-content/75">
          <span class="text-base-content font-semibold">
            {$profile.data?.profile?.follower_count}
          </span> followers
        </span>

        <span class="text-base-content/75">
          <span class="text-base-content font-semibold">
            {$profile.data?.profile?.followed_count}
          </span> following
        </span>
      </div>
    </div>
  </div>
{/if}
