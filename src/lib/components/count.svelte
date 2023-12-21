<script lang="ts">
  export let value: string;

  const count = Number.parseInt(value);

  function formatLargeNumber(num: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    });

    return formatter.format(num);
  }
</script>

{#if count > 0}
  <span class="text-xs absolute left-[calc(100%_-_4px)] my-auto">
    {formatLargeNumber(count)}
  </span>
{/if}
