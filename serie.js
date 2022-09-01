//recuperer la valeur de l'input

let inputRecherche = document.getElementById("rechercheInput");
let grid = document.querySelector(".grid");
let seriePopulaire = document.getElementById("seriePopulaire")
let serieOnAir = document.getElementById("serieOnAir")

//serie on air

serieOnAir.addEventListener("click", () => {
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
              let nomSerie = document.createElement("h2");
              let genre = document.createElement("p");
              let production = document.createElement("p");
              let saisonsName;
              let imageSerie;
              let saisonDescription;
              let saisonNb;

              nomSerie.innerHTML = data.name;
              genre.innerHTML =
                "Genres : " + data.genres[0].name + " / " + data.genres[1].name;
              production.innerHTML =
                "Producteur : " +
                data.networks[0].name +
                " origine : " +
                data.networks[0].origin_country +
                " nbs episodes : " +
                data.number_of_episodes +
                " nb saison : " +
                data.number_of_seasons;

              div.appendChild(nomSerie);
              div.appendChild(genre);
              div.appendChild(production);

              for (let i = 0; i < data.seasons.length; i++) {
                saisonsName = document.createElement("p");
                imageSerie = document.createElement("img");
                saisonDescription = document.createElement("p");
                saisonNb = document.createElement("p");


                saisonsName.innerHTML = data.seasons[i].name;
                imageSerie.src =
                  "https://image.tmdb.org/t/p/original" +
                  data.seasons[i].poster_path;
                saisonDescription.innerHTML = data.seasons[i].overview;
                saisonNb.innerHTML =
                  " Premier episode : " +
                  data.seasons[i].air_date +
                  " nbs episodes : " +
                  data.seasons[i].episode_count;


                div.appendChild(saisonsName);
                div.appendChild(imageSerie);
                div.appendChild(saisonDescription);
                div.appendChild(saisonNb);


              } //fin du for

              grid.appendChild(div);
            });
        });// fin du bouton

      }

    })
})






// serie populaire
seriePopulaire.addEventListener("click", () => {
  grid.innerHTML = "";
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
              let nomSerie = document.createElement("h2");
              let genre = document.createElement("p");
              let production = document.createElement("p");
              let saisonsName;
              let imageSerie;
              let saisonDescription;
              let saisonNb;

              nomSerie.innerHTML = data.name;
              genre.innerHTML =
                "Genres : " + data.genres[0].name + " / " + data.genres[1].name;
              production.innerHTML =
                "Producteur : " +
                data.networks[0].name +
                " origine : " +
                data.networks[0].origin_country +
                " nbs episodes : " +
                data.number_of_episodes +
                " nb saison : " +
                data.number_of_seasons;

              div.appendChild(nomSerie);
              div.appendChild(genre);
              div.appendChild(production);

              for (let i = 0; i < data.seasons.length; i++) {
                saisonsName = document.createElement("p");
                imageSerie = document.createElement("img");
                saisonDescription = document.createElement("p");
                saisonNb = document.createElement("p");

                saisonsName.innerHTML = data.seasons[i].name;
                imageSerie.src =
                  "https://image.tmdb.org/t/p/original" +
                  data.seasons[i].poster_path;
                saisonDescription.innerHTML = data.seasons[i].overview;
                saisonNb.innerHTML =
                  " Premier episode : " +
                  data.seasons[i].air_date +
                  " nbs episodes : " +
                  data.seasons[i].episode_count;

                div.appendChild(saisonsName);
                div.appendChild(imageSerie);
                div.appendChild(saisonDescription);
                div.appendChild(saisonNb);
              } //fin du for

              grid.appendChild(div);
            });
        });// fin du bouton

      }

    })
})
//retour en arriere
//tableau stockant la recherche

let tabInputrecherche =[]

//Serie que l'on recherche

// partie recherche

// recupere ce qu'on tape dans l'input
inputRecherche.addEventListener("keyup", () => {
  if (grid.children.length > 0) {
    grid.innerHTML = "";
    fetchEtCreationContenu();
  } else {
    fetchEtCreationContenu();
  }
});

