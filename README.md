# TP Amélioration Projet

Cet exercice consiste à reprendre un projet existant avec un Dockerfile pour cette “fausse” application.
Le but est de mettre en pratique ce que vous avez vu dans ce chapitre sur la sécurité.
Avant tout changement, il est important d’avoir une analyse du projet (CVE, taille de l’image ect) et de bien comprendre comment il fonctionne.
Noter ces informations et vos remarques dans un document. Procéder ensuite par étapes en corrigeant ou en améliorant un élément à la fois.
Il est important de documenter les changements que vous allez apporter et expliquer vos changements (utiliser les commentaires dans le Dockerfile par exemple).
A chaque étape, vérifier que l’application fonctionne toujours ! Seul le fichier Dockerfile et la commande de lancement du conteneur sont à modifier.
Le but n’est pas de créer un document ayant la plus belle présentation, le but est de montrer et justifier les changements que vous proposez.


## Exemple d’améliorations :

- Exécution avec un user non root
- Mention du port avec EXPOSE
- Image de base référencée par un sha256
- Définir des quotas pour l'exécution de votre conteneur
- Définir un healthcheck
- Réduite la surface d’attaque de l’image (réduire la taille de l’image)
- Corriger les CVE remontées par trivy


## Vérifications :

- Analyse avec trivy de l’image (viser le moins de CVE CRITICAL et HIGH)
- Analyse avec hadolint
- Consulter le contenu des layers avec dive
- Vérifier que le conteneur fonctionne (page web accessible / application fonctionne)

## Informations :

- Le projet est développé en typescript. Les sources typescripts sont transformées en livrable pour être exécuté par node lors de la phase de build.
- Construire un projet typescript est composé de 3 étapes :
- Les fichiers “package.json” et “package-lock.json” permettent d’installer les librairies avec “npm install”
- Les sources dans le dossier “src” et le fichier “tsconfig.json” forment le livrable avec la commande “npm run build”, le livrable sera les deux dossiers “dist” et “node_modules”
- Le moteur node lance l’application par son point d’entrée index.js
- Commande pour build l’image

```ssh
docker build . -t monapp:1.0.0 -f Dockerfile
```

- Commande pour lancer l’application

```ssh
docker run -it --rm -p 9000:80 monapp:1.0.0
# port 80 en variable d’environnement, port 9000 sur votre vm, consulter l’application sur ce port
```
- L’application a un healthcheck sur le endpoint /health
- Le port de l’application par défaut est 3000, il peut être changé par la variable d’environnement `PORT`
