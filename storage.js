export function getGlassCount(callback) {
  chrome.storage.local.get(["compteur"], (resultat) => {
    callback(resultat.compteur || 0);
  });
}

export function incrementGlassCount(callback) {
  chrome.storage.local.get(["compteur"], (resultat) => {
    let nouveauCompte = (resultat.compteur || 0) + 1;
    if (nouveauCompte > 8) {
      nouveauCompte = 0;
    }
    chrome.storage.local.set({ compteur: nouveauCompte }, () => {
      callback(nouveauCompte);
    });
  });
}
