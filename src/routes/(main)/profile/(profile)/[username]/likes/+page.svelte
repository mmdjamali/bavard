<script lang="ts">
  import { page } from "$app/stores";
  import ProfileLikes from "$lib/components/feed/profile-likes.svelte";
</script>

<ProfileLikes data={{ username: $page.params.username }} />

<div class="w-full text-center py-3 px-4">- End of feed -</div>
