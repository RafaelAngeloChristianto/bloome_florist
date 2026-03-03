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
  
  const order = ['Money Bouquet', 'Bouquet', 'Balloon']
  return Array.from(categories).sort((a, b) => {
    const indexA = order.indexOf(a)
    const indexB = order.indexOf(b)
    if (indexA === -1 && indexB === -1) return a.localeCompare(b)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
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
      const displayName = priceMatch ? priceMatch[1] : nameWithoutExt
      
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