<script lang="ts">
  import { getCreatedPostsContext } from "$lib/contexts/created-posts/created-posts-context";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import type { PostEntity } from "$lib/types/entity";
  import { writable } from "svelte/store";
  import Count from "../count.svelte";
  import Icon from "../icon.svelte";
  import { createDialog, melt } from "@melt-ui/svelte";
  import type { ApiResponse } from "$lib/types/api";
  import { fetchWithToken } from "$lib/custom-fetch";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { cn } from "$lib/utils";

  const MAX_LENGTH = 300;

  export let data: PostEntity;

  const profile = getProfileContext();
  const createdPosts = getCreatedPostsContext();

  const content = writable("");
  const loading = writable(false);
  const focused = writable(false);

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

      loading.set(true);

      const res: ApiResponse<{ post: PostEntity }> = await fetchWithToken(
        PUBLIC_BACKEND_URL + "/api/post/repost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            repost_id: data.id,
            content: $content,
          }),
        },
      ).then((res) => res?.json());

      if (!res?.success) throw new Error("Failed");

      createdPosts.update((prev) => {
        const clone = structuredClone(prev);
        clone.push(res.data.post);
        clone.sort((a, b) => {
          const a_ms = new Date(a.created_at ?? "").getTime();
          const b_ms = new Date(b.created_at ?? "").getTime();

          if (a_ms === b_ms) return 0;

          if (a_ms < b_ms) return 1;

          return -1;
        });
        return clone;
      });
      open.set(false);
      loading.set(false);
    } catch (err) {
      loading.set(false);
    }
  };
</script>

{#if !$profile.data?.profile?.id}
  <button
    on:click={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    type="button"
    class="btn shadow-none text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-green-500/10 hover:text-green-500 border-none !h-8 !w-8"
  >
    <Icon class="ri-loop-right-line text-[18px]" />
    <Count value={data?.repost_count ?? "0"} />
  </button>
{:else}
  <button
    on:click={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    use:melt={$trigger}
    type="button"
    class="btn shadow-none text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-green-500/10 hover:text-green-500 border-none !h-8 !w-8"
  >
    <Icon class="ri-loop-right-line text-[18px]" />
    <Count value={data?.repost_count ?? "0"} />
  </button>

  <div class="text-sm text-base-content" use:melt={$portalled}>
    {#if $open}
      <div
        use:melt={$overlay}
        class="fixed inset-0 z-50 backdrop-blur-[2px] bg-base-content/20"
      />

      <form
        on:submit|preventDefault={handleSubmit}
        class="fixed flex flex-col left-[50%] top-[50%] z-50 w-full h-full sm:h-fit sm:max-h-[85vh] sm:w-[90vw] sm:max-w-[500px] translate-x-[-50%] translate-y-[-50%] sm:rounded-box bg-base-100 shadow-lg"
        use:melt={$dialogContent}
      >
        <div
          class="flex shrink-0 items-center p-6 border-b border-base-300 justify-between"
        >
          <h2
            use:melt={$title}
            class="m-0 text-lg font-semibold text-base-content"
          >
            Reposting <a
              href="/profile/{data.profile?.username}"
              class="link link-primary link-hover">@{data.profile?.username}</a
            > 's Post
          </h2>

          <button type="button" use:melt={$close} aria-label="close" class="">
            <Icon class="text-sm ri-close-line text-[18px]" />
          </button>
        </div>

        <div class="w- flex flex-col overflow-y-scroll h-full p-6">
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
                on:focus={() => {
                  focused.set(true);
                }}
                on:blur={() => {
                  focused.set(false);
                }}
                bind:value={$content}
                on:input={(e) => {
                  const target = e.currentTarget;

                  target.style.height = "auto";
                  target.style.height = target.scrollHeight + "px";
                }}
                rows="1"
                placeholder="What's up?"
                class="w-full md:max-h-72 max-h-[calc(svh100_-_(7))] resize-none pt-4 pb-3 mt-0.5 text-lg outline-none"
              />

              <div
                class="w-full flex justify-between py-2 gap-4 border-t border-base-300"
              >
                <div class="flex items-center">
                  <button
                    type="button"
                    class="btn cursor-not-allowed no-animation btn-square rounded-full bg-transparent hover:bg-primary/10 text-primary border-none !h-8 !w-8"
                  >
                    <Icon class="ri-image-line text-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex shrink-0 items-center p-6 border-t border-base-300 justify-between"
        >
          <button type="button" use:melt={$close} class="btn"> Cancel </button>

          <div class="flex items-center justify-center gap-3">
            {#if $focused || $content}
              <span class="text-sm">{MAX_LENGTH - $content.length}</span>
              <div
                class={cn(
                  "radial-progress border border-base-300",
                  $content.length > MAX_LENGTH
                    ? "text-error"
                    : $content.length > MAX_LENGTH - 10
                      ? "text-warning"
                      : "text-primary",
                )}
                style="--size:32px;--value:{Math.round(
                  ($content.length / MAX_LENGTH) * 100,
                )};--thickness: 2px;"
              ></div>
            {/if}

            <button
              class="btn px-5 btn-primary rounded-full leading-none"
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
{/if}