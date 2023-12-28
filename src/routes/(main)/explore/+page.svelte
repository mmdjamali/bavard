<script lang="ts">
  import Icon from "$lib/components/icon.svelte";

  import Navbar from "$lib/components/layout/navbar.svelte";
  import WithProfile from "$lib/components/with-profile.svelte";
</script>

<Navbar />

<section
  class="border-x relative max-w-[600px] mx-auto h-fit min-h-[100svh] w-full border-base-300"
>
  <WithProfile>
    <header
      class="sticky flex !min-h-0 h-14 p-0 top-0 w-full navbar bg-base-100/50 backdrop-blur-sm"
    >
      <div class="flex h-full w-full py-1.5 px-5 text-[16px]">
        <div
          class="w-full relative group focus-within:bg-base-100 focus-within:border-primary transition-colors border border-base-200 h-full flex items-center gap-4 px-5 rounded-full bg-base-200"
        >
          <Icon
            class="ri-search-line shrink-0 text-[21px] text-base-content/75 group-focus-within:text-primary"
          />
          <input
            placeholder="Search Bavard"
            class="bg-transparent w-full outline-none caret-primary"
          />
        </div>
      </div>

      <div class="aspect-square shrink-0 h-full inline-grid place-items-center">
        <button
          class="btn btn-square rounded-full hover:bg-base-300 bg-transparent border-none"
        >
          <Icon class="ri-settings-2-line text-[18px]" />
        </button>
      </div>
    </header>

    <div class="w-full text-center py-3 px-4">- End of feed -</div>
    <div class="w-full h-screen text-center py-3 px-4" />
  </WithProfile>
</section>
