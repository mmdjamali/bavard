<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { fetchWithToken } from "$lib/custom-fetch";
  import type { ApiResponse } from "$lib/types/api";
  import Icon from "./icon.svelte";
  import { writable } from "svelte/store";
  import { cn } from "$lib/utils";
  import type { PostEntity } from "$lib/types/entity";
  import { getCreatedPostsContext } from "$lib/contexts/created-posts/created-posts-context";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import { fly } from "svelte/transition";

  const MAX_LENGTH = 300;

  const profile = getProfileContext();

  const content = writable("");
  const focused = writable(false);
  const createdPosts = getCreatedPostsContext();

  let loading = false;

  const handleSubmit = async () => {
    try {
      if (loading) return;

      if (!$content || $content.length > MAX_LENGTH) {
        return;
      }

      loading = true;

      const res: ApiResponse<{ post: PostEntity }> = await fetchWithToken(
        PUBLIC_BACKEND_URL + "/api/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: $content,
          }),
        },
      ).then((res) => res?.json());

      if (!res?.success) throw new Error("Failed");

      createdPosts.update((prev) => {
        const clone = structuredClone(prev);
        clone.push(res.data.post);
        return clone;
      });

      content.set("");

      loading = false;
    } catch (err) {
      loading = false;
    }
  };
</script>

{#if $profile.data?.profile?.id}
  <form
    on:submit={handleSubmit}
    class="hidden sm:grid grid-cols-[40px_1fr] bg-base-100 gap-3 px-4 border-b border-base-300"
  >
    <div class="w-full h-full py-3 shrink-0">
      {#if $profile.data?.profile.picture}
        <img
          class="w-full aspect-square rounded-full object-cover"
          src={$profile.data.profile.picture}
          alt="profile"
        />
      {:else}
        <div
          class="w-full aspect-square rounded-full inline-grid place-items-center"
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
          if ($content) return;
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
        class="w-full max-h-[50svh] bg-base-100 resize-none pt-4 pb-3 mt-0.5 text-lg outline-none"
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

        <div class="flex items-center gap-2">
          {#if $focused}
            <span
              transition:fly={{ duration: 150, x: -15 }}
              class="text-sm text-opacity-75"
            >
              {MAX_LENGTH - $content.length}
            </span>
            <div
              transition:fly={{ duration: 150, x: -15 }}
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
            disabled={loading}
            type="submit"
            class="btn !px-4 !h-9 rounded-full btn-primary"
          >
            Post
            {#if loading}
              <Icon class="loading loading-dots loading-xs" />
            {/if}
          </button>
        </div>
      </div>
    </div>
  </form>
{/if}
