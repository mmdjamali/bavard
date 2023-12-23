<script lang="ts">
  import type { PostEntity } from "$lib/types/entity";

  export let data: PostEntity;
</script>

{#if data?.parent?.profile?.username}
  <div class="text-base-content/75">
    replying to <a
      href="/profile/{data?.parent.profile.username}"
      class="link link-hover link-primary">@{data?.parent.profile.username}</a
    >
  </div>
{/if}
