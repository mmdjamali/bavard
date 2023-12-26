<script lang="ts">
  import { createDialog, createTabs, melt } from "@melt-ui/svelte";
  import Icon from "../icon.svelte";
  import { cn } from "$lib/utils";

  import { createEventDispatcher } from "svelte";
  import { createFormField } from "$lib/form-field";

  export let defaultValue = "";

  const URL_REGEX =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  let {
    value: seed,
    registerValue: registerSeed,
    error: seedError,
  } = createFormField({ defaultValue: "" });

  let {
    value: url,
    error: urlError,
    registerValue: urlRegister,
  } = createFormField({
    defaultValue: defaultValue,
    patterns: [{ message: "URL is not valid.", validator: URL_REGEX }],
  });

  const dispatch = createEventDispatcher();

  const {
    elements: { trigger, close, content, overlay, portalled, title },
    states: { open },
  } = createDialog();

  const {
    elements: {
      content: tabContent,
      list: tabList,
      root: tabRoot,
      trigger: tabTrigger,
    },
    states: { value },
  } = createTabs({
    defaultValue: "url",
  });

  const tabs = [
    {
      id: "url",
      title: "URL",
    },
    {
      id: "generate",
      title: "Generate",
    },
  ];

  $: image = (() => {
    if ($value == "generate") {
      if ($seed)
        return `https://api.dicebear.com/7.x/lorelei/svg?seed=${$seed}&scale=90`;

      return "";
    }

    if ($value === "url") {
      return $url;
    }

    return "";
  })();
</script>

<button use:melt={$trigger} type="button" class="btn">
  Change <Icon class="ri-pencil-fill text-[16px]" />
</button>

<div class="text-sm text-base-content" use:melt={$portalled}>
  {#if $open}
    <div
      use:melt={$overlay}
      class="fixed inset-0 z-50 backdrop-blur-[2px] bg-base-content/20"
    />

    <div
      class="fixed flex flex-col left-[50%] top-[50%] z-50 w-full h-full sm:h-fit sm:max-h-[85vh] sm:w-[90vw] sm:max-w-[450px] translate-x-[-50%] translate-y-[-50%] sm:rounded-box bg-base-100 shadow-lg"
      use:melt={$content}
    >
      <div
        class="flex shrink-0 items-center p-6 border-b border-base-300 justify-between"
      >
        <h2
          use:melt={$title}
          class="m-0 text-lg font-semibold text-base-content"
        >
          Edit profile image
        </h2>

        <button use:melt={$close} aria-label="close" class="">
          <Icon class="ri-close-line text-[18px]" />
        </button>
      </div>

      <div class="w- flex flex-col overflow-y-scroll h-full p-6">
        <div
          class="w-24 h-24 relative flex-shrink-0 inline-grid aspect-square overflow-hidden rounded-full border border-base-300"
        >
          {#if image}
            <img class="w-full h-full" src={image} alt="profile" />
          {:else}
            <Icon class="ri-user-fill text-5xl text-base-300" />
          {/if}
        </div>

        <div use:melt={$tabRoot} class="mt-4">
          <div use:melt={$tabList} class="tabs tabs-bordered justify-start">
            {#each tabs as tab}
              <button
                use:melt={$tabTrigger(tab.id)}
                type="button"
                class={cn("tab w-fit", tab.id === $value ? "tab-active" : "")}
                >{tab.title}</button
              >
            {/each}
          </div>

          <div use:melt={$tabContent("generate")} class="grow bg-base-100 mt-6">
            <p class="mt-4 leading-normal text-sm text-base-content">
              Based on given seed an avatar will be generated for you, which we
              will use it as your profile picture.
            </p>

            <fieldset class="mt-5 flex w-full flex-col justify-start">
              <label
                class="mb-2 block text-sm leading-none text-base-content"
                for="seed"
              >
                Seed
              </label>
              <input
                name="seed"
                id="seed"
                bind:value={$registerSeed}
                class="input input-bordered min-w-0"
              />
              {#if $seedError && $seed}
                <span class="text-sm text-error mt-2">{$seedError}</span>
              {/if}
            </fieldset>
          </div>

          <div use:melt={$tabContent("url")} class="grow bg-base-100 mt-6">
            <p class="mt-4 leading-normal text-sm text-base-content">
              Enter an image url to field below, this image will gono be used
              for your profile image
            </p>

            <fieldset class="mt-5 flex w-full flex-col justify-start">
              <label
                class="mb-2 block text-sm leading-none text-base-content"
                for="url"
              >
                URL
              </label>
              <input
                name="url"
                id="url"
                bind:value={$urlRegister}
                class="input input-bordered min-w-0"
              />
              {#if $urlError && $url}
                <span class="text-sm text-error mt-2">{$urlError}</span>
              {/if}
            </fieldset>
          </div>
        </div>
      </div>

      <div
        class="flex shrink-0 items-center p-6 border-t border-base-300 justify-between"
      >
        <button use:melt={$close} class="btn"> Cancel </button>
        <button
          class="btn btn-primary"
          on:click={() => {
            open.set(false);
            dispatch("save", {
              value: image,
            });
          }}
        >
          Save changes
        </button>
      </div>
    </div>
  {/if}
</div>
