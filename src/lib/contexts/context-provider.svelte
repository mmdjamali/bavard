<script lang="ts">
  import { setCreatedPostsContext } from "./created-posts/created-posts-context";
  import { setProfileContext } from "./profile/profile-context";

  setCreatedPostsContext();
  setProfileContext();
</script>

<slot />
