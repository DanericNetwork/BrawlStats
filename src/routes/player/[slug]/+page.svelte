<script lang="ts">
    import { onMount } from "svelte";
    import type { Player, BrawlerProps } from "$lib/playerTypes";
    let playerData: Player;

    export let data;

    let playerTag = data.slug;

    onMount(() => {
        fetchData();
    });

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

    function sortBrawlersByTrophies(brawlers: BrawlerProps[]) {
        return brawlers.slice().sort((a, b) => b.trophies - a.trophies);
    }
</script>

<svelte:head>
    <title>{playerData ? playerData.name + " | BrawlStatis" : "Loading... | BrawlStatis"}</title>
</svelte:head>

<main>
    <div class="container">
        {#if playerData}
            <div class="profile-card">
                <img src="/assets/profile/{playerData.icon.id}.png" alt="" />
                <div class="profile-card-info">
                    <h2
                        style="color: #{playerData.nameColor.replace(
                            '0xff',
                            ''
                        )}"
                    >
                        {playerData.name}
                    </h2>
                    <p>{playerData.tag}</p>
                    <p><img class="trophies" src="/assets/icon_trophy_medium.png" alt="trophies">{playerData.trophies}</p>
                </div>
            </div>
            <div class="wins">
                <div class="wins-card">
                    <img src="/assets/gamemodes/3v3.png" alt="3v3">
                    <p>{playerData["3vs3Victories"]}</p>
                </div>
                <div class="wins-card">
                    <img src="/assets/gamemodes/Showdown.png" alt="Showdown">
                    <p>{playerData.soloVictories}</p>
                </div>
                <div class="wins-card">
                    <img src="/assets/gamemodes/Duo-Showdown.png" alt="DuoShowdown">
                    <p>{playerData.duoVictories}</p>
                </div>
            </div>
            <div class="brawler-container">
                <h2>Brawlers ({playerData.brawlers.length}/70)</h2>
                <div class="brawlers-list">
                    {#each sortBrawlersByTrophies(playerData.brawlers) as brawler}
                        <div class="brawler-card">
                            <div class="brawler-card-header">
                                <div class="brawler-card-header-rank">
                                    {#if brawler.rank > 0}
                                        <img
                                            src="/assets/rank/{brawler.rank}.png"
                                            alt="rank-{brawler.rank}"
                                        />
                                    {/if}
                                    <p class="rank">{brawler.trophies}</p>
                                </div>
                                <p class="title">{brawler.name}</p>
                                <div class="brawler-card-header-rank">
                                    <p class="rank">{brawler.power}</p>
                                    <img
                                        src="/assets/PowerPoint.png"
                                        alt="powerpoint"
                                    />
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <h1>Loading Data...</h1>
        {/if}
    </div>
</main>
