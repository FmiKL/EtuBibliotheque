# Plan de tests

Plan organisé selon la pyramide des tests, en commençant par les cas les plus simples.

> **Note :** les cas d'erreur et les effets de bord ne sont pas inclus.

## Tests unitaires

### Back-end

1. Connexion d'un utilisateur
   **Entrée :** identifiants valides
   **Résultat attendu :** un token JWT

2. Génération d'un token JWT
   **Entrée :** utilisateur valide
   **Résultat attendu :** un token contenant le bon login

3. Modification d'un étudiant
   **Entrée :** étudiant existant et nouvelles informations
   **Résultat attendu :** l'étudiant mis à jour

### Front-end

1. Guard d'authentification
   **Entrée :** utilisateur authentifié
   **Résultat attendu :** l'accès est autorisé

2. Interceptor d'authentification
   **Entrée :** token disponible
   **Résultat attendu :** le header `Authorization` est ajouté

3. Formulaire étudiant
   **Entrée :** données valides
   **Résultat attendu :** le formulaire est valide

## Tests d'intégration

### Back-end

1. Connexion
   **Entrée :** `POST /api/login` avec des identifiants valides
   **Résultat attendu :** statut `200` et token JWT

2. Création d'un étudiant
   **Entrée :** `POST /api/students` avec un étudiant valide
   **Résultat attendu :** statut `201` et étudiant créé

3. Consultation des étudiants
   **Entrée :** `GET /api/students`
   **Résultat attendu :** statut `200` et liste des étudiants

4. Modification d'un étudiant
   **Entrée :** `PUT /api/students/{id}` avec de nouvelles informations
   **Résultat attendu :** statut `200` et étudiant modifié

5. Suppression d'un étudiant
   **Entrée :** `DELETE /api/students/{id}`
   **Résultat attendu :** statut `204`

### Front-end

1. Chargement de la liste des étudiants
   **Entrée :** ouverture de la page `/students`
   **Résultat attendu :** les données de l'API sont affichées dans la liste

## Tests E2E

1. Authentification
   **Parcours :** se connecter avec des identifiants valides
   **Résultat attendu :** accès aux pages protégées

2. Gestion d'un étudiant
   **Parcours :** créer, consulter, modifier puis supprimer un étudiant
   **Résultat attendu :** chaque changement est visible dans l'interface
