export async function getGlassCount(callback) {
  let glassCount = await chrome.storage.local.get(["compteur"])
  return glassCount.compteur
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
