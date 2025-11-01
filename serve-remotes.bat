@echo off
setlocal
set "ROOT=%~dp0"

if not exist "%ROOT%package.json" (
  echo Unable to locate package.json in "%ROOT%".
  echo Please place this script in the repository root.
  exit /b 1
)

start "auth" cmd /k "cd /d ""%ROOT%"" && npm run serve:auth"
start "dashboard" cmd /k "cd /d ""%ROOT%"" && npm run serve:dashboard"
start "user" cmd /k "cd /d ""%ROOT%"" && npm run serve:user"
start "product" cmd /k "cd /d ""%ROOT%"" && npm run serve:product"

rem Uncomment the next line if you want the host shell to start as well.
rem start "host" cmd /k "cd /d ""%ROOT%"" && npm run serve"

echo Launched remote shells. You can close this window.
