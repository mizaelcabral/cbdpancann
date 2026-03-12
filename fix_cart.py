import os
import re

files = [
    r'c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\index.html',
    r'c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\index-2.html',
    r'c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\index-3.html',
    r'c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\blog-details.html',
    r'c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\products-list-sidebar.html',
    r'c:\Users\brand\OneDrive\Documentos\CLIENTES BRANDI AI\CBDPANCANN\products-grid-sidebar.html'
]

def fix_file(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Replace sideCartToggler with headerCartLink in header area
    content = content.replace('class="sideCartToggler', 'class="headerCartLink')
    
    # 2. Convert button to a tag if it matches the cart toggler pattern
    content = content.replace('<button type="button" class="headerCartLink', '<a href="products-grid.html" class="headerCartLink')
    
    # 3. Ensure href="cart.html" is updated to href="products-grid.html" for headerCartLink
    content = content.replace('href="cart.html" class="headerCartLink', 'href="products-grid.html" class="headerCartLink')
    
    # 4. Fix trailing </button> to </a> for the headerCartLink specifically
    # We look for <span>0</span> followed by any whitespace and then </button>
    pattern = re.compile(r'(headerCartLink.*?>\s*<i.*?></i>\s*<span>\d+</span>\s*)</button>', re.DOTALL)
    content = pattern.sub(r'\1</a>', content)
    
    # Alternative pattern for when the tag change was partial
    content = content.replace('<span>0</span>\n                </button>', '<span>0</span>\n                </a>')
    content = content.replace('<span>0</span>\r\n                </button>', '<span>0</span>\r\n                </a>')

    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print(f"Processed {file_path}")

for f in files:
    fix_file(f)
