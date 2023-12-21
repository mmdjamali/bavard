<script>
  import Providers from "$lib/components/providers.svelte";
  import ContextProvider from "$lib/contexts/context-provider.svelte";
  import "./styles.css";
</script>

<div class="h-fit min-h-[100svh] relative text-sm text-base-content">
  <Providers>
    <ContextProvider>
      <slot />
    </ContextProvider>
  </Providers>
</div>
