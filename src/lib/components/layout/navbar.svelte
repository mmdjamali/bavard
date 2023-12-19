<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { fetchWithToken } from "$lib/custom-fetch";
  import type { ApiResponse } from "$lib/types/api";
  import type { NavbarRouteType } from "$lib/types/common";
  import { createQuery } from "@tanstack/svelte-query";
  import Icon from "../icon.svelte";
  import { cn } from "$lib/utils";
  import { page } from "$app/stores";
  import WithAuth from "../with-auth.svelte";
  import type { ProfileEntity } from "$lib/types/entity";

  const profile = createQuery({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      const res: ApiResponse<{
        profile: null | ProfileEntity;
      }> = await fetchWithToken(PUBLIC_BACKEND_URL + "/api/profile/me").then(
        (res) => res?.json(),
      );

      if (!res?.success) return null;

      return res.data?.profile ?? null;
    },
    refetchOnWindowFocus: false,
  });

  $: routes = [
    {
      path: "/",
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
      path: "/profile/" + $profile.data?.username,
      title: "Profile",
      disabled: !$profile.data?.id,
      icon: "ri-account-circle-line",
      iconFill: "ri-account-circle-fill",
    },
    {
      path: "/settings",
      title: "Settings",
      disabled: !$profile.data?.id,
      icon: "ri-settings-line",
      iconFill: "ri-settings-fill",
    },
  ] as NavbarRouteType[];
</script>

<div
  class="sticky h-screen max-h-screen hidden top-0 ml-auto md:flex flex-col justify-end md:border-r md:border-base-300 lg:border-none"
>
  <WithAuth>
    {#if !$profile.isLoading}
      <nav class="h-full lg:w-64 gap-2 flex flex-col ml-auto py-4 px-4">
        {#if $profile.isLoading || $profile.data?.id}
          <div class="flex items-center mb-2 lg:px-4">
            {#if $profile.isLoading}
              <div
                class="w-12 h-12 lg:w-14 lg:h-14 inline-grid bg-base-content/50 rounded-full object-cover animate-pulse ease-emil"
              />
            {:else}
              <img
                alt=""
                class="w-12 h-12 lg:w-14 lg:h-14 border border-base-300 aspect-square rounded-full object-cover"
                src={$profile.data?.picture}
              />
            {/if}
          </div>
        {/if}

        {#each routes as route (route.title)}
          {#if !route.disabled}
            <a
              href={route.path}
              class="lg:px-4 gap-2.5 h-12 w-12 lg:w-full hover:bg-base-200 rounded-btn text-lg flex justify-center lg:justify-start items-center bg-transparent"
            >
              <Icon
                class={cn(
                  "text-[28px]",
                  $page.url.pathname === route.path
                    ? route.iconFill
                    : route.icon,
                )}
              />
              <span class="hidden lg:inline">
                {route.title}
              </span>
            </a>
          {/if}
        {/each}

        <button class="btn !h-12 w-12 lg:w-full btn-primary">
          <span class="hidden lg:inline">New post</span>
          <Icon class="ri-add-line text-[21px]" />
        </button>
      </nav>
    {/if}
  </WithAuth>
</div>
