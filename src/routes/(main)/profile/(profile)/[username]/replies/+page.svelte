<script lang="ts">
  import { page } from "$app/stores";

  import ProfileReplies from "$lib/components/feed/profile-replies.svelte";
</script>

<ProfileReplies data={{ username: $page.params.username }} />

<div class="w-full text-center py-3 px-4">- End of feed -</div>
