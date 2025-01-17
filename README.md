GESTION et SPECIFITES du PROJET



NOMBRE DE COLLABORATEURS pour le projet collectif : 4

TEMPS de conception et démonstration: 2 semaines

THEME de l'EXTENSION CHOISI et OBJECTIFS:

  *Traqueur d’hydratation journalier
  
  *Solution complète pour aider les utilisateurs à maintenir une hydratation adéquate, en fournissant des rappels réguliers, un suivi précis et des encouragements personnalisés.

ORGANISATION de TRAVAIL et OUTILS:
*Selon la répartition des tâches, en Mob/Pair/Split Programming

  *Outils utilisés :
  
    - Miro : Brainwriting/Kanban/Retroplanning/Plannification demo/Retrospective Speed Boat
    
    - Git et Git Hub
    
    - VSCode
    
    - Figma pour la maquette

MVP : FONCTIONNALITES et OBJECTIFS dans le CADRE du PROJET:

  *Objectifs:
  
    -  Suivi de la consommation d'eau : L'extension permet aux utilisateurs de suivre le nombre de verres d'eau consommés quotidiennement. Chaque ajout est enregistré et affiché dans la popup de l'extension.
    
    -  Notifications de rappel personnalisables : Des notifications régulières rappellent aux utilisateurs de boire de l'eau. Les intervalles entre les rappels peuvent être ajustés, et les notifications 
        peuvent être activées ou désactivées selon les préférences de l'utilisateur.
        
    -  Notifications après consommation : Après l'ajout d'un verre d'eau, des notifications encouragent l'utilisateur à continuer ses efforts. Lors de l'atteinte de l'objectif quotidien (par exemple, 8 verres),
        une notification spéciale félicite l'utilisateur.
        
    -  Intégration avec le contenu des pages web : Lors d'un rappel, l'extension communique avec un script de contenu pour modifier temporairement la couleur du texte des pages web actives,
        offrant ainsi un rappel visuel supplémentaire.
        
    -  Personnalisation des messages de motivation : En fonction du nombre de verres consommés, des messages de motivation personnalisés sont affichés dans la popup, encourageant l'utilisateur à poursuivre son objectif d'hydratation.
    
    -  Activation/désactivation des rappels : Les utilisateurs peuvent facilement activer ou désactiver les rappels via un bouton dans la popup, offrant un contrôle total sur les notifications.
    
    -  Stockage des données : L'extension utilise le stockage local de Chrome pour conserver le nombre de verres consommés, assurant ainsi la persistance des données même après la fermeture du navigateur.
    
    -  Modification de la couleur de la page active: Le texte de la page web active se modifie en couleur bleu a chaque apparition de la notification de rappel puis disparait au bout de 5 secondes.

VERSION 2: OBJECTIFS et FONCTIONNALITES pour une version 2 du projet (en cours de réalisation):

    *Lancer le démarrage de l’extension à l’ouverture du navigateur Chrome (branche dateHandler)
    
    *Récuperer la date du jour et la comparer a la derniere date stocker dans le local storage pour reset le compteur d’eau (branche dateHandler)
