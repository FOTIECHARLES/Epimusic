
# Prérequis et Installation du Projet

Avant de commencer, assurez-vous que vous avez bien les éléments suivants installés sur votre machine :

## Prérequis

1. **PHP** : Vérifiez que PHP est installé, minimum la version 8.1 en exécutant :
   ```bash
   php -v
   ```

2. **Extension PHP XML** : Assurez-vous que l'extension `php-xml` est installée. Vous pouvez vérifier si elle est activée avec :
   ```bash
   php -m | grep xml
   ```
   Si l'extension **php-xml** n'est pas installée, vous pouvez l'ajouter avec la commande suivante :
   ```bash
   sudo apt-get install php-xml
   ```

   Si vous utilisez un environnement Docker ou un autre gestionnaire de versions PHP, assurez-vous d'ajouter cette extension dans votre environnement isolé.

## Installation

### 1. Cloner le projet

Clonez le projet sur votre machine avec la commande suivante :

```bash
git clone <URL-du-projet>
cd <nom-du-dossier>
```

### 2. Installer les dépendances du côté client

Dans le dossier `client`, installez les dépendances Node.js avec `npm` :

```bash
cd client
npm install
```

Une fois les dépendances installées, lancez l'application front-end avec :

```bash
npm start
```

Cela démarrera le serveur de développement pour le côté client de l'application.

### 3. Installer les dépendances du côté serveur

Dans le dossier `server`, installez les dépendances PHP avec Composer :

```bash
cd ../server
composer install
```

### 4. Lancer le serveur Symfony

Pour démarrer le serveur Symfony, utilisez la commande suivante :

```bash
symfony server:start
```

Cela démarrera l'application Symfony sur votre machine, généralement accessible via `http://localhost:8000`.

## Résumé des commandes

```bash
# Installer les dépendances du client
cd client
npm install
npm start

# Installer les dépendances du serveur
cd ../server
composer install

# Lancer le serveur Symfony
symfony server:start
```
---

## Configuration des Clés API

Ce projet nécessite une clé secrète Stripe pour fonctionner. Pour des raisons de sécurité, la clé **Stripe Secret Key** est stockée dans le fichier `.env` qui **ne doit pas être partagé** publiquement.

### Récupérer une clé Stripe

1. Créez un compte sur [Stripe](https://stripe.com).
2. Allez dans la section "API" dans votre tableau de bord Stripe.
3. Récupérez votre **clé secrète** dans la section "Clés API".
4. Ajoutez cette clé dans votre fichier `.env` sous la forme suivante :

      ```STRIPE_SECRET_KEY="votre_clé_secrète"


### Notes supplémentaires

- **Vérification des versions** : Assurez-vous que vous utilisez des versions de PHP et Node.js compatibles avec le projet.
- **Configuration de l'environnement** : Si nécessaire, configurez votre environnement (base de données, variables d'environnement, etc.) selon les instructions spécifiques de votre projet.

---

Si vous avez des problèmes pendant l'installation, n'hésitez pas à me contacter!
