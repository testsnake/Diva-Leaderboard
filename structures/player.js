class Player {
    matches = [];

    constructor(discordID, initElo) {
        this.discordID = discordID;
        this.elo = initElo || 1000;
    }
    
}