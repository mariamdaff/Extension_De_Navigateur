// Récupérer le nombre de verres dans le storage
export async function getGlassCount() {
    const result = await chrome.storage.local.get("compteur");
    return result.compteur || 0;
}

// Incrémenter le nombre de verres et mettre à jour dans le storage
export async function incrementGlassCount() {
    const count = await getGlassCount();
    const newCount = count >= 8 ? 1 : count + 1;
    await chrome.storage.local.set({ compteur: newCount });
    return newCount;
}

// Fonction pour comparer la date du jour avec la dernière date enregistrée
export async function comparerDate() {
    const aujourdHui = new Date().toLocaleDateString('fr-FR'); // Format français
    const result = await chrome.storage.local.get("derniereDate");
    const derniereDate = result.derniereDate;

    if (derniereDate) {
        console.log(`Dernière date enregistrée : ${derniereDate}`);
        if (aujourdHui === derniereDate) {
            console.log("La date du jour correspond à la dernière date enregistrée.");
            await incrementGlassCount(); // Incrémenter si la date n'a pas changé
        } else {
            console.log("La date du jour est différente de la dernière date enregistrée.");
            await chrome.storage.local.set({ derniereDate: aujourdHui }); // Mise à jour de la date
            console.log("La nouvelle date a été mise à jour dans le Local Storage.");
            const resetCount = 0;
            await chrome.storage.local.set({ compteur: resetCount }); // Réinitialiser le compteur
        }
    } else {
        console.log("Aucune date n'était enregistrée. On ajoute la date du jour.");
        await chrome.storage.local.set({ derniereDate: aujourdHui }); // Ajouter la date actuelle
        const resetCount = 0;
        await chrome.storage.local.set({ compteur: resetCount }); // Initialiser le compteur
    }
}

// Appel de la fonction pour vérifier la date et gérer le compteur
comparerDate();
