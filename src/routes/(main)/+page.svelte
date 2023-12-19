<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import Icon from "$lib/components/icon.svelte";
  import Navbar from "$lib/components/layout/navbar.svelte";
  import NewPostHome from "$lib/components/new-post-home.svelte";
  import WithAuth from "$lib/components/with-auth.svelte";
  import { fetchWithToken } from "$lib/custom-fetch";
  import type { ApiResponse } from "$lib/types/api";
  import { timeFormater } from "$lib/utils";
  import { createQuery } from "@tanstack/svelte-query";

  const profile = createQuery({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      const res: ApiResponse<{
        profile: null | { id: string; picture: string };
      }> = await fetchWithToken(PUBLIC_BACKEND_URL + "/api/profile/me").then(
        (res) => res?.json(),
      );

      if (!res?.success) return null;

      return res.data?.profile ?? null;
    },
    refetchOnWindowFocus: false,
  });
</script>

<svelte:head>
  <title>Home | Percent</title>
  <meta name="description" content="Percent | " />
</svelte:head>

<Navbar />
<section
  class="border-x relative max-w-[600px] mx-auto h-fit min-h-[100svh] w-full border-base-300"
>
  <WithAuth>
    <header
      class="sticky flex !min-h-0 h-14 p-0 top-0 w-full navbar bg-base-100/50 backdrop-blur-sm border-b border-base-300"
    >
      <div class="flex h-full w-full text-[16px]">
        <button
          class="w-full font-medium h-full transition-colors inline-grid place-items-center hover:bg-base-200"
        >
          For you
        </button>
        <button
          class="w-full font-medium h-full transition-colors inline-grid place-items-center hover:bg-base-200"
        >
          Following
        </button>
      </div>

      <div class="aspect-square shrink-0 h-full inline-grid place-items-center">
        <button
          class="btn btn-square rounded-full hover:bg-base-300 bg-transparent border-none"
        >
          <Icon class="ri-settings-2-line text-[18px]" />
        </button>
      </div>
    </header>

    <NewPostHome />

    <div class="grid grid-cols-[40px_1fr] gap-3 px-4 border-b border-base-300">
      <div class="w-full h-full py-3 shrink-0">
        <img
          src={$profile.data?.picture}
          alt=""
          class="w-full rounded-full object-cover border border-base-300"
        />
      </div>

      <div class="flex flex-col w-full">
        <div
          class="flex w-full justify-between text-sm text-[15px] pt-3 mt-0.5"
        >
          <span class="font-semibold tracking-[1px]">MmD</span>

          <span class="text-base-content text-opacity-75 px-2"
            >{timeFormater(new Date(2023, 8))}</span
          >
        </div>

        <div class="text-[15px]">hello bavard :D</div>

        <div class="w-full relative flex justify-between py-2 gap-4">
          <div class="flex items-center justify-between w-full relative">
            <button
              type="button"
              class="btn text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-rose-500/10 hover:text-rose-500 border-none !h-8 !w-8"
            >
              <Icon class="ri-heart-line text-[18px]" />
              <span class="text-xs absolute left-[calc(100%_-_4px)] my-auto">
                10M
              </span>
            </button>

            <button
              type="button"
              class="btn text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-sky-500/10 hover:text-sky-500 border-none !h-8 !w-8"
            >
              <Icon class="ri-chat-1-line text-[18px]" />
              <span class="text-xs absolute left-[calc(100%_-_4px)] my-auto">
                64
              </span>
            </button>

            <button
              type="button"
              class="btn text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-green-500/10 hover:text-green-500 border-none !h-8 !w-8"
            >
              <Icon class="ri-loop-right-line text-[18px]" />
              <span class="text-xs absolute left-[calc(100%_-_4px)] my-auto">
                10M
              </span>
            </button>

            <button
              type="button"
              class="btn text-base-content/75 hover:text-base-content relative btn-square rounded-full bg-transparent hover:bg-base-200 border-none !h-8 !w-8"
            >
              <Icon class="ri-more-fill text-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full text-center py-3 px-4">- End of feed -</div>
  </WithAuth>
</section>
