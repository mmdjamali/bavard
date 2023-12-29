<script lang="ts">
  import Icon from "$lib/components/icon.svelte";
  import type { PostEntity } from "$lib/types/entity";

  export let data: PostEntity;

  export let size: "sm" | "lg" | undefined = "sm";
</script>

<button
  data-size={size}
  on:click={(e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(data?.id);
  }}
  type="button"
  class="btn group shadow-none text-base-content/75 relative btn-square rounded-full bg-transparent hover:bg-primary/10 hover:text-primary border-none data-[size=sm]:!h-9 data-[size=sm]:!w-9 data-[size=lg]:!w-10 data-[size=lg]:!h-10"
>
  <Icon
    class="ri-bookmark-line group-data-[size=sm]:text-[18px] group-data-[size=lg]:text-[21px]"
  />
</button>
