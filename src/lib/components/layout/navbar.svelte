<script lang="ts">
  import type { NavbarRouteType } from "$lib/types/common";
  import Icon from "../icon.svelte";
  import { cn } from "$lib/utils";
  import { page } from "$app/stores";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";
  import NewPostButton from "../new-post-button.svelte";
  import NavbarMoreMobile from "./navbar-more-mobile.svelte";

  const profile = getProfileContext();

  $: routes = [
    {
      path: "/home",
      title: "Home",
      mobile: true,
      disabled: false,
      icon: "ri-home-6-line",
      iconFill: "ri-home-6-fill",
    },
    {
      path: "/explore",
      title: "Explore",
      mobile: true,
      disabled: false,
      icon: "ri-search-line",
      iconFill: "ri-search-fill",
    },
    {
      path: "/notification",
      title: "Notifications",
      mobile: true,
      disabled: !$profile.data?.profile?.id,
      icon: "ri-notification-3-line",
      iconFill: "ri-notification-3-fill",
    },
    {
      path: "/bookmarks",
      title: "Bookmarks",
      mobile: true,
      disabled: !$profile.data?.profile?.id,
      icon: "ri-bookmark-line",
      iconFill: "ri-bookmark-fill",
    },
    {
      path: "/profile/" + $profile.data?.profile?.username,
      title: "Profile",
      mobile: false,
      disabled: !$profile.data?.profile?.id,
      icon: "ri-account-circle-line",
      iconFill: "ri-account-circle-fill",
    },
    {
      path: "/settings",
      title: "Settings",
      mobile: false,
      disabled: !$profile.data?.profile?.id,
      icon: "ri-settings-3-line",
      iconFill: "ri-settings-3-fill",
    },
  ] as NavbarRouteType[];

  const isRoute = (path: string) => {
    return $page.url.pathname.startsWith(path);
  };
</script>

{#if $profile.isLoading}
  <div
    class="sticky h-[100svh] max-h-screen hidden top-0 sm:grid flex-col sm:border-r sm:border-base-300 lg:border-none w-full place-items-center"
  >
    <span class="loading loading-dots" />
  </div>
{:else}
  <div
    class="sticky h-screen max-h-[100svh] hidden top-0 ml-auto sm:flex flex-col justify-end sm:border-base-300"
  >
    <nav class="h-full lg:w-64 gap-2 flex flex-col ml-auto py-4 px-4">
      <div class="flex items-center max-lg:justify-center lg:px-4">
        <img
          alt=""
          class="w-8 h-8 aspect-square rounded-full object-cover"
          src={"/logo.svg"}
        />
      </div>

      {#each routes as route (route.title)}
        {#if !route.disabled}
          <a
            href={route.path}
            class="lg:px-4 gap-4 h-12 w-12 lg:w-full hover:bg-base-200 rounded-btn text-lg flex justify-center lg:justify-start items-center bg-transparent"
          >
            <Icon
              class={cn(
                "text-[26px]",
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

      {#if $profile.data?.profile?.id}
        <NewPostButton />
      {/if}
    </nav>
  </div>

  {#if $profile.data?.profile?.id}
    <div
      class="fixed pointer-events-none w-full flex flex-col bottom-0 z-50 sm:hidden"
    >
      <div class="pointer-events-auto mb-3 ml-3">
        <NewPostButton />
      </div>
      <nav
        class=" pointer-events-auto bg-base-100 px-4 border-t border-base-300 navbar h-14 min-h-0 flex items-center justify-between"
      >
        {#each routes as route (route.title)}
          {#if !route.disabled && route.mobile}
            <a
              href={route.path}
              class="gap-2.5 h-10 w-10 hover:bg-base-200 rounded-btn text-lg flex justify-center items-center bg-transparent"
            >
              <Icon
                class={cn(
                  "text-[26px]",
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

        <NavbarMoreMobile />
      </nav>
    </div>
  {/if}
{/if}
