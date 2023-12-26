<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import ProfilePosts from "$lib/components/feed/profile-posts.svelte";

  export let data: PageData;

  $: tabs = [
    {
      path: `/profile/${data.username}`,
      title: "posts",
    },
    {
      path: `/profile/${data.username}/likes`,
      title: "likes",
    },
    {
      path: `/profile/${data.username}/replies`,
      title: "replies",
    },
  ] satisfies { path: string; title: string }[];
</script>

<ProfilePosts data={{ username: $page.params.username }} />

<div class="w-full text-center py-3 px-4">- End of feed -</div>
