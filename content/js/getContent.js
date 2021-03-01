var getGithubInfo = () => {
  document.querySelector(".textContainer a").addEventListener("click", async () => {
      let url = "https://api.github.com/users/" + document.querySelector(".textContainer input").value;
      try {
        await fetch(url)
          .then(response => {
            if (response.status === 404) {
                alert("Este usuário não existe. Cheque se digitou o nome corretamente!");
            }
            else {
              return response.json();
              }
            })
          .then(data => {
            try {
              document.querySelector(".userImage img").src = data.avatar_url;
              document.querySelector(".userName h2").innerText = data.name;
              document.querySelector(".userName h3").innerText = `@${data.login}`;
              data.location ? document.querySelector(".userLocal p:nth-child(2)").innerText = data.location : document.querySelector(".userLocal p:nth-child(2)").innerText = "Não disponível";
              data.company ? document.querySelector(".userLocal p:nth-child(4)").innerText = data.company : document.querySelector(".userLocal p:nth-child(4)").innerText = "Não disponível";
              document.querySelector(".userFollowers p:nth-child(2)").innerText = data.followers;
              document.querySelector(".userFollowers p:nth-child(4)").innerText = data.following;
              document.querySelector(".numberRepo h1").innerText = data.public_repos;
              getReposInfo();

              document.querySelector(".searchContainer").style.display = "none";
              document.querySelector(".resultContainer").style.display = "block";
            }
            catch(err) {
              return new Error("Ops! Algo deu errado :c, Tente recarregar a página!");
              }
            }
          )
      }
      catch(err) {
        return new Error("Ops! Algo deu errado :c, Tente recarregar a página!");
      }
  })
}

getGithubInfo();

let getReposInfo = async () => {
  try {
    let url_repos = `https://api.github.com/users/${document.querySelector(".textContainer input").value}/repos`;
     await fetch(url_repos)
      .then(responseRepos => {
        if (!responseRepos.ok) {
          return new Error("Algo deu errado ao buscar as repos!");
        }
        else {
          return responseRepos.json()
        }
      })
      .then(dataRepos => {
        if (dataRepos == "") {
          document.querySelector(".userRepoContainer ul").innerText = "";
        }
        else {
          for(var i = 0; i < dataRepos.length; i++) {
            let newLi = document.createElement("li"),
                newH2 = document.createElement("h2"),
                newP = document.createElement("p"),
                newDiv = document.createElement("div"),
                newI = document.createElement("i");

            newH2.innerText = dataRepos[i].name; // Add the name of the Repo
            newP.innerText = dataRepos[i].description; // Add the description of the repo
            newDiv.className = "userRepoInfo"; // Add the div with info about the repo
            newLi.append(newH2, newP, newDiv);

            newI.className = "fas fa-star";
            newP = document.createElement("p");
            newP.innerText = dataRepos[i].watchers;
            newDiv.append(newI, newP)

            newI = document.createElement("i");
            newI.className = "fas fa-project-diagram";
            newP = document.createElement("p");
            newP.innerText = dataRepos[i].forks;
            newDiv.append(newI, newP)

            newI = document.createElement("i");
            newI.className = "fas fa-file-code";
            newP = document.createElement("p");
            newP.innerText = dataRepos[i].language ? dataRepos[i].language : "Indisponível";
            newDiv.append(newI, newP)

            newA = document.createElement("a");
            newA.href = dataRepos[i].html_url;
            newA.target = "_blank";
            newA.rel = "noreferrer";
            newI = document.createElement("i");
            newI.className = "fas fa-external-link-alt";
            newA.append(newI)
            newDiv.append(newA);

            document.querySelector(".userRepoContainer ul").append(newLi);
          }
        }
      })
    }
  catch(err) {
    return new Error("Requisição falhou")
  }
}
