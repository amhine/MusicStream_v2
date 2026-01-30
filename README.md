
# 🎵 MusicStream – Application Fullstack de Gestion et Lecture de Musique

**MusicStream** est une application **fullstack** permettant de gérer, organiser et écouter de la musique.
Le projet est construit autour d’un **frontend Angular 17+** et d’un **backend Spring Boot**, communiquant via une **API REST**, avec une architecture moderne, scalable et maintenable.

---

## 📌 Versions du projet

### 🔹 V1 – Application Frontend Angular

* Gestion locale des tracks
* Stockage côté client (IndexedDB / localStorage)
* Lecture audio via HTMLAudioElement / Web Audio API

### 🔹 V2 – Application Fullstack Angular + Spring Boot

* Backend REST API avec Spring Boot
* Persistance des données en base de données
* Communication Frontend ↔ Backend
* Dockerisation & CI/CD
* Architecture professionnelle Front + Back

---

## 🚀 Objectifs du projet

* Développer une application musicale complète
* Appliquer les **bonnes pratiques Angular et Spring Boot**
* Mettre en place une **communication Frontend / Backend**
* Implémenter une **architecture en couches**
* Découvrir l’intégration DevOps (Docker, CI/CD)
* Respecter des standards de qualité de code et de tests

---

## 🧩 Fonctionnalités principales

### 🎼 Gestion des tracks (CRUD)

Chaque track contient :

* Titre (max 50 caractères)
* Artiste
* Description optionnelle (max 200 caractères)
* Date d’ajout (automatique)
* Durée (calculée)
* Catégorie musicale (pop, rock, rap, etc.)
* Fichier audio (MP3, WAV, OGG – max 10MB)

### 📚 Pages principales

* **Bibliothèque**

  * Liste des tracks
  * Recherche et filtres
* **Détail Track**

  * Informations complètes
  * Lecture audio
* **Lecteur Audio**

  * Play / Pause
  * Suivant / Précédent
  * Volume
  * Barre de progression

---

## 🏗️ Architecture Générale

### 📂 Structure du projet (Monorepo)

```
musicstream/
│
├── frontend/        # Application Angular
│
├── backend/         # API Spring Boot
│
├── docker-compose.yml
├── README.md
```

---

## 🖥️ Frontend – Angular 17+

### 🧱 Architecture

* Architecture modulaire avec **Lazy Loading**
* Services dédiés par domaine
* State Management avec **NgRx**

  * Store
  * Actions
  * Reducers
  * Effects
  * Selectors

### 🔧 Services principaux

* **AudioPlayerService**
* **TrackService**
* **AuthService** (bonus)
* **HTTP Interceptors**
* **Route Guards**

### 📡 Communication API

* Appels REST via `HttpClient`
* Gestion centralisée des erreurs
* Interceptor pour headers & auth

---

## ⚙️ Backend – Spring Boot

### 🧱 Architecture en couches

```
Controller → Service → Repository → Database
                 ↓
                DTO
```

### 🔑 Fonctionnalités Backend

* API REST CRUD pour les tracks
* Upload et gestion des fichiers audio
* Gestion des erreurs HTTP
* Validation des données
* Configuration CORS

### 🌍 CORS

Autorisation des requêtes depuis :

```
http://localhost:4200
```

### 📌 Endpoints principaux

```
GET    /api/tracks
GET    /api/tracks/{id}
POST   /api/tracks
PUT    /api/tracks/{id}
DELETE /api/tracks/{id}
```

---

## 🗄️ Base de Données

* Choix libre :

  * SQL (PostgreSQL / MySQL / H2)
  * ou NoSQL
* Persistance des métadonnées audio
* Gestion des relations et contraintes

---

## 🐳 Docker & DevOps

### 📦 Dockerisation

* Dockerfile frontend
* Dockerfile backend
* `docker-compose.yml` pour lancer toute l’application

```bash
docker compose up --build
```

### 🔄 CI/CD

* Build automatique frontend et backend
* Exécution des tests
* Vérification de la qualité du code

---

## 🧪 Tests

### Frontend

* Tests unitaires (Jasmine / Karma)
* Tests de services et composants

### Backend

* Tests unitaires (JUnit, Mockito)
* Tests d’intégration REST

---

## 🔐 Bonus (Optionnel)

* Authentification **ADMIN / USER**
* Sécurisation avec Spring Security & JWT
* Page de login Angular
* Intégration API de lyrics
* Upload d’image de couverture
* Drag & Drop des tracks

---

## 🛠️ Technologies utilisées

### Frontend

* Angular 17+
* TypeScript
* RxJS
* NgRx
* Reactive Forms
* HTMLAudioElement / Web Audio API
* Tailwind / Bootstrap

### Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security (optionnel)
* Maven

### DevOps

* Docker
* Docker Compose
* CI/CD (GitHub Actions / GitLab CI)

---

## ▶️ Installation et lancement

### Frontend

```bash
cd frontend
npm install
ng serve
```

### Backend

```bash
cd backend
mvn clean spring-boot:run
```

### Fullstack (Docker)

```bash
docker compose up --build
```
