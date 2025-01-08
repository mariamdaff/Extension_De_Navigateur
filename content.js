// on recupere les éléments HTML
const compteurVerre = document.getElementById('counter');
const boutonAjouter = document.getElementById('ajouter-un-verre');

chrome.storage.local.get(['compteur'], (resultat) => {
  let compteur = resultat.compteur || 0;
  compteurVerre.textContent = compteur;
});

boutonAjouter.addEventListener('click', () => {
  chrome.storage.local.get(['compteur'], (resultat) => {
    let nouveauCompte = (resultat.compteur || 0) + 1;

    if (nouveauCompte > 8) {
      nouveauCompte = 0;
      
    }

    chrome.storage.local.set({ compteur: nouveauCompte }, () => {
      compteurVerre.textContent = `Vous avez bu ${nouveauCompte} / 8 verres`;
    });
  });
});