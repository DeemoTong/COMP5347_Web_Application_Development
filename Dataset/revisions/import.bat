@echo off
for %%f in (*.json) do (
"mongoimport.exe" --jsonArray --host REMOTEIP:port --db wikipedia --collection revisions --file %%~nf.json
)