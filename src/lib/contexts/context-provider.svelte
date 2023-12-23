<script lang="ts">
  import { setCreatedPostsContext } from "./created-posts/created-posts-context";
  import { setDeletedPostsContext } from "./deleted-posts";
  import { setProfileContext } from "./profile/profile-context";

  setCreatedPostsContext();
  setDeletedPostsContext();
  setProfileContext();
</script>

<slot />
