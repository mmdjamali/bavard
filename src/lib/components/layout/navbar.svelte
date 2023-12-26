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
      icon: "ri-home-6-line",
      iconFill: "ri-home-6-fill",
    },
    {
      path: "/search",
      title: "Search",
      disabled: false,
      icon: "ri-search-line",
      iconFill: "ri-search-fill",
    },
    {
      path: "/notification",
      title: "Notifications",
      disabled: false,
      icon: "ri-notification-3-line",
      iconFill: "ri-notification-3-fill",
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

      <button class="btn rounded-full !h-12 w-12 lg:w-full btn-primary">
        <span class="hidden lg:inline text-base capitalize">post</span>
        <span class="relative">
          <Icon
            class="lg:hidden ri-quill-pen-line translate-x-1 text-[26px] font-normal"
          />
          <Icon
            class="lg:hidden absolute top-0 font-bold left-0 -translate-x-0.5 -translate-y-0.5 ri-add-fill text-[16px]"
          />
        </span>
      </button>
    </nav>
  </div>

  <nav
    class="fixed bottom-0 bg-base-100 px-4 border-t border-base-300 z-50 sm:hidden navbar h-14 min-h-0 flex items-center justify-between"
  >
    {#each routes as route (route.title)}
      {#if !route.disabled}
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
  </nav>
{/if}
