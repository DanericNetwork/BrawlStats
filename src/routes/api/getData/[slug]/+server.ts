import { json } from '@sveltejs/kit'
import { BRAWL_API_KEY } from '$env/static/private'
import type { Player, BrawlerProps } from "$lib/playerTypes";

export async function GET({ params }) {
  let playerTag = params.slug
  const res = await fetch(
      "https://api.brawlstars.com/v1/players/%23" + playerTag, {
      method: "GET",
      mode: 'no-cors',
      headers: {
        Authorization: "Bearer " + BRAWL_API_KEY,
      },
    }
  )
  
  let data: Player = await res.json()

  // only show the data that is in the Player type

  data = {
    name: data.name,
    tag: data.tag,
    nameColor: data.nameColor,
    icon: {
      id: data.icon.id,
    },
    trophies: data.trophies,
    highestTrophies: data.highestTrophies,
    highestPowerPlayPoints: data.highestPowerPlayPoints,
    expLevel: data.expLevel,
    expPoints: data.expPoints,
    isQualifiedFromChampionshipChallenge: data.isQualifiedFromChampionshipChallenge,
    '3vs3Victories': data['3vs3Victories'],
    soloVictories: data.soloVictories,
    duoVictories: data.duoVictories,
    bestRoboRumbleTime: data.bestRoboRumbleTime,
    bestTimeAsBigBrawler: data.bestTimeAsBigBrawler,
    club: {
      tag: data.club.tag,
      name: data.club.name,
    },
    brawlers: data.brawlers.map((brawler: BrawlerProps) => {
      return {
        id: brawler.id,
        name: brawler.name,
        power: brawler.power,
        rank: brawler.rank,
        trophies: brawler.trophies,
        highestTrophies: brawler.highestTrophies,
        starPowers: brawler.starPowers.map((starPower) => {
          return {
            id: starPower.id,
            name: starPower.name,
          }
        }),
        gadgets: brawler.gadgets.map((gadget) => {
          return {
            id: gadget.id,
            name: gadget.name,
          }
        }),
      }
    }),
  }

  return json(data)
}