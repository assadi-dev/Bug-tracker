document.addEventListener("DOMContentLoaded", () => {
  const icons = {
    Trash: `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_51_37)">
  <path d="M21.3043 8.26087L20.4619 23.9674C20.4348 24.538 19.9456 25 19.375 25H5.62497C5.05432 25 4.56519 24.538 4.53801 23.9674L3.69562 8.26087C3.66845 7.66304 4.1304 7.14674 4.72823 7.11956C5.32605 7.09239 5.84236 7.55434 5.86953 8.15217L6.65758 22.8261H18.3695L19.1576 8.15217C19.1848 7.55434 19.7011 7.09239 20.2989 7.11956C20.8695 7.14674 21.3315 7.66304 21.3043 8.26087ZM24.1848 4.61956C24.1848 5.21739 23.6956 5.70652 23.0978 5.70652H1.90214C1.30432 5.70652 0.815186 5.21739 0.815186 4.61956C0.815186 4.02174 1.30432 3.53261 1.90214 3.53261H7.8804V1.08695C7.8804 0.570649 8.23366 0.271736 8.74997 0.271736H16.25C16.7663 0.271736 17.1195 0.570649 17.1195 1.08695V3.53261H23.0978C23.6956 3.53261 24.1848 4.02174 24.1848 4.61956ZM9.78258 3.53261H15.2174V2.17391H9.78258V3.53261ZM10.2445 21.1956C10.788 21.1956 11.1956 20.6793 11.1956 20.163L10.9239 8.42391C10.9239 7.90761 10.4891 7.47282 9.94562 7.47282C9.42932 7.47282 8.99453 7.90761 9.02171 8.45108L9.29345 20.2174C9.29345 20.7337 9.72823 21.1956 10.2445 21.1956ZM14.7282 21.1956C15.2445 21.1956 15.6793 20.7609 15.6793 20.2446L15.9511 8.50543C15.9511 7.98913 15.5434 7.52717 15.0271 7.52717C14.4837 7.52717 14.0761 7.93478 14.0489 8.45108L13.7771 20.1902C13.75 20.7337 14.1848 21.1956 14.7282 21.1956C14.7011 21.1956 14.7011 21.1956 14.7282 21.1956Z" fill="currentColor"/>
  </g>
  <defs>
  <clipPath id="clip0_51_37">
  <rect width="25" height="25" fill="white"/>
  </clipPath>
  </defs>
  </svg>`,

    Eye: `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_51_32)">
      <path d="M12.5 4.6875C7.29163 4.6875 2.84371 7.92708 1.04163 12.5C2.84371 17.0729 7.29163 20.3125 12.5 20.3125C17.7135 20.3125 22.1562 17.0729 23.9583 12.5C22.1562 7.92708 17.7135 4.6875 12.5 4.6875ZM12.5 17.7083C9.62496 17.7083 7.29163 15.375 7.29163 12.5C7.29163 9.625 9.62496 7.29167 12.5 7.29167C15.375 7.29167 17.7083 9.625 17.7083 12.5C17.7083 15.375 15.375 17.7083 12.5 17.7083ZM12.5 9.375C10.776 9.375 9.37496 10.776 9.37496 12.5C9.37496 14.224 10.776 15.625 12.5 15.625C14.2239 15.625 15.625 14.224 15.625 12.5C15.625 10.776 14.2239 9.375 12.5 9.375Z" fill="currentColor"/>
      </g>
      <defs>
      <clipPath id="clip0_51_32">
      <rect width="25" height="25" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      
      `,
  };

  const user_id = getItem().id;

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

  const stateSelectore = (id, value) => {
    const select = document.createElement("select");
    select.name = "state";
    select.id = "state";
    select.innerHTML = `<option value="0">Non traité</option><option value="1" >En cours</option><option value="2" >Traité</option>`;
    select.value = value;
    select.onchange = (e) => {
      let newState = e.target.value;
      updateState(id, newState)
        .then(() => alertSuccess("L'etat du bug à été mise à jour"))
        .catch((error) => {
          alertError(error.message);
        });
    };
    return select;
  };

  //Action button

  const deleteBtn = (id, title) => {
    const btn = document.createElement("button");
    btn.title = "Supprimer le bug";
    btn.classList.add("action-btn-delete");
    btn.innerHTML = `${icons.Trash}
      `;

    btn.onclick = () => {
      Swal.fire({
        title: "Etes-vous sur ?",
        text: `Vous êtes sur le point de supprimer ${title} `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1474E5",
        confirmButtonText: "Supprimer",
        cancelButtonColor: "#9A031D",
        cancelButtonText: "Annuler",
      }).then((result) => {
        deletBug(id).then((res) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Supprimé",
              `Le bug ${title} à été supprimé`,
              "success"
            ).then((res) => {
              if (res.isConfirmed) {
                location.reload();
              }
            });
          }
        });
      });
    };

    return btn;
  };

  const showDescriptionBtn = (description) => {
    const btn = document.createElement("button");
    btn.classList.add("action-btn-show");
    btn.innerHTML = `${icons.Eye}`;
    btn.title = "Voir la description du bug";
    btn.onclick = () => {
      Swal.fire("Description", description, "");
    };
    return btn;
  };

  const generateRow = (bug) => {
    const { id, title, timestamp, description, user_id, state } = bug;
    let devloppeur = "";
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${title}</td><td>${getFulDate(
      timestamp * 1000
    )}</td><td></td><td></td><td class="action-col"></td>`;
    tr.childNodes[3].append(stateSelectore(id, state));
    tr.childNodes[4].append(showDescriptionBtn(description));
    tr.childNodes[4].append(deleteBtn(id, title));

    getlistDevloppeurs().then((res) => {
      let data = res.data.result.user;
      devloppeur = data[user_id];
      tr.childNodes[2].textContent = devloppeur;
    });

    return tr;
  };

  /**Recuperation et affichage de la listes completes des bugs */

  const table = document.querySelector(".table-section table");
  const tbody = table.querySelector("tbody");

  const loadData = (data) => {
    if (data.result.bug.length > 0) {
      const StatsResume = {
        assigned: document.querySelector(".card-info #state-assigned"),
        nonTraiter: document.querySelector(".card-info #state-non-traiter"),
        traite: document.querySelector(".card-info #state-traiter"),
      };

      let non_traiter = bugStateFiltered("0", data.result.bug);
      let traiter = bugStateFiltered("2", data.result.bug);

      StatsResume.assigned.textContent = `${data.result.bug.length} Assigné`;
      StatsResume.nonTraiter.textContent = `${non_traiter.length} Non-traité`;
      StatsResume.traite.textContent = `${traiter.length} Traité`;

      tbody.childNodes[0].remove();
      data.result.bug.forEach((bug) => {
        tbody.append(generateRow(bug));
      });
    } else {
      let row = emptyRow();
      tbody.append(row);
      tbody.childNodes[0].remove();
    }
  };

  try {
    tbody.innerHTML = `<tr><td colspan="6">Recuperation des données </td></tr>`;
    getBugsAssigned(user_id).then((res) => {
      let data = res.data;
      if (data.result.status != "failure") {
        sleep(() => loadData(data), 2000);
      } else {
        let row = emptyRow();
        tbody.append(row);
        tbody.childNodes[0].remove();
        Swal.fire("Erreur", data.result.message, "error").then((res) => {
          if (res.isConfirmed) {
            clearItem();
            sleep(refresh, 1000);
          }
        });
      }
    });
  } catch (error) {
    let row = emptyRow();
    tbody.append(row);
    console.log(error);
  }
});
