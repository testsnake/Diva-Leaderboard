const mongoose = require('mongoose');
const logger = require('./logger.js');

// Define SongPack schema
const songPackSchema = new mongoose.Schema({
    name: String,
    authors: [String],
    downloadLink: String,
    releaseDate: Date,
    latestVersion: String
});
const SongPack = mongoose.model('SongPack', songPackSchema);

// Define Song schema
const songSchema = new mongoose.Schema({
    nameEN: String,
    nameJP: String,
    songID: String,
    songDifficulty: String,
    songPack: { type: mongoose.Schema.Types.ObjectId, ref: 'SongPack' },
    uniqueID: { type: String, unique: true }
});
const Song = mongoose.model('Song', songSchema);

// Define Game schema
const gameSchema = new mongoose.Schema({
    song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    result: String
});
const Game = mongoose.model('Game', gameSchema);

// Define Match schema
const matchSchema = new mongoose.Schema({
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    result: String
});
const Match = mongoose.model('Match', matchSchema);

// Define User schema
const userSchema = new mongoose.Schema({
    discordId: String,
    elo: { type: Number, default: 1200 },
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]
});
const User = mongoose.model('User', userSchema);

// Define ServerSetting schema
const serverSettingSchema = new mongoose.Schema({
    serverId: String,
    settingName: String,
    settingValue: String
});
const ServerSetting = mongoose.model('ServerSetting', serverSettingSchema);

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => logger.info('Connected to MongoDB...'))
    .catch(err => {
        logger.error('Could not connect to MongoDB...', err);
        process.exit(1);
    });

async function createSongPack(name, authors, downloadLink, releaseDate, latestVersion) {
    const songPack = new SongPack({ name, authors, downloadLink, releaseDate, latestVersion });
    try {
        const result = await songPack.save();
        logger.info(`SongPack created with ID: ${result._id}`);
        return result;
    } catch (error) {
        logger.error('Error creating song pack', error);
    }
}

async function updateSongPack(id, updatedData) {
    try {
        const songPack = await SongPack.findByIdAndUpdate(id, updatedData, { new: true });
        logger.info(`SongPack updated with ID: ${songPack._id}`);
        return songPack;
    } catch (error) {
        logger.error('Error updating song pack', error);
    }
}

async function createSong(nameEN, nameJP, songID, songDifficulty, songPack, uniqueID) {
    const song = new Song({ nameEN, nameJP, songID, songDifficulty, songPack, uniqueID });
    try {
        const result = await song.save();
        logger.info(`Song created with ID: ${result._id}`);
        return result;
    } catch (error) {
        logger.error('Error creating song', error);
    }
}

async function updateSong(id, updatedData) {
    try {
        const song = await Song.findByIdAndUpdate(id, updatedData, { new: true });
        logger.info(`Song updated with ID: ${song._id}`);
        return song;
    } catch (error) {
        logger.error('Error updating song', error);
    }
}

async function createGame(song, players, result) {
    const game = new Game({ song, players, result });
    try {
        const res = await game.save();
        logger.info(`Game created with ID: ${res._id}`);
        return res;
    } catch (error) {
        logger.error('Error creating game', error);
    }
}

async function createMatch(games, result) {
    const match = new Match({ games, result });
    try {
        const res = await match.save();
        logger.info(`Match created with ID: ${res._id}`);
        return res;
    } catch (error) {
        logger.error('Error creating match', error);
    }
}

async function createUser(discordId) {
    const user = new User({ discordId });
    try {
        const result = await user.save();
        logger.info(`User created with ID: ${result._id}`);
        return result;
    } catch (error) {
        logger.error('Error creating user', error);
    }
}

async function createServerSetting(serverId, settingName, settingValue) {
    const serverSetting = new ServerSetting({ serverId, settingName, settingValue });
    try {
        const result = await serverSetting.save();
        logger.info(`Server setting created with ID: ${result._id}`);
        return result;
    } catch (error) {
        logger.error('Error creating server setting', error);
    }
}

async function getServerSetting(serverId, settingName) {
    try {
        const result = await ServerSetting.findOne({ serverId, settingName });
        logger.info(`Server setting found with ID: ${result._id}`);
        return result;
    } catch (error) {
        logger.error('Error getting server setting', error);
    }
}

