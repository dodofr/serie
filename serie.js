document.addEventListener("DOMContentLoaded", () => {
  //Mon site est une site de creations et suppressions d'elements generé par mon api, plusieurs problemes se sont posé: creation d'un btn retour,
  //récuperations de donnés, utilisation des for qui n'ecrase pas tout etc. Mon plus gros probleme actuel est ce code tres lourd que je voudrais diminuer
  //je pense que 70% pourrait étre enlevé

  let inputRecherche = document.getElementById("rechercheInput");
  // variable
  let grid = document.querySelector(".grid");
  let seriePopulaire = document.getElementById("seriePopulaire");
  let serieOnAir = document.getElementById("serieOnAir");
  let acceuil = document.getElementById("acceuil");

  // bouton retour a l'acceuil, simple je recharge la page quand on clique

  acceuil.addEventListener("click", () => {
    location.reload();
  });

  // cacher le bouton retour car il ne fonctionne qu'avec des valeurs de l'input et donc ne sert a rien tant qu'on a pas utilisé l'input
  document.getElementById("retour").style.visibility = "hidden";

  //serie on air

  serieOnAir.addEventListener("click", () => {
    document.getElementById("retour").style.visibility = "hidden";
    grid.innerHTML = "";
    fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=3341d636ea5e718cbe535387f5416379&language=fr&page=1`
    )
      .then((reponse) => reponse.json())
      .then((data) => {
        for (let i = 0; i < data.results.length; i++) {
          // les creations
          let div = document.createElement("div");
          let nomSerie = document.createElement("h2");
          let DateDeSortie = document.createElement("p");
          let imageSerie = document.createElement("img");
          let resumeSerie = document.createElement("p");
          let voteDeLaserie = document.createElement("p");
          let btnDelaSerie = document.createElement("button");
          btnDelaSerie.setAttribute("id", `${data.results[i].id}`);
          btnDelaSerie.setAttribute("class", "btnClass");

          // l'affichage
          nomSerie.innerHTML = data.results[i].name;
          DateDeSortie.innerHTML = data.results[i].first_air_date;
          imageSerie.src =
            "https://image.tmdb.org/t/p/original" + data.results[i].poster_path;
          resumeSerie.innerHTML = data.results[i].overview;
          voteDeLaserie.innerHTML = data.results[i].vote_average;
          btnDelaSerie.innerHTML = "En savoir plus";

          // placement des elements
          div.appendChild(nomSerie);
          div.appendChild(DateDeSortie);
          div.appendChild(imageSerie);
          div.appendChild(resumeSerie);
          div.appendChild(voteDeLaserie);
          div.appendChild(btnDelaSerie);

          grid.appendChild(div);

          let allBtn = document.getElementById(`${data.results[i].id}`);
          allBtn.addEventListener("click", (e) => {
            grid.innerHTML = "";
            fetch(
              `https://api.themoviedb.org/3/tv/${e.target.id}?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
            )
              .then((reponse) => reponse.json())
              .then((data) => {
                let div = document.createElement("div");
                div.setAttribute("class", "divPresentationSerie");
                div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${data.poster_path})`;
                let nomSerie = document.createElement("h2");
                let genre = document.createElement("p");
                let production = document.createElement("p");
                let enCour = document.createElement("p");
                let description = document.createElement("p");
                description.setAttribute("class", "descriptionSansLimiteText");
                let divFiltre = document.createElement("div");
                divFiltre.setAttribute("class", "divPresentationFiltre");
                let saisonsName;
                let imageSerie;
                let saisonDescription;
                let saisonNb;
                let btnSaisonDescription = document.createElement("button");
                btnSaisonDescription.setAttribute("id", `${data.id}`); // bouton de la ba dans la premiere pastille
                let lienBtnSaisonDescription = document.createElement("a");
                lienBtnSaisonDescription.setAttribute("target", "_blank");
                lienBtnSaisonDescription.setAttribute(
                  "class",
                  "lienBtnSaisonDescription"
                );

                nomSerie.innerHTML = data.name;
                genre.innerHTML =
                  "Genres : " +
                  data.genres[0].name +
                  " / " +
                  data.genres[1].name;
                production.innerHTML =
                  "Producteur : " +
                  data.networks[0].name +
                  " / " +
                  " Origine : " +
                  data.networks[0].origin_country +
                  " / " +
                  " Nbs d'épisodes : " +
                  data.number_of_episodes +
                  " / " +
                  " Nbs de saisons : " +
                  data.number_of_seasons;
                enCour.innerHTML =
                  "Date du dernier épisode : " +
                  data.last_episode_to_air.air_date +
                  " / " +
                  " Last saison : " +
                  data.last_episode_to_air.season_number +
                  " / " +
                  " Last épisode : " +
                  data.last_episode_to_air.episode_number;
                description.innerHTML = data.overview;
                btnSaisonDescription.innerHTML =
                  "Générer aléatoirement une video en FR/EN";

                div.appendChild(nomSerie);
                div.appendChild(enCour);
                div.appendChild(genre);
                div.appendChild(production);
                div.appendChild(description);
                div.appendChild(divFiltre);
                div.appendChild(lienBtnSaisonDescription);
                div.appendChild(btnSaisonDescription);
                div.appendChild(lienBtnSaisonDescription);
                grid.appendChild(div);
                // bouton ba description
                let btnSaisonBa = document.getElementById(`${data.id}`);

                btnSaisonBa.addEventListener("click", (e) => {
                  fetch(
                    `https://api.themoviedb.org/3/tv/${e.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
                  )
                    .then((reponse) => reponse.json())
                    .then((data) => {
                      let random = getRandomInt(data.results.length);
                      lienBtnSaisonDescription.innerHTML =
                        "&#128073; " +
                        `${data.results[random].name}` +
                        " &#128072;";

                      lienBtnSaisonDescription.href =
                        "https://www.youtube.com/watch?v=" +
                        `${data.results[random].key}`;
                    })
                    .catch((err) =>
                      fetch(
                        `https://api.themoviedb.org/3/tv/${e.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=en-US`
                      )
                        .then((reponse) => reponse.json())
                        .then((data) => {
                          let random = getRandomInt(data.results.length);
                          lienBtnSaisonDescription.innerHTML =
                            "&#128073; " +
                            `${data.results[random].name}` +
                            " &#128072;";

                          lienBtnSaisonDescription.href =
                            "https://www.youtube.com/watch?v=" +
                            `${data.results[random].key}`;
                        })
                        .catch(
                          (err) =>
                            (lienBtnSaison.innerHTML =
                              "Aucune bande annonce disponible")
                        )
                    );
                });

                for (let i = 0; i < data.seasons.length; i++) {
                  divSaison = document.createElement("div");
                  saisonsName = document.createElement("p");
                  imageSerie = document.createElement("img");
                  saisonDescription = document.createElement("p");
                  saisonDescription.setAttribute(
                    "class",
                    "descriptionSansLimiteText"
                  );
                  saisonNb = document.createElement("p");
                  saisonBouton = document.createElement("button"); //boutonBA
                  saisonBouton.setAttribute("class", `${e.target.id}`); //boutonBA
                  saisonBouton.setAttribute(
                    "id",
                    `${data.seasons[i].season_number}`
                  ); //boutonBA
                  let lienBtnSaison = document.createElement("a");

                  saisonsName.innerHTML = data.seasons[i].name;
                  imageSerie.src =
                    "https://image.tmdb.org/t/p/original" +
                    data.seasons[i].poster_path;
                  saisonDescription.innerHTML = data.seasons[i].overview;
                  saisonNb.innerHTML =
                    "Date du premier episode : " +
                    data.seasons[i].air_date +
                    " / " +
                    " Nbs d'épisodes : " +
                    data.seasons[i].episode_count;
                  saisonBouton.innerHTML =
                    "Générer aléatoirement une Ba en FR/EN";

                  divSaison.appendChild(saisonsName);
                  divSaison.appendChild(imageSerie);
                  divSaison.appendChild(saisonDescription);
                  divSaison.appendChild(saisonNb);
                  divSaison.appendChild(saisonBouton); // boutonBA
                  divSaison.appendChild(lienBtnSaison);
                  grid.appendChild(divSaison);

                  let btnSaisonBa = document.getElementById(
                    `${data.seasons[i].season_number}`
                  );

                  btnSaisonBa.addEventListener("click", (event) => {
                    fetch(
                      `https://api.themoviedb.org/3/tv/${event.target.classList.value}/season/${event.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
                    )
                      .then((reponse) => reponse.json())
                      .then((data) => {
                        lienBtnSaison.setAttribute("target", "_blank");
                        lienBtnSaison.setAttribute(
                          "class",
                          "lienBtnSaisonDescription"
                        );
                        let random = getRandomInt(data.results.length);

                        lienBtnSaison.innerHTML =
                          "&#128073; " +
                          `${data.results[random].name}` +
                          " &#128072;";

                        lienBtnSaison.href =
                          "https://www.youtube.com/watch?v=" +
                          `${data.results[random].key}`;
                      })
                      .catch((err) =>
                        fetch(
                          `https://api.themoviedb.org/3/tv/${event.target.classList.value}/season/${event.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=en-US`
                        )
                          .then((reponse) => reponse.json())
                          .then((data) => {
                            lienBtnSaison.setAttribute("target", "_blank");
                            lienBtnSaison.setAttribute(
                              "class",
                              "lienBtnSaisonDescription"
                            );
                            let random = getRandomInt(data.results.length);

                            lienBtnSaison.innerHTML =
                              "&#128073; " +
                              `${data.results[random].name}` +
                              " &#128072;";

                            lienBtnSaison.href =
                              "https://www.youtube.com/watch?v=" +
                              `${data.results[random].key}`;
                          })
                          .catch(
                            (err) =>
                              (lienBtnSaison.innerHTML =
                                "Aucune bande annonce disponible" +
                                " &#128556;")
                          )
                      );
                  });
                } //fin du for
              });
          }); // fin du bouton
        }
      });
  });

  // serie populaire
  seriePopulaire.addEventListener("click", () => {
    document.getElementById("retour").style.visibility = "hidden"; // cache le bouton retour
    grid.innerHTML = ""; // clean le grid
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=3341d636ea5e718cbe535387f5416379&language=fr&page=1`
    )
      .then((reponse) => reponse.json())
      .then((data) => {
        for (let i = 0; i < data.results.length; i++) {
          // les creations
          let div = document.createElement("div");
          let nomSerie = document.createElement("h2");
          let DateDeSortie = document.createElement("p");
          let imageSerie = document.createElement("img");
          let resumeSerie = document.createElement("p");
          let voteDeLaserie = document.createElement("p");
          let btnDelaSerie = document.createElement("button");
          btnDelaSerie.setAttribute("id", `${data.results[i].id}`); // attribut l'id de la serie a son bouton
          btnDelaSerie.setAttribute("class", "btnClass");

          // l'affichage
          nomSerie.innerHTML = data.results[i].name;
          DateDeSortie.innerHTML = data.results[i].first_air_date;
          imageSerie.src =
            "https://image.tmdb.org/t/p/original" + data.results[i].poster_path;
          resumeSerie.innerHTML = data.results[i].overview;
          voteDeLaserie.innerHTML = data.results[i].vote_average;
          btnDelaSerie.innerHTML = "En savoir plus";

          // placement des elements
          div.appendChild(nomSerie);
          div.appendChild(DateDeSortie);
          div.appendChild(imageSerie);
          div.appendChild(resumeSerie);
          div.appendChild(voteDeLaserie);
          div.appendChild(btnDelaSerie);

          grid.appendChild(div);

          let allBtn = document.getElementById(`${data.results[i].id}`); // selection le bouton grace a son id relier a l'id de la serie
          allBtn.addEventListener("click", (e) => {
            grid.innerHTML = "";
            fetch(
              `https://api.themoviedb.org/3/tv/${e.target.id}?api_key=3341d636ea5e718cbe535387f5416379&language=fr` // envoie l'id du bouton qui est en faite l'id de la serie
            )
              .then((reponse) => reponse.json())
              .then((data) => {
                let div = document.createElement("div");
                div.setAttribute("class", "divPresentationSerie");
                div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${data.poster_path})`;
                let nomSerie = document.createElement("h2");
                let genre = document.createElement("p");
                let production = document.createElement("p");
                let enCour = document.createElement("p");
                let description = document.createElement("p");
                description.setAttribute("class", "descriptionSansLimiteText");
                let divFiltre = document.createElement("div");
                divFiltre.setAttribute("class", "divPresentationFiltre");
                let saisonsName;
                let imageSerie;
                let saisonDescription;
                let saisonNb;
                let btnSaisonDescription = document.createElement("button");
                btnSaisonDescription.setAttribute("id", `${data.id}`); // bouton de la ba dans la premiere pastille
                let lienBtnSaisonDescription = document.createElement("a");
                lienBtnSaisonDescription.setAttribute("target", "_blank");
                lienBtnSaisonDescription.setAttribute(
                  "class",
                  "lienBtnSaisonDescription"
                );

                nomSerie.innerHTML = data.name;
                genre.innerHTML =
                  "Genres : " +
                  data.genres[0].name +
                  " / " +
                  data.genres[1].name;
                production.innerHTML =
                  "Producteur : " +
                  data.networks[0].name +
                  " / " +
                  " Origine : " +
                  data.networks[0].origin_country +
                  " / " +
                  " Nbs d'épisodes : " +
                  data.number_of_episodes +
                  " / " +
                  " Nbs de saisons : " +
                  data.number_of_seasons;
                enCour.innerHTML =
                  "Date du dernier épisode : " +
                  data.last_episode_to_air.air_date +
                  " / " +
                  " Last saison : " +
                  data.last_episode_to_air.season_number +
                  " / " +
                  " Last épisode : " +
                  data.last_episode_to_air.episode_number;
                description.innerHTML = data.overview;
                btnSaisonDescription.innerHTML =
                  "Générer aléatoirement une video en FR/EN";

                div.appendChild(nomSerie);
                div.appendChild(enCour);
                div.appendChild(genre);
                div.appendChild(production);
                div.appendChild(description);
                div.appendChild(divFiltre);
                div.appendChild(lienBtnSaisonDescription);
                div.appendChild(btnSaisonDescription);
                div.appendChild(lienBtnSaisonDescription);
                grid.appendChild(div);
                // bouton ba description
                let btnSaisonBa = document.getElementById(`${data.id}`);

                btnSaisonBa.addEventListener("click", (e) => {
                  fetch(
                    `https://api.themoviedb.org/3/tv/${e.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
                  )
                    .then((reponse) => reponse.json())
                    .then((data) => {
                      let random = getRandomInt(data.results.length);
                      lienBtnSaisonDescription.innerHTML =
                        "&#128073; " +
                        `${data.results[random].name}` +
                        " &#128072;";

                      lienBtnSaisonDescription.href =
                        "https://www.youtube.com/watch?v=" +
                        `${data.results[random].key}`;
                    })
                    .catch((err) =>
                      fetch(
                        `https://api.themoviedb.org/3/tv/${e.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=en-US`
                      )
                        .then((reponse) => reponse.json())
                        .then((data) => {
                          let random = getRandomInt(data.results.length);
                          lienBtnSaisonDescription.innerHTML =
                            "&#128073; " +
                            `${data.results[random].name}` +
                            " &#128072;";

                          lienBtnSaisonDescription.href =
                            "https://www.youtube.com/watch?v=" +
                            `${data.results[random].key}`;
                        })
                        .catch(
                          (err) =>
                            (lienBtnSaison.innerHTML =
                              "Aucune bande annonce disponible")
                        )
                    );
                });

                for (let i = 0; i < data.seasons.length; i++) {
                  divSaison = document.createElement("div");
                  saisonsName = document.createElement("p");
                  imageSerie = document.createElement("img");
                  saisonDescription = document.createElement("p");
                  saisonDescription.setAttribute(
                    "class",
                    "descriptionSansLimiteText"
                  );
                  saisonNb = document.createElement("p");
                  saisonBouton = document.createElement("button"); //boutonBA
                  saisonBouton.setAttribute("class", `${e.target.id}`); //boutonBA
                  saisonBouton.setAttribute(
                    "id",
                    `${data.seasons[i].season_number}`
                  ); //boutonBA
                  let lienBtnSaison = document.createElement("a");

                  saisonsName.innerHTML = data.seasons[i].name;
                  imageSerie.src =
                    "https://image.tmdb.org/t/p/original" +
                    data.seasons[i].poster_path;
                  saisonDescription.innerHTML = data.seasons[i].overview;
                  saisonNb.innerHTML =
                    "Date du premier episode : " +
                    data.seasons[i].air_date +
                    " / " +
                    " Nbs d'épisodes : " +
                    data.seasons[i].episode_count;
                  saisonBouton.innerHTML =
                    "Générer aléatoirement une Ba en FR/EN";

                  divSaison.appendChild(saisonsName);
                  divSaison.appendChild(imageSerie);
                  divSaison.appendChild(saisonDescription);
                  divSaison.appendChild(saisonNb);
                  divSaison.appendChild(saisonBouton); // boutonBA
                  divSaison.appendChild(lienBtnSaison);
                  grid.appendChild(divSaison);

                  let btnSaisonBa = document.getElementById(
                    `${data.seasons[i].season_number}`
                  );

                  btnSaisonBa.addEventListener("click", (event) => {
                    fetch(
                      `https://api.themoviedb.org/3/tv/${event.target.classList.value}/season/${event.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
                    )
                      .then((reponse) => reponse.json())
                      .then((data) => {
                        lienBtnSaison.setAttribute("target", "_blank");
                        lienBtnSaison.setAttribute(
                          "class",
                          "lienBtnSaisonDescription"
                        );
                        let random = getRandomInt(data.results.length);

                        lienBtnSaison.innerHTML =
                          "&#128073; " +
                          `${data.results[random].name}` +
                          " &#128072;";

                        lienBtnSaison.href =
                          "https://www.youtube.com/watch?v=" +
                          `${data.results[random].key}`;
                      })
                      .catch((err) =>
                        fetch(
                          `https://api.themoviedb.org/3/tv/${event.target.classList.value}/season/${event.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=en-US`
                        )
                          .then((reponse) => reponse.json())
                          .then((data) => {
                            lienBtnSaison.setAttribute("target", "_blank");
                            lienBtnSaison.setAttribute(
                              "class",
                              "lienBtnSaisonDescription"
                            );
                            let random = getRandomInt(data.results.length);

                            lienBtnSaison.innerHTML =
                              "&#128073; " +
                              `${data.results[random].name}` +
                              " &#128072;";

                            lienBtnSaison.href =
                              "https://www.youtube.com/watch?v=" +
                              `${data.results[random].key}`;
                          })
                          .catch(
                            (err) =>
                              (lienBtnSaison.innerHTML =
                                "Aucune bande annonce disponible" +
                                " &#128556;")
                          )
                      );
                  });
                } //fin du for
              });
          }); // fin du bouton
        }
      });
  });

  //tableau stockant la recherche de l'utilisateur

  let tabInputrecherche = [];

  // Récuperation de ce qu'on tape dans l'input
  inputRecherche.addEventListener("keyup", () => {
    //si grid a creer du contenu alors il me le supprimer pour ne pas avoir des supperpositions et sinon il me lance ma fonction
    if (grid.children.length > 0) {
      grid.innerHTML = "";
      fetchEtCreationContenu();
    } else {
      fetchEtCreationContenu();
    }
  });

  // fonction fetch avec la creation
  function fetchEtCreationContenu() {
    document.getElementById("retour").style.visibility = "visible";
    let input = inputRecherche.value;
    //recuperation de la recherche pour retour en arriere
    // Ma strategie est d'enregistrer la derniere chaine de caractere que l'utilisateur tape, comme cela quand il va cliquer sur retour je vais reinjecter cette chaine de caractere dans l'input

    //je push la valeur de l'input sans un tableau vide
    tabInputrecherche.push(input);

    // j'utilise pop pour recuperer la derniere valeur de l'input
    let rechercheEnCour = tabInputrecherche.pop();
    // console.log(rechercheEnCour);

    //lorsque je clic que le bouton retour j'envoie la derniere valeur de l'input dans mon fetch
    let retour = document.getElementById("retour");
    retour.addEventListener("click", () => {
      grid.innerHTML = "";

      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=3341d636ea5e718cbe535387f5416379&language=fr&page=1&query=${rechercheEnCour}&include_adult=false`
      )
        .then((reponse) => reponse.json())
        .then((data) => {
          for (let i = 0; i < 10; i++) {
            // les creations
            let div = document.createElement("div");
            let nomSerie = document.createElement("h2");
            let DateDeSortie = document.createElement("p");
            let imageSerie = document.createElement("img");
            let resumeSerie = document.createElement("p");
            let voteDeLaserie = document.createElement("p");

            let btnDelaSerie = document.createElement("button");
            btnDelaSerie.setAttribute("id", `${data.results[i].id}`);
            btnDelaSerie.setAttribute("class", "btnClass");
            // l'affichage
            nomSerie.innerHTML = data.results[i].name;
            DateDeSortie.innerHTML = data.results[i].first_air_date;
            imageSerie.src =
              "https://image.tmdb.org/t/p/original" +
              data.results[i].poster_path;
            resumeSerie.innerHTML = data.results[i].overview;
            voteDeLaserie.innerHTML = data.results[i].vote_average;

            btnDelaSerie.innerHTML = "En savoir plus";

            // placement des elements
            div.appendChild(nomSerie);
            div.appendChild(DateDeSortie);
            div.appendChild(imageSerie);
            div.appendChild(resumeSerie);
            div.appendChild(voteDeLaserie);

            div.appendChild(btnDelaSerie);
            grid.appendChild(div);

            // Partie click pour en savoir plus

            let allBtn = document.getElementById(`${data.results[i].id}`);
            allBtn.addEventListener("click", (e) => {
              grid.innerHTML = "";
              fetch(
                `https://api.themoviedb.org/3/tv/${e.target.id}?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
              )
                .then((reponse) => reponse.json())
                .then((data) => {
                  let div = document.createElement("div");
                  div.setAttribute("class", "divPresentationSerie");
                  div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${data.poster_path})`;
                  let nomSerie = document.createElement("h2");
                  let genre = document.createElement("p");
                  let production = document.createElement("p");
                  let enCour = document.createElement("p");
                  let description = document.createElement("p");
                  description.setAttribute(
                    "class",
                    "descriptionSansLimiteText"
                  );
                  let divFiltre = document.createElement("div");
                  divFiltre.setAttribute("class", "divPresentationFiltre");
                  let saisonsName;
                  let imageSerie;
                  let saisonDescription;
                  let saisonNb;
                  let btnSaisonDescription = document.createElement("button");
                  btnSaisonDescription.setAttribute("id", `${data.id}`); // bouton de la ba dans la premiere pastille
                  let lienBtnSaisonDescription = document.createElement("a");
                  lienBtnSaisonDescription.setAttribute("target", "_blank");
                  lienBtnSaisonDescription.setAttribute(
                    "class",
                    "lienBtnSaisonDescription"
                  );

                  nomSerie.innerHTML = data.name;
                  genre.innerHTML =
                    "Genres : " +
                    data.genres[0].name +
                    " / " +
                    data.genres[1].name;
                  production.innerHTML =
                    "Producteur : " +
                    data.networks[0].name +
                    " / " +
                    " Origine : " +
                    data.networks[0].origin_country +
                    " / " +
                    " Nbs d'épisodes : " +
                    data.number_of_episodes +
                    " / " +
                    " Nbs de saisons : " +
                    data.number_of_seasons;
                  enCour.innerHTML =
                    "Date du dernier épisode : " +
                    data.last_episode_to_air.air_date +
                    " / " +
                    " Last saison : " +
                    data.last_episode_to_air.season_number +
                    " / " +
                    " Last épisode : " +
                    data.last_episode_to_air.episode_number;
                  description.innerHTML = data.overview;
                  btnSaisonDescription.innerHTML =
                    "Générer aléatoirement une video en FR/EN";

                  div.appendChild(nomSerie);
                  div.appendChild(enCour);
                  div.appendChild(genre);
                  div.appendChild(production);
                  div.appendChild(description);
                  div.appendChild(divFiltre);
                  div.appendChild(lienBtnSaisonDescription);
                  div.appendChild(btnSaisonDescription);
                  div.appendChild(lienBtnSaisonDescription);
                  grid.appendChild(div);
                  // bouton ba description
                  let btnSaisonBa = document.getElementById(`${data.id}`);

                  btnSaisonBa.addEventListener("click", (e) => {
                    fetch(
                      `https://api.themoviedb.org/3/tv/${e.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
                    )
                      .then((reponse) => reponse.json())
                      .then((data) => {
                        let random = getRandomInt(data.results.length);
                        lienBtnSaisonDescription.innerHTML =
                          "&#128073; " +
                          `${data.results[random].name}` +
                          " &#128072;";

                        lienBtnSaisonDescription.href =
                          "https://www.youtube.com/watch?v=" +
                          `${data.results[random].key}`;
                      })
                      .catch((err) =>
                        fetch(
                          `https://api.themoviedb.org/3/tv/${e.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=en-US`
                        )
                          .then((reponse) => reponse.json())
                          .then((data) => {
                            let random = getRandomInt(data.results.length);
                            lienBtnSaisonDescription.innerHTML =
                              "&#128073; " +
                              `${data.results[random].name}` +
                              " &#128072;";

                            lienBtnSaisonDescription.href =
                              "https://www.youtube.com/watch?v=" +
                              `${data.results[random].key}`;
                          })
                          .catch(
                            (err) =>
                              (lienBtnSaison.innerHTML =
                                "Aucune bande annonce disponible")
                          )
                      );
                  });

                  for (let i = 0; i < data.seasons.length; i++) {
                    divSaison = document.createElement("div");
                    saisonsName = document.createElement("p");
                    imageSerie = document.createElement("img");
                    saisonDescription = document.createElement("p");
                    saisonDescription.setAttribute(
                      "class",
                      "descriptionSansLimiteText"
                    );
                    saisonNb = document.createElement("p");
                    saisonBouton = document.createElement("button"); //boutonBA
                    saisonBouton.setAttribute("class", `${e.target.id}`); //boutonBA
                    saisonBouton.setAttribute(
                      "id",
                      `${data.seasons[i].season_number}`
                    ); //boutonBA
                    let lienBtnSaison = document.createElement("a");

                    saisonsName.innerHTML = data.seasons[i].name;
                    imageSerie.src =
                      "https://image.tmdb.org/t/p/original" +
                      data.seasons[i].poster_path;
                    saisonDescription.innerHTML = data.seasons[i].overview;
                    saisonNb.innerHTML =
                      "Date du premier episode : " +
                      data.seasons[i].air_date +
                      " / " +
                      " Nbs d'épisodes : " +
                      data.seasons[i].episode_count;
                    saisonBouton.innerHTML =
                      "Générer aléatoirement une Ba en FR/EN";

                    divSaison.appendChild(saisonsName);
                    divSaison.appendChild(imageSerie);
                    divSaison.appendChild(saisonDescription);
                    divSaison.appendChild(saisonNb);
                    divSaison.appendChild(saisonBouton); // boutonBA
                    divSaison.appendChild(lienBtnSaison);
                    grid.appendChild(divSaison);

                    let btnSaisonBa = document.getElementById(
                      `${data.seasons[i].season_number}`
                    );

                    btnSaisonBa.addEventListener("click", (event) => {
                      fetch(
                        `https://api.themoviedb.org/3/tv/${event.target.classList.value}/season/${event.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
                      )
                        .then((reponse) => reponse.json())
                        .then((data) => {
                          lienBtnSaison.setAttribute("target", "_blank");
                          lienBtnSaison.setAttribute(
                            "class",
                            "lienBtnSaisonDescription"
                          );
                          let random = getRandomInt(data.results.length);

                          lienBtnSaison.innerHTML =
                            "&#128073; " +
                            `${data.results[random].name}` +
                            " &#128072;";

                          lienBtnSaison.href =
                            "https://www.youtube.com/watch?v=" +
                            `${data.results[random].key}`;
                        })
                        .catch((err) =>
                          fetch(
                            `https://api.themoviedb.org/3/tv/${event.target.classList.value}/season/${event.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=en-US`
                          )
                            .then((reponse) => reponse.json())
                            .then((data) => {
                              lienBtnSaison.setAttribute("target", "_blank");
                              lienBtnSaison.setAttribute(
                                "class",
                                "lienBtnSaisonDescription"
                              );
                              let random = getRandomInt(data.results.length);

                              lienBtnSaison.innerHTML =
                                "&#128073; " +
                                `${data.results[random].name}` +
                                " &#128072;";

                              lienBtnSaison.href =
                                "https://www.youtube.com/watch?v=" +
                                `${data.results[random].key}`;
                            })
                            .catch(
                              (err) =>
                                (lienBtnSaison.innerHTML =
                                  "Aucune bande annonce disponible" +
                                  " &#128556;")
                            )
                        );
                    });
                  } //fin du for
                });
            }); // fin du bouton
          } // fin du for
        }); // fin du fetch
      //fin cc du fetch
    });
    //fin de recuperation

    //Partie utilisation de la valeur input
    // recupere la valeur de l'input, voir ligne 300 environs et l'injecte dans le fetch

    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=3341d636ea5e718cbe535387f5416379&language=fr&page=1&query=${input}&include_adult=false`
    )
      .then((reponse) => reponse.json())
      .then((data) => {
        for (let i = 0; i < 10; i++) {
          // les creations
          let div = document.createElement("div");
          let nomSerie = document.createElement("h2");
          let DateDeSortie = document.createElement("p");
          let imageSerie = document.createElement("img");
          let resumeSerie = document.createElement("p");
          let voteDeLaserie = document.createElement("p");

          let btnDelaSerie = document.createElement("button");
          btnDelaSerie.setAttribute("id", `${data.results[i].id}`);
          btnDelaSerie.setAttribute("class", "btnClass");
          // l'affichage
          nomSerie.innerHTML = data.results[i].name;
          DateDeSortie.innerHTML = data.results[i].first_air_date;
          imageSerie.src =
            "https://image.tmdb.org/t/p/original" + data.results[i].poster_path;
          resumeSerie.innerHTML = data.results[i].overview;
          voteDeLaserie.innerHTML = data.results[i].vote_average;

          btnDelaSerie.innerHTML = "En savoir plus";

          // placement des elements
          div.appendChild(nomSerie);
          div.appendChild(DateDeSortie);
          div.appendChild(imageSerie);
          div.appendChild(resumeSerie);
          div.appendChild(voteDeLaserie);

          div.appendChild(btnDelaSerie);
          grid.appendChild(div);

          // Partie click pour en savoir plus

          let allBtn = document.getElementById(`${data.results[i].id}`);
          allBtn.addEventListener("click", (e) => {
            grid.innerHTML = "";

            fetch(
              `https://api.themoviedb.org/3/tv/${e.target.id}?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
            )
              .then((reponse) => reponse.json())
              .then((data) => {
                let div = document.createElement("div");
                div.setAttribute("class", "divPresentationSerie");
                div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${data.poster_path})`;
                let nomSerie = document.createElement("h2");
                let genre = document.createElement("p");
                let production = document.createElement("p");
                let enCour = document.createElement("p");
                let description = document.createElement("p");
                description.setAttribute("class", "descriptionSansLimiteText");
                let divFiltre = document.createElement("div");
                divFiltre.setAttribute("class", "divPresentationFiltre");
                let saisonsName;
                let imageSerie;
                let saisonDescription;
                let saisonNb;
                let btnSaisonDescription = document.createElement("button");
                btnSaisonDescription.setAttribute("id", `${data.id}`); // bouton de la ba dans la premiere pastille
                let lienBtnSaisonDescription = document.createElement("a");
                lienBtnSaisonDescription.setAttribute("target", "_blank");
                lienBtnSaisonDescription.setAttribute(
                  "class",
                  "lienBtnSaisonDescription"
                );

                nomSerie.innerHTML = data.name;
                genre.innerHTML =
                  "Genres : " +
                  data.genres[0].name +
                  " / " +
                  data.genres[1].name;
                production.innerHTML =
                  "Producteur : " +
                  data.networks[0].name +
                  " / " +
                  " Origine : " +
                  data.networks[0].origin_country +
                  " / " +
                  " Nbs d'épisodes : " +
                  data.number_of_episodes +
                  " / " +
                  " Nbs de saisons : " +
                  data.number_of_seasons;
                enCour.innerHTML =
                  "Date du dernier épisode : " +
                  data.last_episode_to_air.air_date +
                  " / " +
                  " Last saison : " +
                  data.last_episode_to_air.season_number +
                  " / " +
                  " Last épisode : " +
                  data.last_episode_to_air.episode_number;
                description.innerHTML = data.overview;
                btnSaisonDescription.innerHTML =
                  "Générer aléatoirement une video en FR/EN";

                div.appendChild(nomSerie);
                div.appendChild(enCour);
                div.appendChild(genre);
                div.appendChild(production);
                div.appendChild(description);
                div.appendChild(divFiltre);
                div.appendChild(lienBtnSaisonDescription);
                div.appendChild(btnSaisonDescription);
                div.appendChild(lienBtnSaisonDescription);
                grid.appendChild(div);
                // bouton ba description
                let btnSaisonBa = document.getElementById(`${data.id}`);

                btnSaisonBa.addEventListener("click", (e) => {
                  fetch(
                    `https://api.themoviedb.org/3/tv/${e.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
                  )
                    .then((reponse) => reponse.json())
                    .then((data) => {
                      let random = getRandomInt(data.results.length);
                      lienBtnSaisonDescription.innerHTML =
                        "&#128073; " +
                        `${data.results[random].name}` +
                        " &#128072;";

                      lienBtnSaisonDescription.href =
                        "https://www.youtube.com/watch?v=" +
                        `${data.results[random].key}`;
                    })
                    .catch((err) =>
                      fetch(
                        `https://api.themoviedb.org/3/tv/${e.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=en-US`
                      )
                        .then((reponse) => reponse.json())
                        .then((data) => {
                          let random = getRandomInt(data.results.length);
                          lienBtnSaisonDescription.innerHTML =
                            "&#128073; " +
                            `${data.results[random].name}` +
                            " &#128072;";

                          lienBtnSaisonDescription.href =
                            "https://www.youtube.com/watch?v=" +
                            `${data.results[random].key}`;
                        })
                        .catch(
                          (err) =>
                            (lienBtnSaison.innerHTML =
                              "Aucune bande annonce disponible")
                        )
                    );
                });

                for (let i = 0; i < data.seasons.length; i++) {
                  divSaison = document.createElement("div");
                  saisonsName = document.createElement("p");
                  imageSerie = document.createElement("img");
                  saisonDescription = document.createElement("p");
                  saisonDescription.setAttribute(
                    "class",
                    "descriptionSansLimiteText"
                  );
                  saisonNb = document.createElement("p");
                  saisonBouton = document.createElement("button"); //boutonBA
                  saisonBouton.setAttribute("class", `${e.target.id}`); //boutonBA
                  saisonBouton.setAttribute(
                    "id",
                    `${data.seasons[i].season_number}`
                  ); //boutonBA
                  let lienBtnSaison = document.createElement("a");

                  saisonsName.innerHTML = data.seasons[i].name;
                  imageSerie.src =
                    "https://image.tmdb.org/t/p/original" +
                    data.seasons[i].poster_path;
                  saisonDescription.innerHTML = data.seasons[i].overview;
                  saisonNb.innerHTML =
                    "Date du premier episode : " +
                    data.seasons[i].air_date +
                    " / " +
                    " Nbs d'épisodes : " +
                    data.seasons[i].episode_count;
                  saisonBouton.innerHTML =
                    "Générer aléatoirement une Ba en FR/EN";

                  divSaison.appendChild(saisonsName);
                  divSaison.appendChild(imageSerie);
                  divSaison.appendChild(saisonDescription);
                  divSaison.appendChild(saisonNb);
                  divSaison.appendChild(saisonBouton); // boutonBA
                  divSaison.appendChild(lienBtnSaison);
                  grid.appendChild(divSaison);

                  let btnSaisonBa = document.getElementById(
                    `${data.seasons[i].season_number}`
                  );

                  btnSaisonBa.addEventListener("click", (event) => {
                    fetch(
                      `https://api.themoviedb.org/3/tv/${event.target.classList.value}/season/${event.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=fr`
                    )
                      .then((reponse) => reponse.json())
                      .then((data) => {
                        lienBtnSaison.setAttribute("target", "_blank");
                        lienBtnSaison.setAttribute(
                          "class",
                          "lienBtnSaisonDescription"
                        );
                        let random = getRandomInt(data.results.length);

                        lienBtnSaison.innerHTML =
                          "&#128073; " +
                          `${data.results[random].name}` +
                          " &#128072;";

                        lienBtnSaison.href =
                          "https://www.youtube.com/watch?v=" +
                          `${data.results[random].key}`;
                      })
                      .catch((err) =>
                        fetch(
                          `https://api.themoviedb.org/3/tv/${event.target.classList.value}/season/${event.target.id}/videos?api_key=3341d636ea5e718cbe535387f5416379&language=en-US`
                        )
                          .then((reponse) => reponse.json())
                          .then((data) => {
                            lienBtnSaison.setAttribute("target", "_blank");
                            lienBtnSaison.setAttribute(
                              "class",
                              "lienBtnSaisonDescription"
                            );
                            let random = getRandomInt(data.results.length);

                            lienBtnSaison.innerHTML =
                              "&#128073; " +
                              `${data.results[random].name}` +
                              " &#128072;";

                            lienBtnSaison.href =
                              "https://www.youtube.com/watch?v=" +
                              `${data.results[random].key}`;
                          })
                          .catch(
                            (err) =>
                              (lienBtnSaison.innerHTML =
                                "Aucune bande annonce disponible" +
                                " &#128556;")
                          )
                      );
                  });
                } //fin du for
              });
          }); // fin du bouton
        } // fin du for
      }); // fin du fetch
  } // fin de la function
});
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
