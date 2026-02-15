# Push to origin using PAT from .github-token (and optional .github-username).
# Usage: run from repo root: .\scripts\push-with-github-token.ps1 [branch]
# Create .github-token with one line: your GitHub PAT. Optionally .github-username with your GitHub username.

$ErrorActionPreference = 'Stop'
$repoRoot = (Get-Item $PSScriptRoot).Parent.FullName
Set-Location $repoRoot

$tokenPath = Join-Path $repoRoot '.github-token'
$userPath  = Join-Path $repoRoot '.github-username'

if (-not (Test-Path $tokenPath)) {
    Write-Error "Create .github-token in the repo root with one line: your GitHub Personal Access Token."
    exit 1
}

$raw = Get-Content $tokenPath -Raw
$token = if ($raw) { $raw.Trim() } else { '' }
if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Error ".github-token is empty. Put your GitHub PAT (ghp_...) on one line in that file."
    exit 1
}

$userRaw = if (Test-Path $userPath) { Get-Content $userPath -Raw } else { $null }
$username = if ($userRaw) { $userRaw.Trim() } else { (git config user.name) }
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Error "Set GitHub username: create .github-username with one line, or run: git config user.name YourGitHubUsername"
    exit 1
}

$branch = if ($args.Count -gt 0) { $args[0] } else { (git branch --show-current) }
$url = "https://${username}:${token}@github.com/FractiAI/psw.vibelandia.sing9.git"
git push $url $branch
