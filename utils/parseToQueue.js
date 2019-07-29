var parseToQueue = async function (json){
    const Queue = this.queue;
    const Song = this.song;
    var parse = JSON.parse(json);
    parse._songs = parse._songs.map(song => Object.assign(new Song, song));
    var queue = Object.assign(new Queue, parse);
    return queue;
};

module.exports = parseToQueue;