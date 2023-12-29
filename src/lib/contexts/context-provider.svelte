<script lang="ts">
  import { setCreatedPostsContext } from "./created-posts/created-posts-context";
  import { setDeletedPostsContext } from "./deleted-posts";
  import { setLikedPostsContext } from "./liked-posts";
  import { setProfileContext } from "./profile/profile-context";

  setCreatedPostsContext();
  setDeletedPostsContext();
  setLikedPostsContext();
  setProfileContext();
</script>

<slot />
