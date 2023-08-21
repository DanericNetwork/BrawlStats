import { BRAWL_API_KEY } from '$env/static/private'

export async function load() {
  console.log(BRAWL_API_KEY) // secret 🤫
}
