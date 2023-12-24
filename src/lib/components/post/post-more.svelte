<script lang="ts">
  import { browser } from "$app/environment";
  import { createDropdownMenu, melt } from "@melt-ui/svelte";
  import Icon from "../icon.svelte";
  import { fly } from "svelte/transition";
  import { cn } from "$lib/utils";
  import type { PostEntity } from "$lib/types/entity";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import { createMutation } from "@tanstack/svelte-query";
  import { fetchWithToken } from "$lib/custom-fetch";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import type { ApiResponse } from "$lib/types/api";
  import { getDeletedPostsContext } from "$lib/contexts/deleted-posts";

  export let data: PostEntity;

  const {
    elements: { trigger, menu, item, separator, arrow },
    builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
    states: { open },
  } = createDropdownMenu({
    positioning: {
      placement: "bottom-end",
    },
  });

  const profile = getProfileContext();

  const deletedPosts = getDeletedPostsContext();

  const deletePost = createMutation({
    mutationKey: ["post", "delete", data.id],
    mutationFn: async () => {
      const res: ApiResponse<null> = await fetchWithToken(
        PUBLIC_BACKEND_URL + "/api/post/" + data.id,
        {
          method: "DELETE",
        },
      ).then((res) => res?.json());

      return null;
    },
    onSuccess: () => {
      console.log("yes yes yes");
      deletedPosts.update((prev) => {
        const clone = structuredClone(prev);

        if (typeof data.id === "string") clone.push(data.id);

        console.log(typeof data.id === "string");
        console.table(clone);

        return clone;
      });
    },
  });

  $: items = [
    {
      loading: $deletePost.isPending,
      disabled: $profile?.data?.profile?.id !== data.created_by,
      title: "Delete",
      icon: "ri-delete-bin-line",
      action: () => {
        $deletePost.mutate();
      },
    },
    {
      loading: false,
      disabled: false,
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
  on:click={(e) => {
    e.preventDefault();
    e.stopPropagation();
  }}
  use:melt={$trigger}
  type="button"
  class="btn shadow-none text-base-content/75 hover:text-base-content relative btn-square rounded-full bg-transparent hover:bg-base-200 border-none !h-8 !w-8"
>
  <Icon class="ri-more-fill text-[18px]" />
</button>

{#if $open}
  <div
    class="bg-base-100 flex flex-col py-2 rounded-btn shadow-[0px_0px_20px] shadow-base-content/10"
    use:melt={$menu}
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
