<script lang="ts">
  import type { NavbarRouteType } from "$lib/types/common";
  import Icon from "../icon.svelte";
  import { cn } from "$lib/utils";
  import { page } from "$app/stores";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";

  const profile = getProfileContext();

  $: routes = [
    {
      path: "/home",
      title: "Home",
      disabled: false,
      icon: "ri-home-5-line",
      iconFill: "ri-home-5-fill",
    },
    {
      path: "/search",
      title: "Search",
      disabled: false,
      icon: "ri-search-line",
      iconFill: "ri-search-fill",
    },
    {
      path: "/profile/" + $profile.data?.profile?.username,
      title: "Profile",
      disabled: !$profile.data?.profile?.id,
      icon: "ri-account-circle-line",
      iconFill: "ri-account-circle-fill",
    },
    {
      path: "/settings",
      title: "Settings",
      disabled: !$profile.data?.profile?.id,
      icon: "ri-settings-line",
      iconFill: "ri-settings-fill",
    },
  ] as NavbarRouteType[];

  const isRoute = (path: string) => {
    return $page.url.pathname.startsWith(path);
  };
</script>

<div
  class="sticky h-screen max-h-screen hidden top-0 ml-auto sm:flex flex-col justify-end sm:border-r sm:border-base-300 lg:border-none"
>
  <nav class="h-full lg:w-64 gap-2 flex flex-col ml-auto py-4 px-4">
    <div class="flex items-center mb-2 lg:px-4">
      {#if $profile.data?.profile?.id}
        {#if $profile.data?.profile?.picture}
          <img
            alt=""
            class="w-12 h-12 lg:w-14 lg:h-14 border border-base-300 aspect-square rounded-full object-cover"
            src={$profile.data?.profile.picture}
          />
        {:else}
          <div
            class=" h-12 w-12 aspect-square rounded-full inline-grid place-items-center border border-base-300"
          >
            <Icon class="ri-user-fill text-3xl text-base-300" />
          </div>
        {/if}
      {:else}
        <img
          alt=""
          class="w-12 h-12 lg:w-14 lg:h-14 aspect-square rounded-full object-cover"
          src={"/logo.svg"}
        />
      {/if}
    </div>

    {#each routes as route (route.title)}
      {#if !route.disabled}
        <a
          href={route.path}
          class="lg:px-4 gap-2.5 h-12 w-12 lg:w-full hover:bg-base-200 rounded-btn text-lg flex justify-center lg:justify-start items-center bg-transparent"
        >
          <Icon
            class={cn(
              "text-[28px]",
              isRoute(route.path) ? route.iconFill : route.icon,
            )}
          />
          <span
            class={cn(
              "hidden lg:inline",
              isRoute(route.path) ? "font-semibold" : "",
            )}
          >
            {route.title}
          </span>
        </a>
      {/if}
    {/each}

    <button class="btn mt-4 !h-12 w-12 lg:w-full btn-primary">
      <span class="hidden lg:inline text-lg">POST</span>
      <Icon class="lg:hidden ri-add-line text-[28px]" />
    </button>
  </nav>
</div>

<nav
  class="fixed bottom-0 bg-base-100 px-8 shadow-[0px_-4px_30px] shadow-base-content/10 z-50 sm:hidden navbar flex items-center justify-between"
>
  {#each routes as route (route.title)}
    {#if !route.disabled}
      <a
        href={route.path}
        class="gap-2.5 h-12 w-12 hover:bg-base-200 rounded-btn text-lg flex justify-center items-center bg-transparent"
      >
        <Icon
          class={cn(
            "text-[28px]",
            isRoute(route.path) ? route.iconFill : route.icon,
          )}
        />
        <span
          class={cn(
            "hidden lg:inline",
            isRoute(route.path) ? "font-semibold" : "",
          )}
        >
          {route.title}
        </span>
      </a>
    {/if}
  {/each}
</nav>
