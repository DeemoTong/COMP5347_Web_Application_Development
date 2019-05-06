@echo off
for %%f in (*.json) do (
"mongoimport.exe" --jsonArray --host 45.77.28.72 --db wikipedia --collection revisions --file %%~nf.json
)