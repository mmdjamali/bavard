<script lang="ts">
  import { browser } from "$app/environment";
  import { createDropdownMenu, melt } from "@melt-ui/svelte";
  import Icon from "../icon.svelte";
  import { fly } from "svelte/transition";
  import { cn } from "$lib/utils";
  import type { PostEntity, PostWithParent } from "$lib/types/entity";

  export let data: PostEntity & PostWithParent;

  const {
    elements: { trigger, menu, item, separator, arrow },
    builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
    states: { open },
  } = createDropdownMenu({
    positioning: {
      placement: "bottom-end",
    },
  });

  $: items = [
    {
      title: "Share",
      icon: "ri-share-line",
      action: () => {
        if (!browser) return;

        // if (!navigator.canShare()) return;

        navigator.share({
          title: "Hey! chech this out.",
          text: data.content,
          url: "https://localhost:5173/post/" + data.id,
        });
      },
    },
  ];
</script>

<button
  use:melt={$trigger}
  type="button"
  class="btn shadow-none text-base-content/75 hover:text-base-content relative btn-square rounded-full bg-transparent hover:bg-base-200 border-none !h-8 !w-8"
>
  <Icon class="ri-more-fill text-[18px]" />
</button>

{#if $open}
  <div
    class="bg-base-100 py-2 rounded-btn shadow-[0px_0px_20px] shadow-base-content/10"
    use:melt={$menu}
    transition:fly={{ duration: 150, y: -10 }}
  >
    {#each items as item (item.title)}
      <button
        on:click={() => {
          item.action?.();
        }}
        class="rounded-none btn w-40 bg-transparent hover:bg-base-300 border-none shadow-none no-animation !btn-sm text-sm justify-start"
      >
        <Icon class={cn("text-[18px] font-normal", item.icon)} />
        {item.title}
      </button>
    {/each}
  </div>
{/if}
