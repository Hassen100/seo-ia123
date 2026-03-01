@echo off
echo ====================================
echo   DEPLOIEMENT GITHUB PAGES
echo ====================================
echo.

cd /d "C:\Users\VIP INFO\Desktop\magasin-jeux"

echo [1/7] Initialisation de Git...
git init

echo [2/7] Ajout des fichiers...
git add .

echo [3/7] Creation du commit...
git commit -m "Initial commit - SEO-IA Angular Project"

echo [4/7] Connexion au repository GitHub...
git remote add origin https://github.com/Hassen100/SEO-IA.git

echo [5/7] Configuration de la branche main...
git branch -M main

echo [6/7] Premier push sur GitHub...
git push -u origin main

echo.
echo ====================================
echo   TERMINE !
echo ====================================
echo.
echo Votre site sera disponible sur:
echo https://hassen100.github.io/SEO-IA/
echo.
echo ETAPE SUIVANTE:
echo 1. Allez sur https://github.com/Hassen100/SEO-IA
echo 2. Settings > Pages
echo 3. Source: GitHub Actions
echo 4. Patientez 2-5 minutes
echo.
pause
