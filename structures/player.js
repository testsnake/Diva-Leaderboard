class Player {
    discordID;
    matches = [];
    enabledSongPacks = [];
    blockedSongPacks = [];
    elo;

    constructor(discordID, initElo) {
        this.discordID = discordID;
        this.elo = initElo || 1000;
    }

}