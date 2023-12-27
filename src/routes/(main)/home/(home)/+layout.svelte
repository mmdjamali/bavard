<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "$lib/components/icon.svelte";

  import Navbar from "$lib/components/layout/navbar.svelte";
  import WithProfile from "$lib/components/with-profile.svelte";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import { cn } from "$lib/utils";

  const profile = getProfileContext();

  $: tabs = [
    {
      disabled: false,
      title: "For you",
      path: "/home",
    },
    {
      disabled: !$profile.data?.profile?.id,
      title: "Followed",
      path: "/home/followed",
    },
  ] satisfies { title: string; disabled: boolean; path: string }[];
</script>

<Navbar />

<section
  class="border-x flex flex-col relative max-w-[600px] mx-auto h-fit min-h-[100svh] w-full border-base-300"
>
  <WithProfile>
    <header
      class="sticky flex flex-col z-50 p-0 top-0 w-full bg-base-100/50 backdrop-blur-sm border-b border-base-300"
    >
      <!-- <div class="sm:hidden px-4 py-4 flex items-center justify-between">
        <img
          src={$profile.data?.profile?.picture}
          alt="pfp"
          class="w-8 h-8 aspect-square rounded-full object-center object-cover"
        />

        <img
          src="/logo.svg"
          alt="pfp"
          class="w-8 h-8 aspect-square rounded-full object-center object-cover"
        />
      </div> -->
      <div class="flex w-full h-14">
        <div class="flex h-full w-full">
          {#each tabs as tab (tab.title)}
            <a
              href={tab.path}
              class={cn(
                "w-full relative h-full transition-colors duration-300 ease-emil inline-grid place-items-center hover:bg-base-200/50",
                $page.url.pathname === tab.path
                  ? "font-semibold "
                  : "font-medium",
              )}
            >
              {tab.title}
              {#if $page.url.pathname === tab.path}
                <span
                  class="absolute w-[50%] h-1 bg-primary bottom-0 mx-auto"
                />
              {/if}
            </a>
          {/each}
        </div>

        <div
          class="aspect-square shrink-0 h-full inline-grid place-items-center"
        >
          <button
            class="btn btn-square rounded-full shadow-none hover:bg-base-300 bg-transparent border-none"
          >
            <Icon class="ri-equalizer-2-line text-[18px]" />
          </button>
        </div>
      </div>
    </header>

    <slot />

    <div class="w-full text-center py-3 px-4">- End of feed -</div>

    <div class="navbar invisible sm:hidden"></div>
  </WithProfile>
</section>
