import { useState, useEffect } from 'react'
import Character from './Character';

const NavPage = ({page, setPage}) => {
  return (
    <header className='d-flex justify-content-between align-items-center'>
      <button className='btn btn-primary btn-sm' onClick={() => setPage(page - 1)}>Previous Page {(page < 1 ? (page = 1) : (page - 1))}</button>
      <p>Page: {page}</p>
      <button className='btn btn-primary btn-sm' onClick={() => setPage(page + 1)}>Next Page {page + 1}</button>
    </header>
  )
}

const CharacterList = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      const data = await response.json()
      /* console.log(data) */
      /* console.log(data.results) */
      setLoading(false)
      setCharacters(data.results)
    }
    fetchData()
  }, [page]);
  return (
    <>
      <div className='container pb-5'>
        <NavPage page={page} setPage={setPage} />
        {
          loading ? (<h1>Loading...</h1>) 
          : 
          (<div className='row'>
            {
              characters.map(character => {
                return (
                  <div className='col-md-4' key={character.id}>
                    <Character character={character} />
                  </div>
                )
              })
            }
          </div>)
        }
        <NavPage page={page} setPage={setPage} />
      </div>
    </>
  )
}

export default CharacterList