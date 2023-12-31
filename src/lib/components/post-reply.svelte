<script lang="ts">
  import { melt, createDialog } from "@melt-ui/svelte";
  import Icon from "./icon.svelte";
  import Count from "./count.svelte";
  import type { PostEntity } from "$lib/types/entity";
  import type { ApiResponse } from "$lib/types/api";
  import { fetchWithToken } from "$lib/custom-fetch";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { cn } from "$lib/utils";
  import { writable } from "svelte/store";
  import { getCreatedPostsContext } from "$lib/contexts/created-posts/created-posts-context";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import { fade, fly } from "svelte/transition";

  const MAX_LENGTH = 300;

  export let data: PostEntity;
  export let size: "sm" | "lg" | undefined = "sm";

  let input: HTMLTextAreaElement;

  const profile = getProfileContext();
  const createdPosts = getCreatedPostsContext();

  const content = writable("");
  const loading = writable(false);

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

  const handleSubmit = async () => {
    try {
      if ($loading) return;

      if (!$content || $content.length > MAX_LENGTH) {
        return;
      }

      loading.set(true);

      const res: ApiResponse<{ post: PostEntity }> = await fetchWithToken(
        PUBLIC_BACKEND_URL + "/api/post/reply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: data.id,
            content: $content,
          }),
        },
      ).then((res) => res?.json());

      if (!res?.success) throw new Error("Failed");

      createdPosts.update((prev) => {
        const clone = structuredClone(prev);
        clone.push(res.data.post);
        clone.reverse();
        // clone.sort((a, b) => {
        //   const a_ms = new Date(a.created_at ?? "").getTime();
        //   const b_ms = new Date(b.created_at ?? "").getTime();

        //   if (a_ms === b_ms) return 0;

        //   if (a_ms < b_ms) return 1;

        //   return -1;
        // });
        return clone;
      });
      open.set(false);
      loading.set(false);
    } catch (err) {
      loading.set(false);
    }
  };

  $: if (input && $open) input.focus();
</script>

{#if !$profile.data?.profile?.id}
  <button
    data-size={size}
    on:click={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    type="button"
    class="btn group shadow-none text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-sky-500/10 hover:text-sky-500 border-none data-[size=sm]:!h-9 data-[size=sm]:!w-9 data-[size=lg]:!w-10 data-[size=lg]:!h-10"
  >
    <Icon
      class="ri-chat-1-line group-data-[size=sm]:text-[18px] group-data-[size=lg]:text-[21px]"
    />
    <Count value={data?.reply_count ?? "0"} />
  </button>
{:else}
  <button
    data-size={size}
    on:click={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    use:melt={$trigger}
    type="button"
    class="btn group shadow-none text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-sky-500/10 hover:text-sky-500 border-none data-[size=sm]:!h-9 data-[size=sm]:!w-9 data-[size=lg]:!w-10 data-[size=lg]:!h-10"
  >
    <Icon
      class="ri-chat-1-line group-data-[size=sm]:text-[18px] group-data-[size=lg]:text-[21px]"
    />
    <Count value={data?.reply_count ?? "0"} />
  </button>
  <div class="text-sm text-base-content" use:melt={$portalled}>
    {#if $open}
      <div
        transition:fade={{ duration: 150 }}
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
          class="flex shrink-0 items-center py-3 px-4 border-b border-base-300 justify-between"
        >
          <span
            use:melt={$title}
            class="m-0 text-base font-semibold text-base-content"
          >
            Replying to <a
              href="/profile/{data.profile?.username}"
              class="link link-info font-medium link-hover"
              >@{data.profile?.username}</a
            >
          </span>

          <button type="button" use:melt={$close} aria-label="close" class="">
            <Icon class="ri-close-line text-[21px]" />
          </button>
        </div>

        <div class="w- flex flex-col overflow-y-scroll h-full px-4 py-3">
          <div class="grid grid-cols-[40px_1fr] gap-3">
            <div class="w-full h-full py-3 shrink-0">
              {#if $profile.data?.profile.picture}
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
                class="btn cursor-not-allowed no-animation btn-square rounded-full bg-transparent hover:bg-primary/10 text-primary border-none !h-9 !w-9"
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
              Reply
              {#if $loading}
                <Icon class="loading loading-dots loading-xs" />
              {/if}
            </button>
          </div>
        </div>
      </form>
    {/if}
  </div>
{/if}
