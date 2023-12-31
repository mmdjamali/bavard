<script lang="ts">
  import type { ProfileEntity } from "$lib/types/entity";
  import { cn } from "$lib/utils";
  import Icon from "./icon.svelte";

  let className: string | undefined = undefined;
  let profile: null | ProfileEntity | undefined = null;

  export { className as class, profile };
</script>

<div
  class={cn(
    "w-full relative aspect-square rounded-full bg-white overflow-hidden",
    className,
  )}
>
  {#if profile?.picture}
    <img
      class="w-full aspect-square rounded-full object-cover"
      src={profile.picture}
      alt="profile"
    />
  {:else}
    <div
      class="w-full bg-base-100 aspect-square rounded-full inline-grid place-items-center"
    >
      <Icon class="ri-user-fill text-2xl text-base-300" />
    </div>
  {/if}
</div>
