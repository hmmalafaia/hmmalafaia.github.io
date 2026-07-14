@echo off
setlocal

:: Define o caminho do arquivo bitcoin.conf
set CONF_PATH=Q:\bitcoin\bitcoin.conf

:: PROTECAO: Verifica se o Bitcoin Core esta no ar e com o RPC pronto
bitcoin-cli -conf="%CONF_PATH%" uptime >nul 2>&1
if %errorlevel% neq 0 (
    echo [Aviso] O Bitcoin Core nao esta rodando ou o servidor RPC ainda nao esta pronto.
    echo O script sera abortado para evitar erros.
    exit /b
)

:: Define o tempo de banimento em segundos (ex: 31536000 para 1 ano)
set BAN_TIME=31536000

:: Define o arquivo de log (salva como knots_ban_log.txt na mesma pasta onde o .bat esta)
set LOG_FILE=%~dp0knots_ban_log.txt

echo Verificando conexoes do Bitcoin Core em busca de nodes Knots...

:: Chama o PowerShell para ler o JSON, extrair enderecos, banir e gravar no log
powershell -NoProfile -Command ^
  "$peers = bitcoin-cli -conf=\"$env:CONF_PATH\" getpeerinfo | ConvertFrom-Json; " ^
  "if ($peers) { " ^
  "  foreach ($peer in $peers) { " ^
  "    if ($peer.subver -match 'Knots') { " ^
  "      $addr = $peer.addr -replace ':\d+$','' -replace '\[|\]',''; " ^
  "      $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'; " ^
  "      Write-Host \"Banindo node Knots: $addr\"; " ^
  "      bitcoin-cli -conf=\"$env:CONF_PATH\" setban $addr 'add' $env:BAN_TIME; " ^
  "      bitcoin-cli -conf=\"$env:CONF_PATH\" disconnectnode $addr; " ^
  "      Add-Content -Path $env:LOG_FILE -Value \"$timestamp;$addr\"; " ^
  "    } " ^
  "  } " ^
  "}"

echo Verificacao concluida.
endlocal
