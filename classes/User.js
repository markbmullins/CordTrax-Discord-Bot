const getXp = require('./getXp.js');
class User{
    constructor(message){
        this._discordId = `${message.author.id}`;
        this._queues = [];
        this._xp = getCurrentXp(`${message.author.id}`);
        this._guildId = `${message.guild.id}`; 
    }
    // getters and setters
    get discordId(){
        return this._discordId;
    }
    get queues(){
        return this._queues;
    }
    get xp(){
        return this._xp;
    }
    get guildId(){
        return this._guildId;
    }
    set xp(xpValue){
        this._xp = xpValue;
    }
    // Methods for handling user xp
    getCurrentXp(userId){
        getXp(userId);
    }
    addXp(amount){
        this._xp += amount;
    }
    /*
     * Methods for handling the record keeping of queues
     * These methods do not affect the database. Only the User Object itself.
     */
    addQueue(queueObj){
        this._queues.push(queueObj);
    }
    removeQueue(queueObj){
        const queues = this._queues;
        const remove = queueObj;
        const filteredQueues = queues.filter( item => item !== remove);
        this._queues = filteredQueues;
    }
    syncQueues(){

    }
    get queueNames(){
        var queueNames = [];
        for(queue in this._queues){
            queueNames.push(queue.name);
        }
        return queueNames;
    }

  
}
