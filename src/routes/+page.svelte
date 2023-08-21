<script lang="ts">
  import type { Player } from "$lib/playerTypes";
  let playerTag = "";
  let playerData: Player;

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
  <h1>Player Tag:</h1>
  <div class="inputBox">
    <input bind:value={playerTag} placeholder="#" />
    <span>Player Tag :</span>
  </div>
  <button on:click={fetchData}>Fetch Data</button>

  <h1>Player Data:</h1>
  <pre>{JSON.stringify(playerData, null, 2)}</pre>

  <h1>Name:</h1>
  {#if playerData}
    <h1>{playerData.name}</h1>
  {:else}
    <h1>Loading...</h1>
  {/if}
</main>
