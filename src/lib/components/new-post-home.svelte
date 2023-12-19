<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { fetchWithToken } from "$lib/custom-fetch";
  import type { ApiResponse } from "$lib/types/api";
  import { createQuery } from "@tanstack/svelte-query";
  import Icon from "./icon.svelte";
  import { writable } from "svelte/store";
  import { cn } from "$lib/utils";
  import type { ProfileEntity } from "$lib/types/entity";

  const MAX_LENGTH = 300;

  const profile = createQuery({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      const res: ApiResponse<{
        profile: null | ProfileEntity;
      }> = await fetchWithToken(PUBLIC_BACKEND_URL + "/api/profile/me").then(
        (res) => res?.json(),
      );

      if (!res?.success) return null;

      return res.data?.profile ?? null;
    },
    refetchOnWindowFocus: false,
  });

  const content = writable("");

  let loading = false;

  const handleSubmit = async () => {
    try {
      if (!$content || $content.length > MAX_LENGTH) {
        return;
      }

      loading = true;

      const res: ApiResponse<null> = await fetchWithToken(
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

      loading = false;
    } catch (err) {
      loading = false;
    }
  };
</script>

<form
  on:submit={handleSubmit}
  class="grid grid-cols-[40px_1fr] gap-3 px-4 border-b border-base-300"
>
  <div class="w-full h-full py-3 shrink-0">
    <img
      src={$profile.data?.picture}
      alt=""
      class="w-full rounded-full object-cover border border-base-300"
    />
  </div>

  <div class="flex flex-col w-full">
    <textarea
      bind:value={$content}
      on:input={(e) => {
        const target = e.currentTarget;

        target.style.height = "auto";
        target.style.height = target.scrollHeight + "px";
      }}
      rows="1"
      placeholder="What's up?"
      class="w-full max-h-[50svh] resize-none pt-4 pb-3 mt-0.5 text-lg outline-none"
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
        <div
          class={cn(
            "radial-progress",
            $content.length > MAX_LENGTH
              ? "text-error"
              : $content.length > MAX_LENGTH - 10
                ? "text-warning"
                : "",
          )}
          style="--size:2rem;--value:{(
            ($content.length / MAX_LENGTH) *
            100
          ).toFixed()};--thickness: 2px;"
        >
          <span class="text-[10px]">{MAX_LENGTH - $content.length}</span>
        </div>

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
