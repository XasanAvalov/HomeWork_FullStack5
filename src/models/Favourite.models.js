class Favorite {
    constructor(id, user_id, favorite_id){
        this.id = id;
        this.user_id = user_id;
        this.favorite_id = favorite_id;
        this.date = new Date();
    }
}

module.exports = Favorite;