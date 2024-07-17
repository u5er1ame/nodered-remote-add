<script lang="ts">
  import {
    createCombobox,
    melt,
    type ComboboxOptionProps,
  } from "@melt-ui/svelte";
  import { fly } from "svelte/transition";
  import { derived,  writable, type Readable } from "svelte/store";

  // import { tabs } from "./stores.js";
  import type { NodeTab,NodeGroup } from "./stores.d.ts";
    import { omit } from "@melt-ui/svelte/internal/helpers";
  type T = NodeTab | NodeGroup;
  export let list: Readable<T[]>;
  export let name: keyof T;

  const toOption = (tab: T): ComboboxOptionProps<T> => {
    // const  disabled  = tab.disabled? tab.disabled: undefined;
    return({
    value: tab,
    label: tab[name],
    // disabled: ,
  })};

  const {
    elements: { menu, input, option, label },
    states: { open, inputValue, touchedInput, selected },
    helpers: { isSelected },
  } = createCombobox<T>({
    forceVisible: true,
  });

  $: console.log($selected);

  let border: string;
  $: border = $isSelected($selected)? "bg-rose-200" : "bg-blue-100 border-2";

  $: if (!$open) {
    $inputValue = $selected?.label ?? "";
  }

  const filter = writable({} as NodeTab);

  const filteredTabs = derived(
    [list as Readable<NodeTab[]>, touchedInput, inputValue],
    ([$list, $touchedInput, $inputValue]) => {
      if (!$touchedInput) {
        return $list;
      }
      const normalizedInput = $inputValue.toLowerCase();
      return $list.filter((x: NodeTab) =>
        x[name].toLowerCase().includes(normalizedInput),
      );
    },
  );
</script>

<div class="flex flex-col gap-1 bg-sky-100 w-fit">
  <!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
  <label use:melt={$label}>
    <span class="text-sm font-medium text-blue-900">NodeRED tabs</span>
  </label>

  <div class="relative">
    <input
      use:melt={$input}
      class="flex h-10 items-center justify-between rounded-lg
          px-3 pr-12 text-black border-sky-300 {border}"
      placeholder="Choose a tab"
    />
    <!-- <div class="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-blue-900"> -->
    <!--   <!-- icon goes here -->
    <!-- </div> -->
  </div>
</div>
{#if $open}
  <ul
    class=" z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg"
    use:melt={$menu}
    transition:fly={{ duration: 150, y: -5 }}
  >
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div
      class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white px-2 py-2 text-black"
      tabindex="0"
    >
      {#each $filteredTabs as tab, index (index)}
        <li
          use:melt={$option(toOption(tab))}
          class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4
        hover:bg-blue-100
        data-[highlighted]:bg-blue-200 data-[highlighted]:text-blue-900
          data-[disabled]:opacity-50"
        >
          {#if $isSelected(tab)}
            <div class="check absolute left-2 top-1/2 z-10 text-blue-900">
              ✓
              <!-- icon goes here -->
            </div>
          {/if}
          <div class="pl-4">
            <span class="font-medium">{tab[name]}</span>
            <span class="block text-sm opacity-75">{tab.id}</span>
          </div>
        </li>
      {:else}
        <li class="relative cursor-pointer rounded-md py-1 pl-8 pr-4">
          No results found
        </li>
      {/each}
    </div>
  </ul>
{/if}

<style>
</style>
