# Word count for manual section HTML (strip script/style and tags)
$technical = Get-ChildItem "interfaces\manuals\technical\*.html"
$user = Get-ChildItem "interfaces\manuals\user\*.html"
$all = @($technical) + @($user)
$results = @()
foreach ($f in $all) {
    $html = Get-Content -Path $f.FullName -Raw -Encoding UTF8
    $html = $html -replace '(?s)<script[^>]*>.*?</script>', ' '
    $html = $html -replace '(?s)<style[^>]*>.*?</style>', ' '
    $html = $html -replace '<[^>]+>', ' '
    $html = $html -replace '\s+', ' '
    $html = $html.Trim()
    $words = if ($html) { ($html -split '\s+').Count } else { 0 }
    $results += [PSCustomObject]@{ Name = $f.Name; Words = $words; Path = $f.FullName }
}
$results | Sort-Object Path | ForEach-Object { "$($_.Name): $($_.Words)" }
$total = ($results | Measure-Object -Property Words -Sum).Sum
Write-Host "---"
Write-Host "Total: $total"
Write-Host "Target per doc: 12000. Below 12k:" 
$results | Where-Object { $_.Words -lt 12000 } | ForEach-Object { "$($_.Name): $($_.Words) (need $(12000 - $_.Words) more)" }
