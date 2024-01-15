<script lang="ts">
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import Icon from "$lib/components/icon.svelte";

  const profile = getProfileContext();

  $: if (
    browser &&
    !$profile.isLoading &&
    $profile.data?.user?.id &&
    !$profile.data.profile?.id
  ) {
    goto("/auth/profile");
  }

  $: isAutheticated = browser && !$profile.isLoading && $profile.data?.user?.id;
</script>

{#if $profile.isLoading}
  <div class="grid place-items-center w-full h-full my-auto">
    <span class="loading loading-spinner ease-emil text-primary" />
  </div>
{:else if $profile.isError}
  <p>{$profile.error}</p>
{:else}
  <slot {isAutheticated} />
{/if}
