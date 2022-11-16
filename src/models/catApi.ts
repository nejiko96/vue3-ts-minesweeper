interface CatCategory {
  id: number
  name: string
}

interface SearchCatImage {
  breeds: string[]
  categories: CatCategory[]
  id: string
  url: string
  width: number
  height: number
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search')
  const result = await res.json()
  return result[0]
}

export { fetchCatImage }
