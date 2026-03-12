$files = @(
    "c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\index.html",
    "c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\index-2.html",
    "c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\index-3.html",
    "c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\blog-details.html",
    "c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\products-list-sidebar.html",
    "c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\products-grid-sidebar.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding utf8
        
        # Replace sideCartToggler with headerCartLink
        $content = $content -replace 'sideCartToggler', 'headerCartLink'
        
        # Convert button to a tag for header cart
        $content = $content -replace '<button type="button" class="headerCartLink', '<a href="products-grid.html" class="headerCartLink'
        
        # Fix cart.html link for header cart
        $content = $content -replace 'href="cart.html" class="headerCartLink', 'href="products-grid.html" class="headerCartLink'

        # Fix closing button tag after span
        # Regex for span followed by tag
        $content = $content -replace '(<span>\d+</span>\s*)</button>', '$1</a>'

        [System.IO.File]::WriteAllText($file, $content)
        Write-Host "Processed $file"
    } else {
        Write-Host "File not found: $file"
    }
}
