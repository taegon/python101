cd _publish

cp -R ../_book/* .

git add .

git commit -a -m "Update docs"

git push origin gh-pages

pause
cd ..