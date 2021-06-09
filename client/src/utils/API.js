import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // Gets all items
  getItems: function () {
    return axios.get("/api/items");
  },
  // Gets the item with the given id
  getItem: function (id) {
    return axios.get("/api/items/" + id);
  },
  // Gets the item with the given system
  getItemsBySystem: function (system) {
    return axios.get("/api/items/" + system);
  },
  //get multiple items from array of item ids
  getItemsById: function (idArr) {
    console.log(idArr);
    return axios.post("/api/items/many", { items: idArr });
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
  // Gets the user with the given email
  checkEmail: function (email) {
    return axios.post("/api/users/email/", email);
  },
  // Gets all users
  getUsers: function () {
    return axios.get("/api/users");
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
  //update user to purchase a single item and decrement wallet
  userPurchase: function (userData) {
    return axios.put("/api/users/purchase", userData);
  },
  //  update user to sell a single item and increment wallet
  userSale: function (userData) {
    return axios.put("/api/users/sell", userData);
  },
  //user login
  loginUser: function (userData) {
    return axios.post("/api/users/login", userData);
  },
  //user logout
  logoutUser: function () {
    return axios.get("/logout");
  },

  // Gets the bazaar with the given joinCode
  getBazaar: function (code) {
    return axios.get("/api/bazaars/code/" + code);
  },
  // Gets the bazaar with the given id
  getBazaarId: function (id) {
    return axios.get("/api/bazaars/" + id);
  },
  // Deletes bazaar with the given id
  deleteBazaar: function (id) {
    return axios.delete("/api/bazaars/" + id);
  },
  // Saves a bazaar to the database
  saveBazaar: function (bazaarData) {
    return axios.post("/api/bazaars", bazaarData);
  },
};
