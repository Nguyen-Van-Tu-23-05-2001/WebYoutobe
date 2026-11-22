$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:5000/")
$listener.Start()
$baseDir = "C:\Users\91850285\.gemini\antigravity\scratch\car-hud-web"
Write-Host "Server listening on http://localhost:5000/ with Live YouTube Search API..."

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $reqPath = $context.Request.Url.LocalPath

        # Handle Live YouTube Search API: /api/search?q=...
        if ($reqPath -eq "/api/search") {
            $q = $context.Request.QueryString["q"]
            if ([string]::IsNullOrWhiteSpace($q)) {
                $jsonBytes = [System.Text.Encoding]::UTF8.GetBytes("[]")
            } else {
                try {
                    $url = "https://www.youtube.com/results?search_query=" + [System.Uri]::EscapeDataString($q)
                    $html = (Invoke-WebRequest -Uri $url -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -UseBasicParsing -TimeoutSec 6).Content
                    $idx = $html.IndexOf('var ytInitialData = ')
                    $results = @()
                    if ($idx -ge 0) {
                        $sub = $html.Substring($idx + 20)
                        $endIdx = $sub.IndexOf(';</script>')
                        $jsonStr = $sub.Substring(0, $endIdx)
                        $data = $jsonStr | ConvertFrom-Json
                        $items = $data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
                        foreach ($item in $items) {
                            if ($item.videoRenderer) {
                                $v = $item.videoRenderer
                                $results += [PSCustomObject]@{
                                    id = $v.videoId
                                    title = if ($v.title.runs) { $v.title.runs[0].text } else { "" }
                                    channel = if ($v.ownerText.runs) { $v.ownerText.runs[0].text } else { "YouTube" }
                                    views = if ($v.viewCountText.simpleText) { $v.viewCountText.simpleText } else { "" }
                                    time = if ($v.lengthText.simpleText) { $v.lengthText.simpleText } else { "Video" }
                                    thumb = "https://i.ytimg.com/vi/$($v.videoId)/hqdefault.jpg"
                                }
                                if ($results.Count -ge 12) { break }
                            }
                        }
                    }
                    $jsonOut = if ($results.Count -gt 0) { $results | ConvertTo-Json -Compress } else { "[]" }
                    $jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonOut)
                } catch {
                    $jsonBytes = [System.Text.Encoding]::UTF8.GetBytes("[]")
                }
            }
            $context.Response.ContentType = "application/json; charset=utf-8"
            $context.Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
            $context.Response.Headers.Add("Access-Control-Allow-Origin", "*")
            $context.Response.ContentLength64 = $jsonBytes.Length
            $context.Response.OutputStream.Write($jsonBytes, 0, $jsonBytes.Length)
            $context.Response.OutputStream.Close()
            continue
        }

        # Static file serving
        if ($reqPath -eq "/" -or $reqPath -eq "") { $reqPath = "/index.html" }
        $localPath = Join-Path $baseDir ($reqPath.TrimStart("/").Replace("/", "\"))
        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $mime = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".jpg"  { "image/jpeg" }
                ".png"  { "image/png" }
                default { "application/octet-stream" }
            }
            $context.Response.ContentType = $mime
            $context.Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
            $context.Response.Headers.Add("Pragma", "no-cache")
            $context.Response.Headers.Add("Expires", "0")
            $context.Response.Headers.Add("Access-Control-Allow-Origin", "*")
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $context.Response.StatusCode = 404
        }
        $context.Response.OutputStream.Close()
    } catch {
        # Continue loop on error
    }
}
