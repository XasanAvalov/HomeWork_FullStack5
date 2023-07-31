const Io = require("../utils/Io");
const Products = new Io(process.cwd() + "/database/products.json");
const Favorites = new Io(process.cwd() + "/database/favourites.json");

const Favorite = require("../models/Favourite.models");


const jwt = require("../utils/jwt");

const createFavourite = async (req, res) => {
    const token = req.headers.authorization;
    const {product_id_body} = req.body;

    const products = await Products.read();
    const favourites = await Favorites.read();

    const product = products.find((product) => product.id == product_id_body);

    if(!product)
        res.status(404).json({message: "Product Not Found"});

    const user_id = req.user.id;

    const id = (favourites[favourites.length - 1]?.id || 0) + 1;

    const newFavourite = new Favorite(id, user_id, product_id_body);

    const data = favourites.length ? [...favourites, newFavourite] : [newFavourite];

    await Favorites.write(data)

    res.status(201).json({message: "Like Products Created"})
}
const getFavourites = async (req, res) => {
    try {
        const favourites = await Favorites.read();
    
        res.json({data: favourites});
      } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"});
      }
}
const removeFavourite = async (req, res) => {
    const {id} = req.params;
    const favourites = await Favorites.read();

    const filter = favourites.filter((favourite) => favourite.id != id);

    await Favorites.write(filter);

    res.json({message: "Deleted"});
}

module.exports = {createFavourite, getFavourites, removeFavourite}