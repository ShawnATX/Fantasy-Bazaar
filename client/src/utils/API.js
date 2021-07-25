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
  //Gets all relevant items by bazaar
  getBazaarItems: function (bazaarId) {
    return axios.get("/api/items/bazaar/" + bazaarId);
  },
  //get multiple items from array of item ids
  getItemsById: function (idArr) {
    return axios.post("/api/items/many", { items: idArr });
  },
  // Deletes item with the given id
  deleteItem: function (id) {
    return axios.delete("/api/items/" + id);
  },
  // Saves an item to the database
  saveItem: function (itemData) {
    return axios.post("/api/items/custom", itemData);
  },

  // Gets the user with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  getSessionUser: function () {
    return axios.get("/api/user");
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
  //update user password with a valid reset token
  saveResetPassword: function (userData) {
    return axios.post("/api/users/passwordreset", userData);
  },

  //user login
  loginUser: function (userData) {
    return axios.post("/api/users/login", userData);
  },
  //user logout
  logoutUser: function () {
    return axios.get("/logout");
  },
  //create new character
  saveCharacter: function (characterData) {
    return axios.post("/api/characters", characterData);
  },
  //get one character
  getCharacter: function (characterId) {
    return axios.get("/api/characters/" + characterId);
  },
  //get many characters
  getCharacters: function (characterArr) {
    return axios.post("/api/characters/many", characterArr);
  },
  updateCharacter: function (id, characterData) {
    return axios.put("/api/characters/" + id, characterData);
  },
  updateGold: function (id, characterData) {
    return axios.put("/api/characters/wallet/" + id, characterData);
  },
  //update character to purchase a single item and decrement wallet
  characterPurchase: function (characterData) {
    return axios.post("/api/characters/purchase", characterData);
  },
  //  update character to sell a single item and increment wallet
  characterSale: function (characterData) {
    return axios.post("/api/characters/sell", characterData);
  },
  characterAddItems: function (characterData) {
    return axios.put("/api/characters/items", characterData);
  },
  // Gets the bazaar with the given joinCode
  getBazaar: function (code) {
    return axios.get("/api/bazaars/code/" + code);
  },
  // Gets the bazaar with the given id
  getBazaarId: function (id) {
    return axios.get("/api/bazaars/" + id);
  },
  //get many bazaars
  getBazaars: function (bazaarArr) {
    return axios.post("/api/bazaars/many", bazaarArr);
  },
  // Deletes bazaar with the given id
  deleteBazaar: function (id) {
    return axios.delete("/api/bazaars/" + id);
  },
  // Saves a bazaar to the database
  saveBazaar: function (bazaarData) {
    return axios.post("/api/bazaars", bazaarData);
  },
  // upload character image
  uploadImage: async function (formData) {
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddpe6rr7l/upload",
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      );
      if (response.status === 400) {
        console.log(response);
      }
      return response.data;
    } catch (err) {
      return console.log(err);
    }
  },

  //Send password reset email
  forgotPassword: function (email) {
    return axios.post("/api/forgotpassword", email);
  },
  //Validate password reset token, return user if valid
  getTokenUser: function (token) {
    return axios.post("/api/validateresettoken", token);
  },
};
