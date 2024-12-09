# Module_347_Labo2  
Cette app permet de lister les plantes pour savoir celles que l'on possède.  

# Instructions d'installation et d'exécution :  
1. Assurez-vous d'avoir Docker installé sur votre machine.  
2. Clonez ce dépôt sur votre machine locale :  
git clone <URL_du_dépôt>  

3. Accédez au répertoire cloné :  
cd module_347_labo2  

4. Démarrez les conteneurs avec Docker Compose :  
docker-compose up  

5. Une fois les conteneurs démarrés, accédez à l'application via l'URL suivante :  
http://localhost:<port>  
# Architecture de l'application :  
Bases de données :  
1. Dev :  
   - Permet de modifier et tester le front-end.  
   - Connectée à une base de données dédiée au développement.  

2. Prod :  
   - Image construite à l’aide du Dockerfile.  
   - Utilisée pour le déploiement final.  
Docker :  
 - Dev : Configuré pour le développement avec des volumes pour des modifications en temps réel.  
 - Prod : Génère une image stable pour le déploiement.  
# Les deux environnements choisis :  

1. Développement (Dev) :  
   - Adapté pour les modifications et tests locaux.  
   - Front-end éditable directement via le code source.  

2. Production (Prod) :  
   - Utilise une image Docker construite.  
   - Préparée pour être déployée sur un serveur ou dans un environnement cloud.  
