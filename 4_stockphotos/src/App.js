import { useState, useEffect } from 'react'
import Photo from './Photo'

//Access Key KqppZhUTIhDoALrdE8qgIM9zM0ap5eT-O8I5K8ApFWQ

//Secret key  W1sTE6sgT2QYzR3H3-hZ4XsRm723isxNv60qcGG65TI
// https://api.unsplash.com/photos/?client_id=KqppZhUTIhDoALrdE8qgIM9zM0ap5eT-O8I5K8ApFWQ

const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    setLoading(true)
    let url
    url = `${mainUrl}?client_id=KqppZhUTIhDoALrdE8qgIM9zM0ap5eT-O8I5K8ApFWQ`

    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return <div className='App'>123</div>
}

export default App
