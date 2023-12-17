<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { createFormField } from "$lib/form-field";
  import type { ApiResponse } from "$lib/types/api";
  import { writable } from "svelte/store";
  let send = false;
  let loading = false;

  const undosend = () => {
    send = false;
  };

  const dosend = () => {
    send = true;
  };

  const [email, emailError, reset] = createFormField({
    defaultValue: "",
    patterns: [
      {
        message: "please dont leave this field empty.",
        validator: /./,
      },
      {
        message: "email is invalid.",
        validator: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    ],
  });

  const code = writable("");

  const onCodeInput = (
    e: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) => {
    const value = e.currentTarget.value.replaceAll(/\D/g, "").substring(0, 6);
    e.currentTarget.value = value;
  };

  const handleAuth = async () => {
    try {
      if (!$email) return;

      if ($emailError) return;

      loading = true;

      const res: ApiResponse<null> = await fetch(
        PUBLIC_BACKEND_URL + "/api/auth",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: $email,
          }),
        },
      ).then((res) => res?.json());

      if (!res?.success) {
        loading = false;
        return;
      }

      dosend();
      loading = false;
    } catch (err) {
      loading = false;
    }
  };

  const handleValidation = async () => {
    try {
      if (!$email) return;

      if ($emailError) return;

      loading = true;

      const res: ApiResponse<null> = await fetch(
        PUBLIC_BACKEND_URL + "/api/auth/validate",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: $email,
            digits: $code,
          }),
        },
      ).then((res) => res?.json());

      if (!res?.success) {
        loading = false;
        return;
      }

      loading = false;
    } catch (err) {
      loading = false;
    }
  };
</script>

<div
  class="relative grid-cols-1 md:grid-cols-[25%_75%] lg:grid-cols-2 grid place-items-center h-full"
>
  <div class="bg-primary w-full h-full hidden md:grid" />

  <div class="sm:p-12 p-8 w-full h-full relative grid place-items-center">
    {#if send}
      <form
        on:submit|preventDefault={handleValidation}
        class="w-full max-w-sm mx-auto"
      >
        <div class="w-full flex justify-start mb-5">
          <button
            class="btn btn-square"
            on:click={() => {
              undosend();
            }}
          >
            <i
              class="ri-arrow-left-line font-normal inline-grid items-baseline text-[21px]"
            />
          </button>
        </div>

        <img class="w-12 mb-2 mx-auto" alt="logo" src="/logo.svg" />

        <h1 class="text-center text-2xl mb-2 font-semibold">One more step</h1>

        <p class="text-sm text-center">
          A verification code has been sent to
          <span class="text-secondary">{$email}</span>. Please enter the code to
          proceed.
        </p>

        <input
          on:input={onCodeInput}
          placeholder="123456"
          name={"code"}
          bind:value={$code}
          class="input text-center tracking-[1rem] mt-6 w-full input-bordered focus:outline-none focus:border-primary transition-colors"
        />

        <button type="submit" class="btn mt-6 btn-primary w-full">
          Submit
        </button>

        <p class="mt-5 text-center">
          Creating an account on this app implies agreement with our
          <a class="link link-hover link-info" href="/">terms</a>
          and
          <a class="link link-hover link-info" href="/">services</a>.
        </p>
      </form>
    {:else}
      <form
        on:submit|preventDefault={handleAuth}
        class="w-full max-w-sm mx-auto"
      >
        <img class="w-12 mb-2 mx-auto" alt="logo" src="/logo.svg" />

        <h1 class="text-center text-2xl mb-2 font-semibold">
          Welcome to percent!
        </h1>

        <p class="text-sm text-center">
          Please login/register with your email to continue.
        </p>

        <div>
          <input
            name="email"
            placeholder="email@gmail.com"
            bind:value={$email}
            class="input mt-6 w-full input-bordered focus:outline-none focus:border-primary transition-colors"
          />
          {#if emailError}
            <span class="text-error">{$emailError}</span>
          {/if}
        </div>

        <button type="submit" class="btn mt-6 btn-primary w-full">
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
    {/if}
  </div>
</div>
