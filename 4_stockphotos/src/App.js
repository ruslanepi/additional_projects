import { useState, useEffect, useRef } from 'react'
import Photo from './Photo'

//Access Key KqppZhUTIhDoALrdE8qgIM9zM0ap5eT-O8I5K8ApFWQ

//Secret key  W1sTE6sgT2QYzR3H3-hZ4XsRm723isxNv60qcGG65TI
// https://api.unsplash.com/photos/?client_id=KqppZhUTIhDoALrdE8qgIM9zM0ap5eT-O8I5K8ApFWQ

const cliendID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [newImages, setNewImages] = useState(false)
  const mounted = useRef(false)

  const handleClick = (e) => {
    e.preventDefault()
    if (!query) return
    if (page === 1) {
      fetchImages()
      return
    }

    setPage(1)
  }

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!newImages) return
    if (loading) return

    setPage((oldPage) => oldPage + 1)
  }, [newImages])

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  const fetchImages = async () => {
    setLoading(true)
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`

    if (query) {
      url = `${searchUrl}${cliendID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${cliendID}${urlPage}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()

      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results
        } else if (query) {
          return [...oldPhotos, ...data.results]
        } else {
          return [...oldPhotos, ...data]
        }
      })
      setNewImages(false)
      setLoading(false)
    } catch (error) {
      setNewImages(false)
      setLoading(false)
    }
  }

  return (
    <main className='App'>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text '
            placeholder='search'
            className='form-input'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type='submit' className='submit-btn' onClick={handleClick}>
            +
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />
          })}
        </div>

        {loading && <h2 className='loading'>Loading...</h2>}
      </section>
    </main>
  )
}

export default App
