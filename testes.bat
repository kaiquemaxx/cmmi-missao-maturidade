@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo  CMMI: Missao Maturidade - testes
echo  --------------------------------
echo.

node --version >nul 2>nul
if not %errorlevel%==0 (
    echo  Os testes precisam do Node.js 20 ou superior.
    echo  Baixe em https://nodejs.org/ e rode este arquivo de novo.
    echo.
    pause
    exit /b 1
)

call npm test
set "RESULTADO=%errorlevel%"

echo.
if "%RESULTADO%"=="0" (
    echo  Todos os testes passaram.
) else (
    echo  Algum teste falhou. Veja os detalhes acima.
)
echo.
pause
exit /b %RESULTADO%
