/** Api  **/

const API_URL = "http://greenvelvet.alwaysdata.net/bugTracker/api";
const NAME_DATA_STORAGE = "x-bug-tracker_data_sstorage";

const instance = axios.create({
  baseURL: API_URL,
});

/**LocalStorage **/

/**
 * Recuperation des donnée stocké en local
 *
 */
const getItem = () => {
  let storageData = localStorage.getItem(NAME_DATA_STORAGE);

  if (storageData) {
    let decode = atob(storageData);
    let toJSON = JSON.parse(decode);
    return toJSON;
  }
  return [];
};

/**
 * Sauvegarder les donnée en local
 * @param data données stockée au format Array ou Objet
 */
const setItem = (data) => {
  try {
    if (isEmpty(data)) {
      throw new Error("Data ne doit pas etre vide");
    }

    let dataToString = JSON.stringify(data);
    let encode = btoa(dataToString);
    localStorage.setItem(NAME_DATA_STORAGE, encode);
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * Suppression complete des donnée stockée en local
 */
const clearItem = () => {
  localStorage.clear();
};

/**Action Api */

const login = (username, password) => {
  return instance.get(`/login/${username}/${password}`);
};

const signUp = () => {
  return instance.get(`/signup/${username}/${password}`);
};

/**
 * verififie si une chaine de caracter est vide
 * @param {string} value
 * @returns {boolean}
 */
const isEmpty = (value) => {
  if (value == undefined || value == null || value == "") {
    return true;
  }

  return false;
};
