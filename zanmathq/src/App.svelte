<script>
  import Login from './lib/Login.svelte';
  import Messages from "./lib/Messages.svelte";
  import { currentUser } from "./lib/pocketbase";
</script>

<h1>ZanMath Question Manager</h1>
<h2>Still in Testing!</h2>

<Login/>

{#if $currentUser}

  <Messages />
  
{/if}