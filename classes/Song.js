//Song Class

class Song{
		constructor(title, url){
		    this._title = title;
			this._URL = url;
		}
		get title(){
			return this._title;
		}
		get URL(){
			return this._URL;
		}
		updateURL(message){
			this._URL = this.getUrl(message,this._title);
		}
		updateTitle(){
			return;
		}
}

module.exports = Song;
