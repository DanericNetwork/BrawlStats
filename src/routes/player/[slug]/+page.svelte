<script lang="ts">
    import { onMount } from 'svelte';
    import type { Player, BrawlerProps } from "$lib/playerTypes";
    let playerData: Player;

    export let data;

    let playerTag = data.slug;

    onMount(() => {
        fetchData();
    })
  
    async function fetchData() {
      if (!playerTag) return alert("Please enter a player tag");
  
      if (playerTag.startsWith("#")) playerTag = await playerTag.slice(1);
  
      try {
        const response = await fetch(`/api/getData/${playerTag}`);
        const data = await response.json();
        console.log("Data:", data);
        playerData = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  </script>
  
  <main>
    {#if playerData}
      <h1>{playerData.name}</h1>
    {:else}
      <h1>Please enter a player tag!</h1>
    {/if}
    <h1>Player Data:</h1>
    <pre>{JSON.stringify(playerData, null, 2)}</pre>
  </main>
  