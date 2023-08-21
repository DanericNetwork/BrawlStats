export type Player = {
    name: string,
    tag: string,
    trophies: number,
    highestTrophies: number,
    highestPowerPlayPoints: number,
    expLevel: number,
    expPoints: number,
    isQualifiedFromChampionshipChallenge: boolean,
    '3vs3Victories': number,
    soloVictories: number,
    duoVictories: number,
    bestRoboRumbleTime: number,
    bestTimeAsBigBrawler: number,
    club: {
        tag: string,
        name: string,
    },
    brawlers: BrawlerProps[],
}

interface starPower {
    id: number,
    name: string,
}

interface gadget {
    id: number,
    name: string,
}

export interface BrawlerProps {
    id: number,
    name: string,
    power: number,
    rank: number,
    trophies: number,
    highestTrophies: number,
    starPowers: starPower[],
    gadgets: gadget[],
}