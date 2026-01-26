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
  
  return Array.from(categories).sort()
}

// Generate products from images in each category
export const generateProductsFromAssets = () => {
  const categories = getAvailableCategories()
  const products: Array<{
    id: number
    category: string
    image: string
  }> = []
  
  let productId = 1
  
  categories.forEach(category => {
    const images = getImagesFromFolder(category)
    
    Object.entries(images).forEach(([, imagePath]) => {
      products.push({
        id: productId++,
        category,
        image: imagePath
      })
    })
  })
  
  return products
}