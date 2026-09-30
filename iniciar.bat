@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

set "PORTA=8080"
set "URL=http://localhost:%PORTA%"

rem Servidor em Python com o tipo do .js forcado: o registro do Windows as vezes
rem declara .js como text/plain, e o navegador recusa carregar modulos assim.
set "PYSERVIDOR=-c "import http.server as h;h.SimpleHTTPRequestHandler.extensions_map['.js']='text/javascript';h.test(HandlerClass=h.SimpleHTTPRequestHandler,port=%PORTA%)""

echo.
echo  CMMI: Missao Maturidade
echo  -----------------------
echo.

rem Python primeiro: sobe na hora, sem baixar nada. Depois o launcher py, depois o Node.js.
python --version >nul 2>nul
if errorlevel 1 goto tentar_py
set "SERVIDOR=python %PYSERVIDOR%"
goto iniciar

:tentar_py
py --version >nul 2>nul
if errorlevel 1 goto tentar_node
set "SERVIDOR=py %PYSERVIDOR%"
goto iniciar

:tentar_node
node --version >nul 2>nul
if errorlevel 1 goto sem_servidor
set "SERVIDOR=npx --yes http-server -p %PORTA% -c-1"
goto iniciar

:sem_servidor
echo  Nao encontrei Python nem Node.js instalados.
echo  Instale um deles e rode este arquivo de novo:
echo    Python:  https://www.python.org/downloads/
echo    Node.js: https://nodejs.org/
echo.
pause
exit /b 1

:iniciar
echo  Endereco: %URL%
echo.
echo  O navegador vai abrir em alguns segundos.
echo  Para encerrar, feche esta janela ou aperte Ctrl+C.
echo.

rem Abre o navegador depois de ~3 segundos, enquanto o servidor sobe nesta janela.
start "" /b cmd /c "ping -n 4 127.0.0.1 >nul & start "" %URL%"

%SERVIDOR%
