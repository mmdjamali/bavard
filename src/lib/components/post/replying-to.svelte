<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import type { ApiResponse } from "$lib/types/api";
  import type {
    PostEntity,
    PostWithParent,
    ProfileEntity,
  } from "$lib/types/entity";
  import { createQuery } from "@tanstack/svelte-query";

  export let data: PostEntity & PostWithParent;

  const parentAuthor = createQuery<ProfileEntity | null>({
    queryKey: ["profile", data.parent?.created_by],
    queryFn: async () => {
      const res: ApiResponse<{
        profile: null | ProfileEntity;
      }> = await fetch(
        PUBLIC_BACKEND_URL + "/api/profile/id/" + data.parent?.created_by,
      ).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data?.profile ?? null;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 10,
  });
</script>

{#if $parentAuthor.data?.username}
  <div class="text-base-content/75">
    replying to <a
      href="/profile/{$parentAuthor.data?.username}"
      class="link link-hover link-primary">@{$parentAuthor.data?.username}</a
    >
  </div>
{/if}
