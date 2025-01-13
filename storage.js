// récupère le nombre de verre dans le storage
export async function getGlassCount() {
	const result = await chrome.storage.local.get("compteur");
	return result.compteur || 0;
}

// export function getGlassCount() {
//   return new Promise((resolve) => {
//     chrome.storage.local.get(["compteur"], (result) => {
//       resolve(result.compteur || 0);
//     });
//   });

// récupère le nombre de verres, vérifie si l'objectif est atteint
// mets à jour ce nombre dans le storage et retourne la nouvelle valeur
export async function incrementGlassCount() {
	const count = await getGlassCount();
	const newCount = count >= 8 ? 0 : count + 1;
	await chrome.storage.local.set({ compteur: newCount });
	return newCount;
}