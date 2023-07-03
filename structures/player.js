class Player {
    matches = [];
    enabledSongPacks = [];
    elo;

    constructor(discordID, initElo) {
        this.discordID = discordID;
        this.elo = initElo || 1000;
    }

}