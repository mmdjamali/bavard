<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import Icon from "$lib/components/icon.svelte";
  import ProfileDialogForm from "$lib/components/profile/profile-dialog-form.svelte";
  import { fetchWithToken } from "$lib/custom-fetch";
  import { createFormField } from "$lib/form-field";
  import { createUsernameStore } from "$lib/stores/username-store";
  import type { ApiResponse } from "$lib/types/api";
  import { cn } from "$lib/utils";
  import { writable } from "svelte/store";

  const image = writable("");

  const {
    error: usernameError,
    loading: usernameLoading,
    registerValue: registerUsername,
    value: username,
    exists: usernameExists,
  } = createUsernameStore({});

  const {
    error: nameError,
    registerValue: registerName,
    value: name,
  } = createFormField({
    patterns: [
      {
        message: "Please don't leave this field empty",
        validator: /./,
      },
      {
        message: "Maximum name length is 50",
        validator: /^.{1,50}$/,
      },
    ],
  });

  const onProfileSave = (e: CustomEvent<{ value: string }>) => {
    image.set(e.detail.value);
  };

  let loading = false;

  const handleSubmit = async () => {
    if (loading) return;

    if ($nameError || $usernameError || $usernameExists || $usernameLoading)
      return;

    if (!$username || !$name) return;

    try {
      loading = true;

      const res: ApiResponse<null> = await fetchWithToken(
        PUBLIC_BACKEND_URL + "/api/profile",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: $name,
            username: $username,
            picture: $image ? $image : undefined,
          }),
        },
      ).then((res) => res?.json());

      if (!res?.success) {
        throw "";
      }

      loading = false;
    } catch (err) {
      loading = false;
    }
  };
</script>

<div class="relative grid-cols-1 grid place-items-center h-full">
  <div class="sm:p-12 p-8 w-full h-full relative grid place-items-center">
    <form
      on:submit|preventDefault={handleSubmit}
      class="w-full relative max-w-sm mx-auto"
    >
      <div class="flex items-center gap-4 w-full justify-start">
        <div
          class="w-24 relative flex-shrink-0 inline-grid aspect-square overflow-hidden rounded-full border border-base-300"
        >
          {#if $image}
            <img class="w-full h-full" src={$image} alt="profile" />
          {:else}
            <Icon class="ri-user-fill text-5xl text-base-300" />
          {/if}
        </div>

        <ProfileDialogForm defaultValue={$image} on:save={onProfileSave} />
      </div>

      <div>
        <input
          bind:value={$registerName}
          name="name"
          placeholder="David Martinez"
          class="input mt-6 w-full input-bordered focus:outline-none focus:border-primary transition-colors"
        />
        {#if $nameError}
          <span class="text-sm text-error mt-2">{$nameError}</span>
        {/if}
      </div>

      <div class="relative">
        <div class="relative w-full mt-6">
          <input
            bind:value={$registerUsername}
            name="username"
            placeholder="martinezdavid"
            class={cn(
              "input w-full input-bordered focus:outline-none focus:border-primary transition-colors",
              $username && !$usernameError && !$usernameLoading
                ? $usernameExists
                  ? "input-error"
                  : "input-success"
                : "",
            )}
          />
          <span class="absolute right-3 top-[50%] -translate-y-[50%]">
            {#if $usernameLoading}
              <span class="loading loading-spinner" />
            {:else if $usernameError}
              <Icon class="ri-close-line text-error text-[18px]" />
            {:else if $username && !$usernameExists}
              <Icon class="ri-check-line text-success text-[18px]" />
            {/if}
          </span>
        </div>

        {#if $usernameError}
          <span class="text-sm text-error mt-2">{$usernameError}</span>
        {/if}
      </div>

      <button
        disabled={loading}
        type="submit"
        class={cn("btn mt-6 btn-primary w-full", loading ? "opacity-75" : "")}
      >
        Submit
        {#if loading}
          <span class="loading loading-dots" />
        {/if}
      </button>

      <p class="mt-5 text-center">
        Creating an account on this app implies agreement with our
        <a class="link link-hover link-info" href="/">terms</a>
        and
        <a class="link link-hover link-info" href="/">services</a>.
      </p>
    </form>
  </div>
</div>
