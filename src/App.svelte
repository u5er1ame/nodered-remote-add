<script>
import Selector from "./Selector.svelte";
import { tabs, groups } from "./stores";
</script>

<main>
  <Selector name="label" list={tabs}/>
  <Selector name="name" list={groups}/>
</main>
