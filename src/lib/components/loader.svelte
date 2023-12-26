<script>
  import { onMount } from "svelte";

  let loading = true;

  onMount(() => {
    loading = false;
  });
</script>

{#if loading}
  <div class="w-full grid place-items-center bg-base-100 h-[100svh]">
    <img
      alt="logo"
      src="/logo.svg"
      class="w-16 h-16 duration-300 ease-emil animate-in slide-in-from-bottom-full"
    />
  </div>
{:else}
  <slot />
{/if}
