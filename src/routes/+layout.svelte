<script>
  import Loader from "$lib/components/loader.svelte";
  import Providers from "$lib/components/providers.svelte";
  import ContextProvider from "$lib/contexts/context-provider.svelte";
  import "@fontsource-variable/inter";

  import "./styles.css";
</script>

<Loader>
  <div class="h-fit min-h-[100svh] relative text-sm text-base-content">
    <Providers>
      <ContextProvider>
        <slot />
      </ContextProvider>
    </Providers>
  </div>
</Loader>
