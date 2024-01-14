<script lang="ts">
  import { writable } from "svelte/store";
  import { createDialog, createTabs, melt } from "@melt-ui/svelte";
  import Icon from "../icon.svelte";

  import type { ProfileEntity } from "$lib/types/entity";

  import { cn } from "$lib/utils";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { fetchWithToken } from "$lib/custom-fetch";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import type { ApiResponse } from "$lib/types/api";
  import { getProfileContext } from "$lib/contexts/profile/profile-context";

  export let data: ProfileEntity;

  let name = writable(data?.name ?? "");

  let bio = writable(data?.bio ?? "");

  const {
    elements: { trigger, close, content, overlay, portalled, title },
    states: { open },
  } = createDialog();

  const profile = getProfileContext();

  const queryClient = useQueryClient();

  const updateProfile = createMutation({
    mutationFn: async (body: { name?: string; bio?: string }) => {
      const res: ApiResponse<{ profile: ProfileEntity }> = await fetchWithToken(
        PUBLIC_BACKEND_URL + "/api/profile/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      ).then((res) => res?.json());

      return res;
    },
    onSuccess(res) {
      if (!res.success) return;

      queryClient.setQueryData(["profile", "me"], {
        profile: {
          ...$profile.data?.profile,
          name: res.data.profile.name,
          bio: res.data.profile.bio,
        },
        user: $profile.data?.user,
      });

      queryClient.setQueryData(["profile", res.data.profile.username], {
        profile: res.data.profile,
      });

      open.set(false);
    },
  });
</script>

<button
  use:melt={$trigger}
  class="btn btn-ghost border border-base-300 rounded-full px-5 !h-9"
>
  Edit profile
</button>

<div class="text-sm text-base-content" use:melt={$portalled}>
  {#if $open}
    <div
      use:melt={$overlay}
      class="fixed inset-0 z-50 backdrop-blur-[2px] bg-base-content/20"
    />

    <div
      class="fixed flex flex-col overflow-y-scroll left-[50%] top-[50%] z-50 w-full h-full sm:h-fit sm:max-h-[85vh] sm:w-[90vw] sm:max-w-[600px] translate-x-[-50%] translate-y-[-50%] sm:rounded-box bg-base-100 shadow-lg"
      use:melt={$content}
    >
      <div
        class="flex sticky top-0 z-[50] bg-base-100/75 backdrop-blur-sm px-4 w-full shrink-0 items-center h-14 justify-between"
      >
        <div class="flex w-full items-center h-full">
          <div class="aspect-square flex justify-start h-full items-center">
            <button
              class="btn px-0 rounded-full !h-8 !w-8 aspect-square flex justify-center btn-ghost items-center"
              use:melt={$close}
              aria-label="close"
            >
              <Icon class="ri-close-line text-[21px]" />
            </button>
          </div>

          <h2
            use:melt={$title}
            class="m-0 text-lg whitespace-nowrap font-semibold text-base-content"
          >
            Edit profile
          </h2>
        </div>

        <button
          on:click={() => {
            if ($updateProfile.isPending) return;

            let body = {};

            if ($name && $name !== (data?.name ?? ""))
              body = {
                ...body,
                name: $name,
              };

            if ($bio && $bio !== (data?.bio ?? ""))
              body = {
                ...body,
                bio: $bio,
              };

            $updateProfile.mutate(body);
          }}
          class={cn(
            "btn rounded-full btn-neutral min-h-0 !h-[36px]",
            $updateProfile.isPending ? "opacity-75" : "",
          )}
        >
          Save
          {#if $updateProfile.isPending}
            <span class="loading loading-spinner loading-xs" />
          {/if}
        </button>
      </div>

      <div
        class="w-full flex flex-col items-center pb-16 h-full relative px-0.5"
      >
        <div
          class="w-full relative shrink-0 grid place-items-center bg-base-300 aspect-[3/1]"
        >
          <div class="flex items-center z-[1] justify-center gap-5">
            <button
              class="bg-base-content/40 cursor-not-allowed hover:shadow-[0px_0px_0px] transition-colors w-11 h-11 rounded-full"
            >
              <Icon
                class="ri-camera-line text-[21px] text-base-100 font-thin"
              />
            </button>

            <button
              class="bg-base-content/40 cursor-not-allowed transition-colors w-11 h-11 rounded-full"
            >
              <Icon class="ri-close-line text-[21px] text-base-100 font-thin" />
            </button>
          </div>
        </div>

        <div class="w-full flex items-center relative px-4">
          <div
            class="w-[25%] relative min-w-[48px] bg-base-100 grid place-items-center aspect-square rounded-full mt-[-12.5%] border-4 border-base-100"
          >
            {#if data?.picture}
              <img
                alt=""
                class="w-full aspect-square rounded-full object-cover"
                src={data?.picture}
              />
            {:else}
              <div
                class="w-full aspect-square rounded-full inline-grid place-items-center"
              ></div>
            {/if}
            <button
              class=" absolute bg-base-content/40 hover:bg-base-content/30 transition-colors w-11 h-11 rounded-full"
            >
              <Icon
                class="ri-camera-line text-[21px] text-base-100 font-thin"
              />
            </button>
          </div>
        </div>

        <div class="flex flex-col w-full h-full relative px-4 z-[50]">
          <fieldset class="mt-5 flex w-full flex-col justify-start">
            <div class="flex items-center mb-1 justify-between">
              <label
                class="block text-sm leading-none text-base-content"
                for="name"
              >
                Name
              </label>

              <span class="text-xs">
                {$name.length}/30
              </span>
            </div>
            <input
              bind:value={$name}
              name="name"
              id="name"
              class="input !outline-none hover:border-base-content/40 focus:border-base-content/75 transition-colors input-bordered min-w-0"
            />
          </fieldset>

          <fieldset class="mt-5 flex w-full flex-col justify-start">
            <div class="flex items-center mb-1 justify-between">
              <label
                class="block text-sm leading-none text-base-content"
                for="name"
              >
                Bio
              </label>

              <span class="text-xs">{$bio.length}/90</span>
            </div>
            <textarea
              name="name"
              id="name"
              rows="2"
              bind:value={$bio}
              class="textarea textarea-bordered min-w-0"
            />
          </fieldset>
        </div>
      </div>
    </div>
  {/if}
</div>
