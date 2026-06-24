# Plan de tests

Plan organisé selon la pyramide des tests, en commençant par les cas les plus simples.

> **Note :** les cas d'erreur et les effets de bord ne sont pas inclus.

## Tests unitaires

### Back-end

1. Connexion d'un utilisateur
   **Entrée :** identifiants valides
   **Résultat attendu :** un token JWT

2. Gestion d'un token JWT
   **Entrée :** utilisateur et token valides
   **Résultat attendu :** le token est généré, lu et validé

3. Gestion des étudiants
   **Entrée :** étudiant ou identifiant valide
   **Résultat attendu :** le résultat CRUD attendu

### Front-end

1. Service utilisateur
   **Entrée :** données d'inscription, identifiants ou token
   **Résultat attendu :** la requête attendue et la gestion du token

2. Service étudiant
   **Entrée :** appel CRUD avec des données valides
   **Résultat attendu :** la requête et la réponse API attendues

3. Composants d'authentification
   **Entrée :** formulaire valide
   **Résultat attendu :** inscription ou connexion effectuée

4. Composants étudiants
   **Entrée :** données d'un étudiant valides
   **Résultat attendu :** les données sont affichées ou l'action CRUD est effectuée

## Tests d'intégration

### Back-end

1. Connexion
   **Entrée :** `POST /api/login` avec des identifiants valides
   **Résultat attendu :** statut `200` et token JWT

2. Création d'un étudiant
   **Entrée :** `POST /api/students` avec un étudiant valide
   **Résultat attendu :** statut `201` et étudiant créé

3. Consultation des étudiants
   **Entrée :** `GET /api/students` et `GET /api/students/{id}`
   **Résultat attendu :** statut `200` et données attendues

4. Modification d'un étudiant
   **Entrée :** `PUT /api/students/{id}` avec de nouvelles informations
   **Résultat attendu :** statut `200` et étudiant modifié

5. Suppression d'un étudiant
   **Entrée :** `DELETE /api/students/{id}`
   **Résultat attendu :** statut `204`

## Tests E2E

1. Inscription
   **Parcours :** remplir et envoyer le formulaire d'inscription
   **Résultat attendu :** redirection vers la connexion

2. Connexion
   **Parcours :** se connecter avec des identifiants valides
   **Résultat attendu :** message de succès et token enregistré

3. Consultation des étudiants
   **Parcours :** ouvrir la liste et le détail d'un étudiant
   **Résultat attendu :** les informations sont affichées

4. Création d'un étudiant
   **Parcours :** remplir et envoyer le formulaire de création
   **Résultat attendu :** redirection vers le détail

5. Modification d'un étudiant
   **Parcours :** modifier et envoyer le formulaire
   **Résultat attendu :** données mises à jour et redirection vers le détail

6. Suppression d'un étudiant
   **Parcours :** confirmer la suppression depuis la liste
   **Résultat attendu :** étudiant supprimé de la liste
