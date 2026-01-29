# Push env from .env.nspfrnp to Vercel. Reads file only; no secrets in args.
# Run from repo root: powershell -ExecutionPolicy Bypass -File scripts/set-vercel-env.ps1
$ErrorActionPreference = "Stop"
$root = if ($PSScriptRoot) { Split-Path -Parent $PSScriptRoot } else { Get-Location | Select-Object -ExpandProperty Path }
$envPath = Join-Path $root ".env.nspfrnp"
if (-not (Test-Path $envPath)) {
    $envPath = Join-Path (Get-Location | Select-Object -ExpandProperty Path) ".env.nspfrnp"
}
if (-not (Test-Path $envPath)) { Write-Error ".env.nspfrnp not found at $root or current dir"; exit 1 }

$env = @{}
Get-Content $envPath | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith("#")) {
        $i = $line.IndexOf("=")
        if ($i -gt 0) {
            $k = $line.Substring(0, $i).Trim()
            $v = $line.Substring($i + 1).Trim().Trim('"').Trim("'")
            $env[$k] = $v
        }
    }
}

$token = $env["VERCEL_TOKEN"]
if (-not $token) { Write-Error "VERCEL_TOKEN not in .env.nspfrnp"; exit 1 }

if (-not $env["VIBELANDIA_SUPABASE_ANON_KEY"]) { $env["VIBELANDIA_SUPABASE_ANON_KEY"] = $env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] }
if (-not $env["VIBELANDIA_SUPABASE_URL"]) { $env["VIBELANDIA_SUPABASE_URL"] = $env["NEXT_PUBLIC_SUPABASE_URL"] }
if (-not $env["VIBELANDIA_PAYPAL_CLIENT_ID"]) { $env["VIBELANDIA_PAYPAL_CLIENT_ID"] = $env["PAYPAL_CLIENT_ID_SANDBOX"] }

$project = $env["VERCEL_PROJECT_ID"]; if (-not $project) { $project = "psw-vibelandia-sing4" }
$teamId = $env["VERCEL_TEAM_ID"]
$base = "https://api.vercel.com/v10/projects/" + [Uri]::EscapeDataString($project) + "/env"

$vars = @(
    @{ Key = "NEXT_PUBLIC_SUPABASE_URL"; Val = $env["NEXT_PUBLIC_SUPABASE_URL"]; Type = "plain" },
    @{ Key = "NEXT_PUBLIC_SUPABASE_ANON_KEY"; Val = $env["NEXT_PUBLIC_SUPABASE_ANON_KEY"]; Type = "secret" },
    @{ Key = "VIBELANDIA_SUPABASE_ANON_KEY"; Val = $env["VIBELANDIA_SUPABASE_ANON_KEY"]; Type = "secret" },
    @{ Key = "VIBELANDIA_SUPABASE_URL"; Val = $env["VIBELANDIA_SUPABASE_URL"]; Type = "plain" },
    @{ Key = "VIBELANDIA_PAYPAL_CLIENT_ID"; Val = $env["VIBELANDIA_PAYPAL_CLIENT_ID"]; Type = "plain" },
    @{ Key = "NEXT_PUBLIC_PAYPAL_CLIENT_ID"; Val = $env["NEXT_PUBLIC_PAYPAL_CLIENT_ID"]; Type = "plain" },
    @{ Key = "NEXT_PUBLIC_WEBSITE_URL"; Val = $env["NEXT_PUBLIC_WEBSITE_URL"]; Type = "plain" }
)

foreach ($e in $vars) {
    if (-not $e.Val) { continue }
    $url = $base + "?upsert=true"
    if ($teamId) { $url += "&teamId=" + [Uri]::EscapeDataString($teamId) }
    $body = @{ key = $e.Key; value = $e.Val; type = $e.Type; target = @("production", "preview") } | ConvertTo-Json
    try {
        $r = Invoke-RestMethod -Uri $url -Method Post -Headers @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" } -Body $body
        Write-Host "  OK $($e.Key)"
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        $msg = try { $_.ErrorDetails.Message } catch { "" }
        Write-Host "  FAIL $($e.Key) HTTP $code $msg"
    }
}
Write-Host "Done. Redeploy on Vercel for changes to take effect."
