<script lang="ts">
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";

  const profile = getProfileContext();

  $: if (
    browser &&
    !$profile.isLoading &&
    $profile.data?.user?.id &&
    !$profile.data.profile?.id
  ) {
    goto("/auth/profile");
  }
</script>

{#if $profile.isLoading}
  <div class="grid place-items-center w-full h-full my-auto">
    <span class="loading loading-spinner ease-emil text-primary" />
  </div>
{:else if $profile.isError}
  <p>{$profile.error}</p>
{:else if $profile.data?.profile?.id}
  <slot />
{:else}
  <div class="flex flex-col relative min-h-[100svh]">
    <header
      class="sticky px-4 flex z-50 !min-h-0 h-14 p-0 top-0 w-full navbar bg-base-100/75 backdrop-blur-sm border-b border-base-300"
    >
      <div class="flex items-start justify-center flex-col w-full">
        <span class="text-xl text-start font-bold"> Home </span>
      </div>
    </header>

    <div class="flex flex-col my-auto py-16 w-full px-6 sm:px-12">
      <span class="font-black text-3xl sm:text-4xl mb-2">
        Welcome to <span
          class="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent"
          >Bavard!</span
        >
      </span>

      <span class="text-sm mb-6">
        An open-source place for authentic connections, real-time updates, and
        vibrant conversations. Join now to express, explore, and engage in a
        social experience that's uniquely yours!
      </span>

      <a
        class="btn bg-gradient-to-r from-primary to-secondary text-primary-content w-full"
        href="/auth"
      >
        Login / register</a
      >

      <div class="divider text-xs">OR</div>

      <a class="btn w-full" href="/explore"> Explore bavard </a>
    </div>
  </div>
{/if}
