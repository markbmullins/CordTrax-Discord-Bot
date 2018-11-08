class Song{
    constructor(name){
        this._name = name;
        this._URL = "";
        this._title = "";
    }
    constructor(name, URL){
        this._name = name;
        if(typeof(URL) === 'string'){
            this._URLs = [];
            this._URLs[0] = URL;
        }
        else if(Array.isArray(URL)){
            this._URLs = [];
            for(var i = 0; i<URL.length; i++){
                this._URLs.push(URL[i]);
            }
        }
        else{this._URLs = [];}
        this._titles = [];
    }
}




class Queue{
    constructor(name){
    	this._name = name;
        this._URLs = [];
        this._titles = [];
    }
    constructor(name, URL){
        this._name = name;
        if(typeof(URL) === 'string'){
            this._URLs = [];
            this._URLs[0] = URL;
        }
        else if(Array.isArray(URL)){
            this._URLs = [];
            for(var i = 0; i<URL.length; i++){
                this._URLs.push(URL[i]);
            }
        }
        else{this._URLs = [];}
        this._titles = [];
    }
    get length(){
        //need to implement: If URLs or Titles is shorter, update the shorter one to be current here.
        if(this._URLs.length >= this._titles.length) return this._URLs.length;
        if(this._URLs.length < this._titles.length) return this._titles.length;
    }
    get titles() {
        return this._titles;
    }
    get name() {
        return this._name;
    }
    get URLs(){
        return this._URLs;
    }
    addTitle(title){
    	this._titles.push(title);
    }
    addURL(URL){
    	this._URLs.push(URL);
    }
    addTitles(titleArray){
    	for(var i = 0; i<titleArray.length; i++){
    		this._titles.push(titleArray[i]);
    	}
    }
    addURLs(URLArray){
    	for(var i = 0; i<URLArray.length; i++){
    		this._URLs.push(URLArray[i]);
    	}
    	
    }
};

module.exports = Queue;