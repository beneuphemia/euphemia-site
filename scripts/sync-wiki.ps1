# Mirror docs/ into the GitHub wiki.
#
# The GitHub wiki is a read-only mirror of the docs/ folder.
# docs/ is the source of truth (versioned, PR-reviewed).
# Run this after changing anything in docs/:
#
#   pwsh scripts/sync-wiki.ps1
#
# The sync is authoritative: the wiki will exactly match docs/.

$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$docsDir  = Join-Path $repoRoot "docs"
$wikiUrl  = "https://github.com/beneuphemia/euphemia-site.wiki.git"
$tmp      = Join-Path ([System.IO.Path]::GetTempPath()) "euphemia-site-wiki"

# docs filename -> wiki page filename (wiki page titles are title case)
$fileMap = @{
    "README.md"      = "Home.md"
    "development.md" = "Development.md"
    "science.md"     = "Science.md"
}

# relative markdown links in docs -> wiki page slugs
$linkMap = @{
    "](development.md)" = "](Development)"
    "](science.md)"     = "](Science)"
}

if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
git clone $wikiUrl $tmp | Out-Null

# Authoritative mirror: wipe wiki pages, then copy docs in.
Get-ChildItem -Path $tmp -Filter *.md | Remove-Item -Force

foreach ($entry in $fileMap.GetEnumerator()) {
    $content = Get-Content -LiteralPath (Join-Path $docsDir $entry.Key) -Raw
    foreach ($fix in $linkMap.GetEnumerator()) {
        $content = $content.Replace($fix.Key, $fix.Value)
    }
    Set-Content -LiteralPath (Join-Path $tmp $entry.Value) -Value $content -NoNewline -Encoding utf8
}

Set-Location $tmp
git add -A
git commit -m "Sync wiki from docs/" 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Output "Wiki already up to date."
} else {
    git push
    Write-Output "Wiki synced and pushed."
}
Set-Location $repoRoot
Remove-Item $tmp -Recurse -Force