async function getSongPack(id) {
    try {
        const songPack = await SongPack.findById(id);
        logger.info(`SongPack found with ID: ${songPack._id}`);
        return songPack;
    } catch (error) {
        logger.error('Error getting song pack', error);
    }
}

async function getSong(id) {
    try {
        const song = await Song.findById(id);
        logger.info(`Song found with ID: ${song._id}`);
        return song;
    } catch (error) {
        logger.error('Error getting song', error);
    }
}

async function getGame(id) {
    try {
        const game = await Game.findById(id);
        logger.info(`Game found with ID: ${game._id}`);
        return game;
    } catch (error) {
        logger.error('Error getting game', error);
    }
}

async function getMatch(id) {
    try {
        const match = await Match.findById(id);
        logger.info(`Match found with ID: ${match._id}`);
        return match;
    } catch (error) {
        logger.error('Error getting match', error);
    }
}

async function getUser(discordId) {
    try {
        const user = await User.findOne({ discordId: discordId });
        if (!user) {
            logger.info(`No user found with discordId: ${discordId}`);
            return null;
        }
        logger.info(`User found with discordId: ${discordId}`);
        return user;
    } catch (error) {
        logger.error(`Error getting user with discordId: ${discordId}`, error);
    }
}

async function getSongPacks() {
    try {
        const songPacks = await SongPack.find();
        logger.info(`Found ${songPacks.length} song packs`);
        return songPacks;
    } catch (error) {
        logger.error('Error getting song packs', error);
    }
}

async function getSongs() {
    try {
        const songs = await Song.find();
        logger.info(`Found ${songs.length} songs`);
        return songs;
    } catch (error) {
        logger.error('Error getting songs', error);
    }
}

async function getGames() {
    try {
        const games = await Game.find();
        logger.info(`Found ${games.length} games`);
        return games;
    } catch (error) {
        logger.error('Error getting games', error);
    }
}

async function getMatches() {
    try {
        const matches = await Match.find();
        logger.info(`Found ${matches.length} matches`);
        return matches;
    } catch (error) {
        logger.error('Error getting matches', error);
    }
}

async function getUsers() {
    try {
        const users = await User.find();
        logger.info(`Found ${users.length} users`);
        return users;
    } catch (error) {
        logger.error('Error getting users', error);
    }
}

async function getSongPacksBySong(songId) {
    try {
        const song = await Song.findById(songId);
        const songPacks = await SongPack.find({ songs: song });
        logger.info(`Found ${songPacks.length} song packs`);
        return songPacks;
    } catch (error) {
        logger.error('Error getting song packs', error);
    }
}

async function getSongsBySongPack(songPackId) {
    try {
        const songPack = await SongPack.findById(songPackId);
        const songs = await Song.find({ songPack: songPack });
        logger.info(`Found ${songs.length} songs`);
        return songs;
    } catch (error) {
        logger.error('Error getting songs', error);
    }
}

async function getGamesBySong(songId) {
    try {
        const song = await Song.findById(songId);
        const games = await Game.find({ song: song });
        logger.info(`Found ${games.length} games`);
        return games;
    } catch (error) {
        logger.error('Error getting games', error);
    }
}

async function getGamesByPlayer(discordId) {
    try {
        const user = await User.findOne({ discordId: discordId });
        if (!user) {
            logger.info(`No user found with discordId: ${discordId}`);
            return null;
        }
        const games = await Game.find({ players: user._id });
        logger.info(`Found ${games.length} games for user with discordId: ${discordId}`);
        return games;
    } catch (error) {
        logger.error('Error getting games by player', error);
    }
}
async function getMatchesByPlayer(discordId) {
    try {
        const user = await User.findOne({ discordId: discordId });
        if (!user) {
            logger.info(`No user found with discordId: ${discordId}`);
            return null;
        }
        const matches = await Match.find({ 'games.players': user._id }).populate('games');
        logger.info(`Found ${matches.length} matches for user with discordId: ${discordId}`);
        return matches;
    } catch (error) {
        logger.error('Error getting matches by player', error);
    }
}

