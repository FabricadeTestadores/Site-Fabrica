# Deploy Script
$ErrorActionPreference = "Stop"

Write-Host "Starting manual deployment..."

# Configuration
$distDir = "dist"
$remoteUrl = "https://github.com/FabricadeTestadores/Site-Fabrica.git"
$branch = "gh-pages"

# Check if dist exists
if (-not (Test-Path $distDir)) {
    Write-Error "Dist directory not found! Run 'npm run build' first."
}

# Navigate to dist
Push-Location $distDir

try {
    # Initialize git
    if (-not (Test-Path ".git")) {
        Write-Host "Initializing git repo..."
        git init
        git checkout -b $branch
    } else {
        Write-Host "Git repo already pending, resetting..."
        Remove-Item -Recurse -Force .git
        git init
        git checkout -b $branch
    }

    # Add all files
    Write-Host "Adding files..."
    git add -A

    # Commit
    Write-Host "Committing..."
    git commit -m "Deploy from manual script"

    # Push
    Write-Host "Pushing to $branch..."
    git push $remoteUrl $branch --force

    Write-Host "Deployment successful!"
}
catch {
    Write-Error "Deployment failed: $_"
}
finally {
    Pop-Location
}
