<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { fetchWithToken } from "$lib/custom-fetch";
  import { createQuery } from "@tanstack/svelte-query";

  import type { ApiResponse } from "$lib/types/api";

  const profile = createQuery({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      const res: ApiResponse<{ profile: null | { id: string } }> =
        await fetchWithToken(PUBLIC_BACKEND_URL + "/api/auth/me").then((res) =>
          res?.json(),
        );

      if (!res?.success) return null;

      return res.data.profile;
    },
    refetchOnWindowFocus: false,
  });
</script>

{#if $profile.isLoading}
  <div class="grid place-items-center w-full h-full">
    <span class="loading loading-dots ease-emil text-base-content" />
  </div>
{:else if $profile.data?.id}
  <slot />
{:else if $profile.isError}
  <div class="grid place-items-center w-full h-full">
    <span class="text-error text-sm">{$profile.error}</span>
  </div>
{/if}
