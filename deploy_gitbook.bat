cmd /C gitbook build ./posts

cd posts/_book

git init
git add -A
git commit -m "deploy with GitBook"

git push -f https://github.com/taegon/python101.git master:gh-pages

pause