document.querySelector(".goBack i").addEventListener("click", () => {
    document.querySelector(".searchContainer").style.display = "flex";
    document.querySelector(".resultContainer").style.display = "none";
    document.querySelector(".userRepoContainer ul").innerText = "";
})
