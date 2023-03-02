document.addEventListener("DOMContentLoaded", () => {
  //componnents

  const emptyRow = () => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = "Aucun bug déclaré";
    td.classList.add("text-center");
    tr.append(td);
    return tr;
  };

  const stateSelectore = (value) => {
    const select = document.createElement("select");
    select.name = "state";
    select.id = "state";
    select.innerHTML = `<option value="0" >Non traité</option><option value="1" >En cour</option><option value="2" >Traité</option>`;
    select.value = value;
    return select;
  };

  const generateRow = (bug) => {
    const { id, title, timestamp, description, user_id, state } = bug;
    let devloppeur = "";
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${title}</td><td>${getFulDate(
      timestamp * 1000
    )}</td><td></td><td></td><td></td>`;
    tr.childNodes[3].append(stateSelectore(state));
    getlistDevloppeurs().then((res) => {
      let data = res.data.result.user;
      devloppeur = data[user_id];
      tr.childNodes[2].textContent = devloppeur;
    });

    return tr;
  };

  /**Recuperation et affichage de la listes completes des bugs */
  let completeListBugs = [];
  const table = document.querySelector(".table-section table");
  const tbody = table.querySelector("tbody");

  try {
    let row = emptyRow();
    tbody.append(row);

    getCompleteBugs().then((res) => {
      let data = res.data;
      if (data) {
        tbody.childNodes[1].remove();
        tbody.firstChild;
        data.result.bug.length > 0 &&
          data.result.bug.forEach((bug) => {
            tbody.append(generateRow(bug));
          });
      }
    });
  } catch (error) {
    let row = emptyRow();
    tbody.append(row);
  }
});
