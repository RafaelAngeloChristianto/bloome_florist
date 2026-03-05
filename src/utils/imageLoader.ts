// Utility to dynamically import images from asset folders
export const getImagesFromFolder = (folderName: string) => {
  const images: Record<string, string> = {}
  
  try {
    const modules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true })
    
    Object.entries(modules).forEach(([path, module]) => {
      const normalizedPath = path.replace(/\\/g, '/')
      if (normalizedPath.includes(folderName)) {
        const fileName = path.split('/').pop() || ''
        images[fileName] = (module as any).default
      }
    })
  } catch (error) {
    console.error(`Error loading images from ${folderName}:`, error)
  }
  
  return images
}

// Get all available categories from assets folder
export const getAvailableCategories = () => {
  const categories = new Set<string>()
  
  try {
    const modules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true })
    
    Object.keys(modules).forEach((path) => {
      const normalizedPath = path.replace(/\\/g, '/')
      const match = normalizedPath.match(/\/assets\/([^/]+)\//)
      if (match && match[1]) {
        categories.add(match[1])
      }
    })
  } catch (error) {
    console.error('Error getting available categories:', error)
  }
  
  return Array.from(categories).sort((a, b) => {
    const numA = parseInt(a.match(/^(\d+)\./)?.[1] || '999')
    const numB = parseInt(b.match(/^(\d+)\./)?.[1] || '999')
    return numA - numB
  })
}

// Generate products from images in each category
export const generateProductsFromAssets = () => {
  const categories = getAvailableCategories()
  const products: Array<{
    id: number
    category: string
    image: string
    name: string
  }> = []
  
  let productId = 1
  
  categories.forEach(category => {
    const images = getImagesFromFolder(category)
    
    Object.entries(images).forEach(([fileName, imagePath]) => {
      const nameWithoutExt = fileName.replace(/\.(png|jpg|jpeg|webp)$/i, '')
      const priceMatch = nameWithoutExt.match(/-\s*(\d+k)/i)
      let displayName = priceMatch ? priceMatch[1] : nameWithoutExt
      
      // Remove leading "1 " from display name
      displayName = displayName.replace(/^1\s+/, '')
      // Remove patterns like "Money 5 - ", "Fresh 2 - ", etc.
      displayName = displayName.replace(/^[A-Za-z]+\s+\d+\s*-\s*/, '')
      
      products.push({
        id: productId++,
        category,
        image: imagePath,
        name: displayName
      })
    })
  })
  
  return products
}