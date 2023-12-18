<script>
  import Providers from "$lib/components/providers.svelte";
  import "./styles.css";
</script>

<div class="app h-full">
  <main class="relative w-full h-full text-sm text-base-content">
    <Providers>
      <slot />
    </Providers>
  </main>
</div>
