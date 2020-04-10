import axios from 'axios';

export default {
    // Gets all items
    getItems: function () {
        return axios.get("/api/items");
    },
    // Gets the item with the given id
    getItem: function (id) {
        return axios.get("/api/items/" + id);
    },
    // Deletes item with the given id
    deleteItem: function (id) {
        return axios.delete("/api/items/" + id);
    },
    // Saves an item to the database
    saveItem: function (itemData) {
        return axios.post("/api/items", itemData);
    },

    // Gets the user with the given id
    getUser: function (id) {
        return axios.get("/api/users/" + id);
    },
    //Save new user
    saveUser: function (userData) {
        return axios.post("/api/users", userData);
    },
    //Delete user with given id
    deleteUser: function (id) {
        return axios.delete("/api/users/" + id);
    },
    //update user 
    updateUser: function (id, userData) {
        return axios.put("/api/users/" + id, userData);
    },
    // Gets the bazaar with the given id
    getBazaar: function (id) {
        return axios.get("/api/bazaars/" + id);
    },
    // Deletes bazaar with the given id
    deleteBazaar: function (id) {
        return axios.delete("/api/bazaars/" + id);
    },
    // Saves an bazaar to the database
    saveBazaar: function (bazaarData) {
        return axios.post("/api/bazaars", bazaarData);
    }
};