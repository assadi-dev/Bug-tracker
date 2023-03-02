/** Api  **/

const API_URL = "http://greenvelvet.alwaysdata.net/bugTracker/api";
const NAME_DATA_STORAGE = "x-bug-tracker_data_sstorage";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "text/plain",
  },
});

/**Insertion du token à chaque appel ap*/
instance.interceptors.request.use(
  (request) => {
    let urlRequest = request.url;
    let { token } = getItem();
    urlRequest = urlRequest.replace("{token}", token);
    request.url = urlRequest;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

/**Action Authentification Api */

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

/**
 * retourne la statue en chaine de caractere
 * @param {number} state
 * 0 = non traité , 1 = en cours ,  2  = traité
 */
const getColorState = (state) => {
  switch (state) {
    case "0":
      return "non traité";
    case "1":
      return "en cours";
    case "2":
      return "traité";
  }
};

//Api Endpoints

/**obtenir la liste des developpeurs */
const getlistDevloppeurs = () => {
  return instance.get(`/users/{token}`);
};

/**obtenir la liste completes des bugs*/
const getCompleteBugs = () => {
  return instance.get(`/list/{token}/0`);
};

/**obtenir la liste des bugs assigner */
const getBugsAssigned = (id) => {
  return instance.get(`/list/{token}/${id}`);
};

/**
 *
 * @param {*} bug_id identifiant du bug
 * @param {*} value valeur du nouveau state
 * @returns
 */
const updateState = (bug_id, value) => {
  return instance.get(`/state/{token}/${bug_id}/${value}`);
};

/**
 *
 * @param {*} bug_id identifiant du bug
 */
const deletBug = (bug_id) => {
  return instance.get(`/delete/{token}/${bug_id}`);
};

/**
 *
 * @param {*} user_id id du developpeur
 * @param {*} body contenus à enregistré dans la base de donnée
 * ```json
 * {
 * "title":"",
 * "description":""
 * }
 * ```
 *
 *
 *
 */
const addBug = (user_id, body) => {
  return instance.post(`/add/{token}/${user_id}`, body);
};

const getFulDate = (timestamp) => {
  return dayjs(timestamp).format("DD-MM-YYYY HH:mm");
};

const alertSuccess = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: message,
  });
};

const alertError = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title: message,
  });
};

const modalSuccsess = (title, message) => {
  Swal.fire(title, message, " succes");
};

const modalError = (message) => {};

const sleep = (callback, delay) => {
  setTimeout(() => {
    callback();
  }, delay);
};

const refresh = () => {
  location.reload();
};
