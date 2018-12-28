// Queue Class

class Queue{
    constructor(name, userId){
        this._name = name;
        this._songs = [];
        this._ownerId = userId;
        

    }
    get length(){ //Length in number of songs
        return this._songs.length;
    }
    get name() {
        return this._name;
    }
    get titles() {
        var numSongs = this._songs.length;
        var titles = []
        for(var i=0; i<numSongs; i++){
            titles[i] = this._songs[i].title;
        }
        return titles;
    }
    get URLs(){
        var numSongs = this._songs.length;
        var URLs = []
        for(var i=0; i<numSongs; i++){
            URLs[i] = this._songs[i].URL;
        }
        return URLs;
    }
    addSong(song){
        this._songs.push(song);
    }
}

module.exports = Queue;
