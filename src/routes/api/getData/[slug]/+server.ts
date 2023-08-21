import { json } from '@sveltejs/kit'
import { BRAWL_API_KEY } from '$env/static/private'
import type { Player } from "$lib/playerTypes";

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
    trophies: data.trophies,
    highestTrophies: data.highestTrophies,
  }

  return json(data)
}