<script lang="ts">
  import { createDialog, createDropdownMenu, melt } from "@melt-ui/svelte";
  import Icon from "../icon.svelte";
  import { fade, fly } from "svelte/transition";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import type { ProfileEntity } from "$lib/types/entity";
  import { browser } from "$app/environment";
  import { cn } from "$lib/utils";

  export let data: ProfileEntity | undefined = undefined;

  const {
    elements: {
      trigger: dialogTrigger,
      close: dialogClose,
      content: dialogContent,
      overlay: dialogOverlay,
      portalled: dialogPortalled,
      title: dialogTitle,
    },
    states: { open: dialogOpen },
  } = createDialog();

  const {
    elements: {
      trigger: dropdownTrigger,
      menu: dropdownMenu,
      item: dropdownItem,
      separator: dropdownSeparator,
    },
    states: { open: dropdownOpen },
  } = createDropdownMenu({
    positioning: {
      placement: "bottom-end",
    },
  });

  const profile = getProfileContext();

  $: items = [
    {
      loading: false,
      disabled: false,
      title: "Share",
      icon: "ri-share-2-line",
      action: () => {
        if (!browser) return;

        // if (!navigator.canShare()) return;

        navigator.share({
          title: "Hey! check this out.",
          url: "https://localhost:5173/profile/" + data?.username,
        });
      },
    },
  ];
</script>

<button
  use:melt={$dialogTrigger}
  class="btn sm:hidden btn-square btn-ghost border border-base-300 !h-9 !w-9 rounded-full"
>
  <Icon class="ri-more-fill text-[21px]" />
</button>

<button
  use:melt={$dropdownTrigger}
  class="btn max-sm:hidden btn-square btn-ghost border border-base-300 !h-9 !w-9 rounded-full"
>
  <Icon class="ri-more-fill text-[21px]" />
</button>

<div class="text-sm sm:hidden text-base-content" use:melt={$dialogPortalled}>
  {#if $dialogOpen}
    <div
      transition:fade={{ duration: 150 }}
      use:melt={$dialogOverlay}
      class="fixed inset-0 z-50 backdrop-blur-[2px] bg-base-content/10"
    />
    <div
      transition:fly={{ duration: 150, y: 150, opacity: 0 }}
      class="fixed bottom-0 z-50 w-full h-fit"
      use:melt={$dialogContent}
    >
      <div
        class="flex flex-col rounded-tr-box rounded-tl-box bg-base-100 shadow-lg"
      >
        <div class="flex shrink-0 items-center py-3 pb-0 px-4 justify-between">
          <span class="text-base-content font-semibold" use:melt={$dialogTitle}>
          </span>

          <button
            type="button"
            use:melt={$dialogClose}
            aria-label="close"
            class=""
          >
            <Icon class="ri-close-line text-[21px]" />
          </button>
        </div>

        <div class="flex flex-col gap-2 h-full px-4 py-4">
          <button class="btn btn-ghost w-full justify-start gap-3">
            <Icon class="text-[21px] ri-share-2-line" />
            <span> Share </span>
          </button>
          {#if data?.username === $profile.data?.profile?.username}
            <button class="btn btn-ghost w-full justify-start gap-3 text-error">
              <Icon class="text-[21px] ri-logout-box-line" />
              <span> Logout </span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

{#if $dropdownOpen}
  <div
    class="bg-base-100 flex flex-col py-2 rounded-btn shadow-[0px_0px_20px] shadow-base-content/10"
    use:melt={$dropdownMenu}
    transition:fly={{ duration: 150, y: -10 }}
  >
    {#each items as item (item.title)}
      {#if !item.disabled}
        <button
          on:click={() => {
            if (item.loading) return;

            item.action?.();
          }}
          class="rounded-none btn w-40 bg-transparent hover:bg-base-300 border-none shadow-none no-animation !btn-sm text-sm justify-start"
        >
          {#if item.loading}
            <span class="loading loading-spinner loading-xs text-[18px]" />
          {:else}
            <Icon class={cn("text-[18px] font-normal", item.icon)} />
          {/if}
          {item.title}
        </button>
      {/if}
    {/each}
  </div>
{/if}
