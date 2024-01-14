<script lang="ts">
  import { cn } from "$lib/utils";
  import { createDialog, melt } from "@melt-ui/svelte";
  import Icon from "../icon.svelte";
  import { fade, fly } from "svelte/transition";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";

  const {
    elements: {
      trigger,
      close,
      content: dialogContent,
      overlay,
      portalled,
      title,
    },
    states: { open },
  } = createDialog();

  const profile = getProfileContext();
</script>

<button
  use:melt={$trigger}
  class="gap-2.5 h-10 w-10 hover:bg-base-200 rounded-btn text-lg flex justify-center items-center bg-transparent"
>
  <Icon class={cn("ri-more-2-fill text-[26px]")} />
</button>

<div class="text-sm sm:hidden text-base-content" use:melt={$portalled}>
  {#if $open}
    <div
      transition:fade={{ duration: 150 }}
      use:melt={$overlay}
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
          <span class="text-base-content font-semibold" use:melt={$title}>
          </span>

          <button type="button" use:melt={$close} aria-label="close" class="">
            <Icon class="ri-close-line text-[21px]" />
          </button>
        </div>

        <div class="flex flex-col h-full px-4 py-4">
          {#if $profile.data?.profile?.username}
            <a
              href="/profile/{$profile.data?.profile?.username}"
              class="btn btn-ghost w-full justify-start gap-3"
            >
              <Icon class="text-[21px] ri-user-line" />
              <span> Profile </span>
            </a>
          {/if}
          <button class="btn btn-ghost w-full justify-start gap-3">
            <Icon class="text-[21px] ri-settings-3-line" />
            <span> Settings </span>
          </button>

          <button class="btn btn-ghost w-full justify-start gap-3 text-error">
            <Icon class="text-[21px] ri-logout-box-line" />
            <span> Logout </span>
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
