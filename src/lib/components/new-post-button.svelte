<script lang="ts">
  import { melt, createDialog } from "@melt-ui/svelte";
  import Icon from "./icon.svelte";
  import { fly } from "svelte/transition";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import { writable } from "svelte/store";
  import { cn } from "$lib/utils";

  const MAX_LENGTH = 300;

  let input: HTMLTextAreaElement | null = null;
  const loading = writable(false);
  const content = writable("");

  const {
    elements: {
      close,
      content: dialogContent,
      overlay,
      portalled,
      trigger,
      title,
    },
    states: { open },
  } = createDialog();

  const profile = getProfileContext();

  const handleSubmit = () => {};

  $: if (input && $open) input.focus();
</script>

<button
  use:melt={$trigger}
  class="btn rounded-full !h-12 w-12 lg:w-full btn-primary"
>
  <span class="hidden lg:inline text-base capitalize">post</span>
  <span class="relative">
    <Icon
      class="lg:hidden ri-quill-pen-line translate-x-1 text-[26px] font-normal"
    />
    <Icon
      class="lg:hidden absolute top-0 font-bold left-0 -translate-x-0.5 -translate-y-0.5 ri-add-fill text-[16px]"
    />
  </span>
</button>

<div class="text-sm text-base-content" use:melt={$portalled}>
  {#if $open}
    <div
      transition:fly={{ duration: 150, opacity: 0 }}
      use:melt={$overlay}
      class="fixed inset-0 z-50 backdrop-blur-[2px] bg-base-content/10"
    />

    <form
      transition:fly={{ duration: 150, y: 100, opacity: 0 }}
      on:submit|preventDefault={handleSubmit}
      class="fixed flex flex-col left-[50%] top-[50%] z-50 w-full h-full sm:h-fit sm:max-h-[85vh] sm:w-[90vw] sm:max-w-[500px] translate-x-[-50%] translate-y-[-50%] sm:rounded-box bg-base-100 shadow-lg"
      use:melt={$dialogContent}
    >
      <div
        class="flex shrink-0 items-center px-4 py-3 border-b border-base-300 justify-between"
      >
        <h2
          use:melt={$title}
          class="m-0 text-lg font-semibold text-base-content"
        >
          New post
        </h2>

        <button type="button" use:melt={$close} aria-label="close" class="">
          <Icon class="ri-close-line text-[21px]" />
        </button>
      </div>

      <div class="w- flex flex-col overflow-y-scroll h-full px-4">
        <div class="grid grid-cols-[40px_1fr] gap-3">
          <div class="w-full h-full py-3 shrink-0">
            {#if $profile.data?.profile?.picture}
              <img
                class="w-full aspect-square rounded-full object-cover border border-base-300"
                src={$profile.data.profile.picture}
                alt="profile"
              />
            {:else}
              <div
                class="w-full aspect-square rounded-full inline-grid place-items-center border border-base-300"
              >
                <Icon class="ri-user-fill text-2xl text-base-300" />
              </div>
            {/if}
          </div>

          <div class="flex flex-col w-full">
            <textarea
              bind:this={input}
              bind:value={$content}
              on:input={(e) => {
                const target = e.currentTarget;

                target.style.height = "auto";
                target.style.height = target.scrollHeight + "px";
              }}
              rows="5"
              placeholder="What's up?"
              class="w-full md:max-h-72 max-h-[calc(svh100_-_(7))] resize-none pt-4 pb-3 mt-0.5 text-lg outline-none"
            />
          </div>
        </div>
      </div>

      <div
        class="flex shrink-0 items-center px-4 py-3 border-t border-base-300 justify-between"
      >
        <div class="w-full flex justify-between gap-4">
          <div class="flex items-center">
            <button
              type="button"
              class="btn cursor-not-allowed no-animation btn-square rounded-full bg-transparent hover:bg-primary/10 text-primary border-none !h-8 !w-8"
            >
              <Icon class="ri-image-line text-[18px]" />
            </button>
          </div>
        </div>

        <div class="flex relative items-center justify-center gap-3">
          {#if $content}
            <div
              transition:fly={{ duration: 200, x: -20 }}
              class="h-9 w-9 inline-grid place-items-center aspect-square"
            >
              <div
                class={cn(
                  "radial-progress transition-all inline-grid place-items-center border border-base-300",
                  $content.length > MAX_LENGTH
                    ? "text-error"
                    : $content.length > MAX_LENGTH - 20
                      ? "text-warning"
                      : "text-primary",
                )}
                style="--size:{MAX_LENGTH - $content.length <= 20
                  ? 30
                  : 24}px;--value:{Math.round(
                  ($content.length / MAX_LENGTH) * 100,
                )};--thickness: 3px;"
              >
                {#if MAX_LENGTH - $content.length <= 20}
                  <span class="text-xs">{MAX_LENGTH - $content.length}</span>
                {/if}
              </div>
            </div>
          {/if}

          <button
            class={cn(
              "btn px-5 !h-9 btn-primary rounded-full leading-none",
              !$content ? "opacity-50 no-animation" : "",
            )}
            on:click={() => {}}
          >
            Post
            {#if $loading}
              <Icon class="loading loading-dots loading-xs" />
            {/if}
          </button>
        </div>
      </div>
    </form>
  {/if}
</div>
