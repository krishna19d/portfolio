# Asset Generation Script for Portfolio
# This script helps convert HTML placeholders to actual images

Write-Host "Portfolio Asset Generator" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green

# Check if required tools are available
$hasImageMagick = Get-Command "magick" -ErrorAction SilentlyContinue
$hasChrome = Get-Command "chrome" -ErrorAction SilentlyContinue

if (-not $hasImageMagick -and -not $hasChrome) {
    Write-Host "To convert HTML to images, you'll need one of:" -ForegroundColor Yellow
    Write-Host "1. ImageMagick (recommended): https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
    Write-Host "2. Chrome browser for screenshots" -ForegroundColor Yellow
    Write-Host ""
}

# List current assets
Write-Host "Current assets in ./assets/:" -ForegroundColor Cyan
Get-ChildItem "./assets/" | ForEach-Object {
    $size = if ($_.PSIsContainer) { "<DIR>" } else { "{0:N0} bytes" -f $_.Length }
    Write-Host "  $($_.Name) - $size"
}

Write-Host ""
Write-Host "HTML Placeholders to convert:" -ForegroundColor Yellow
$htmlFiles = @(
    "client-1.html -> client-1.jpg",
    "client-2.html -> client-2.jpg", 
    "client-3.html -> client-3.jpg",
    "blog-1.html -> blog-1.jpg",
    "blog-2.html -> blog-2.jpg",
    "blog-3.html -> blog-3.jpg",
    "social-preview.html -> social-preview.jpg (if needed)"
)

$htmlFiles | ForEach-Object {
    Write-Host "  $_" -ForegroundColor White
}

Write-Host ""
Write-Host "Manual steps to complete:" -ForegroundColor Magenta
Write-Host "1. Replace 'profile-placeholder.jpg' with your actual photo" -ForegroundColor White
Write-Host "2. Add real client photos (client-1.jpg, client-2.jpg, client-3.jpg)" -ForegroundColor White
Write-Host "3. Update blog images with relevant graphics" -ForegroundColor White
Write-Host "4. Replace resume PDF with your actual resume" -ForegroundColor White
Write-Host "5. Ensure all project screenshots are high quality" -ForegroundColor White

Write-Host ""
Write-Host "Quick conversion commands (if you have ImageMagick):" -ForegroundColor Green
Write-Host 'magick convert -size 100x100 -density 150 ./assets/client-1.html ./assets/client-1.jpg' -ForegroundColor Gray
Write-Host 'magick convert -size 400x250 -density 150 ./assets/blog-1.html ./assets/blog-1.jpg' -ForegroundColor Gray

Write-Host ""
Write-Host "Asset generation completed! Check the ./assets/ folder." -ForegroundColor Green
