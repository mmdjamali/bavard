<script lang="ts">
  import Icon from "$lib/components/icon.svelte";

  import Navbar from "$lib/components/layout/navbar.svelte";
  import WithProfile from "$lib/components/with-profile.svelte";
</script>

<Navbar />

<section
  class="border-x flex flex-col relative max-w-[600px] mx-auto h-fit min-h-[100svh] w-full border-base-300"
>
  <WithProfile>
    <header
      class="sticky px-4 flex z-50 !min-h-0 h-14 p-0 top-0 w-full navbar bg-base-100/75 backdrop-blur-sm border-b border-base-300"
    >
      <button
        on:click={() => {
          history.back();
        }}
        class="h-full aspect-square"
      >
        <Icon class="ri-arrow-left-line text-[21px]" />
      </button>
      <div class="flex items-start justify-center flex-col w-full">
        <span class="text-xl text-start font-bold"> Bookmarks </span>
      </div>
    </header>

    <div class="navbar invisible sm:hidden"></div>
  </WithProfile>
</section>
