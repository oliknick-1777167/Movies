import React, {useState} from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
  const [text, setText] = useState('')
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState(null)

  async function getMovie(){
    setTerm('')
    setLoading(true)
    setMovie(null)
    let url = 'http://www.omdbapi.com/?'
    url += 'apikey=' + '64d642d6'
    url += '&s=' + text
    const r = await fetch(url)
    const j = await r.json()
    console.log(j)
    if(j.Search) {
      setMovie(j.Search)
      setTerm(text)
      setText('')
    }
    setLoading(false)
  }

  console.log(movie)
  return (
    <Wrap>
      
      <Header>
        <TextField label="Search for a movie" variant="outlined" style={{width:'calc(100% - 110px)'}}
          value={text} onChange={e=> setText(e.target.value)} autoFocus
          onKeyPress={e=> e.key==='Enter' && getMovie()}
        />
        <Button variant="contained" color="primary" style={{height:55, marginLeft:10, width:100}}
          disabled={!text || loading} onClick={getMovie}>
          Search
        </Button>
      </Header>

      {loading && <LinearProgress />}

      {term && <Term>
        <span>Results for:</span>
        <strong>{term}</strong>
      </Term>}

      {movie && movie.length===0 && <Empty>
        no movie found!  
      </Empty>}

      {movie && movie.length>0 && <Body>
        {movie && movie.map(m=> {
          const img = m.Poster 
          const title = m.Title
          const year = m.Year
          const id = m.imbID
          return <Info><Poster src={img}></Poster>{title}<Br/><Br/>Year: {year}<Br/>id: {id}</Info>

        })}
      </Body>}

    </Wrap>
  );
}

const Term = styled.p`
  width:100%;
  text-align:center;
  & strong {
    margin-left:5px;
    font-size:16px;
  }
`
const Br = styled.br`

`

const Empty = styled.p`
  width:100%;
  text-align:center;
`
const height = 360
const width = 240
const Poster = styled.img`
  max-height: ${height}px;
  max-width: ${width}px;
  min-width: ${width}px;
  min-height: ${height}px;
  object-fit: cover;
  margin:5px;
`
const Info = styled.div`
  width:480px;
  display:flex;
  flex-direction:row;
  margin:5px;
`
const Wrap = styled.div`
  font-family: monospace;
  font-size: 20px;
  display:flex;
  flex-direction:column;
  width:100%;
  height:100vh;
`
const Header = styled.header`
  width:100%;
  min-height:50px;
  padding: 10px;
  box-sizing: border-box;
`
const Body = styled.div`
  width:100%;
  display:flex;
  flex-wrap:wrap;
  flex:1;
  overflow:auto;
  justify-content:center;
`

export default App;