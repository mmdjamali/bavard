<script>
  import Providers from "$lib/components/providers.svelte";
  import "./styles.css";
</script>

<div class="h-fit min-h-[100svh] relative text-sm text-base-content">
  <Providers>
    <slot />
  </Providers>
</div>
