// récupère le nombre de verre dans le local storage
export async function getGlassCount() {
  const result = await chrome.storage.local.get("compteur"); // récupère la clé "compteur"
  return result.compteur || 0; // si "compteur" existe, on retourne sa valeur, sinon 0
}

// récupère le nombre de verres, vérifie si l'objectif est atteint
// mets à jour ce nombre dans le local storage et retourne la nouvelle valeur
export async function incrementGlassCount() {
  const count = await getGlassCount(); // Récupère le nombre actuel de verres
  const newCount = count + 1; // on incrémente
  await chrome.storage.local.set({ compteur: newCount }); // Sauvegarde le nouveau nombre de verres
  return newCount; // Retourne la nouvelle valeur
}