// fonction fetch avec la creation
function fetchEtCreationContenu() {
  let input = inputRecherche.value;
  //recuperation de la recherche pour retour en arriere
  tabInputrecherche.push(input)
 
  let rechercheEnCour = tabInputrecherche.pop()
  console.log(rechercheEnCour)
  let retour = document.getElementById("retour")
  retour.addEventListener("click", () =>{
    grid.innerHTML = "";
    //cc du fetch 
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
                div.setAttribute("class", "divPresentationSerie")
                div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${data.poster_path})`
                let nomSerie = document.createElement("h2");
                let genre = document.createElement("p");
                let production = document.createElement("p");
                let enCour = document.createElement("p");
                let description = document.createElement("p");
                let divFiltre = document.createElement("div")
                divFiltre.setAttribute("class", "divPresentationFiltre")
                let saisonsName;
                let imageSerie;
                let saisonDescription;
                let saisonNb;
  
                nomSerie.innerHTML = data.name;
                genre.innerHTML =
                  "Genres : " + data.genres[0].name + " / " + data.genres[1].name;
                production.innerHTML =
                  "Producteur : " +
                  data.networks[0].name +
                  " origine : " +
                  data.networks[0].origin_country +
                  " nbs episodes : " +
                  data.number_of_episodes +
                  " nb saison : " +
                  data.number_of_seasons;
                enCour.innerHTML = "Date de l'episode : " + data.last_episode_to_air.air_date + " saison en cour : "
                  + data.last_episode_to_air.season_number + " épisode en cour : " + data.last_episode_to_air.episode_number
                description.innerHTML = data.overview
                
                  
                div.appendChild(nomSerie);
                div.appendChild(enCour);
                div.appendChild(genre);
                div.appendChild(production);
                div.appendChild(description)
                div.appendChild(divFiltre)
                grid.appendChild(div);
  
  
                for (let i = 0; i < data.seasons.length; i++) {
                  divSaison = document.createElement("div")
                  saisonsName = document.createElement("p");
                  imageSerie = document.createElement("img");
                  saisonDescription = document.createElement("p");
                  saisonNb = document.createElement("p");
  
  
                  saisonsName.innerHTML = data.seasons[i].name;
                  imageSerie.src =
                    "https://image.tmdb.org/t/p/original" +
                    data.seasons[i].poster_path;
                  saisonDescription.innerHTML = data.seasons[i].overview;
                  saisonNb.innerHTML =
                    " Premier episode : " +
                    data.seasons[i].air_date +
                    " nbs episodes : " +
                    data.seasons[i].episode_count;
  
  
                  divSaison.appendChild(saisonsName);
                  divSaison.appendChild(imageSerie);
                  divSaison.appendChild(saisonDescription);
                  divSaison.appendChild(saisonNb);
                  grid.appendChild(divSaison)
  
                } //fin du for
  
  
  
              });
          });// fin du bouton
        } // fin du for
      }); // fin du fetch
      //fin cc du fetch
  
})
  //fin de recuperation
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
              div.setAttribute("class", "divPresentationSerie")
              div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${data.poster_path})`
              let nomSerie = document.createElement("h2");
              let genre = document.createElement("p");
              let production = document.createElement("p");
              let enCour = document.createElement("p");
              let description = document.createElement("p");
              let divFiltre = document.createElement("div")
              divFiltre.setAttribute("class", "divPresentationFiltre")
              let saisonsName;
              let imageSerie;
              let saisonDescription;
              let saisonNb;

              nomSerie.innerHTML = data.name;
              genre.innerHTML =
                "Genres : " + data.genres[0].name + " / " + data.genres[1].name;
              production.innerHTML =
                "Producteur : " +
                data.networks[0].name +
                " origine : " +
                data.networks[0].origin_country +
                " nbs episodes : " +
                data.number_of_episodes +
                " nb saison : " +
                data.number_of_seasons;
              enCour.innerHTML = "Date de l'episode : " + data.last_episode_to_air.air_date + " saison en cour : "
                + data.last_episode_to_air.season_number + " épisode en cour : " + data.last_episode_to_air.episode_number
              description.innerHTML = data.overview
              
                
              div.appendChild(nomSerie);
              div.appendChild(enCour);
              div.appendChild(genre);
              div.appendChild(production);
              div.appendChild(description)
              div.appendChild(divFiltre)
              grid.appendChild(div);


              for (let i = 0; i < data.seasons.length; i++) {
                divSaison = document.createElement("div")
                saisonsName = document.createElement("p");
                imageSerie = document.createElement("img");
                saisonDescription = document.createElement("p");
                saisonNb = document.createElement("p");


                saisonsName.innerHTML = data.seasons[i].name;
                imageSerie.src =
                  "https://image.tmdb.org/t/p/original" +
                  data.seasons[i].poster_path;
                saisonDescription.innerHTML = data.seasons[i].overview;
                saisonNb.innerHTML =
                  " Premier episode : " +
                  data.seasons[i].air_date +
                  " nbs episodes : " +
                  data.seasons[i].episode_count;


                divSaison.appendChild(saisonsName);
                divSaison.appendChild(imageSerie);
                divSaison.appendChild(saisonDescription);
                divSaison.appendChild(saisonNb);
                grid.appendChild(divSaison)

              } //fin du for



            });
        });// fin du bouton
      } // fin du for
    }); // fin du fetch
} // fin de la function






