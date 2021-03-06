import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined
} from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './listItem.scss'


const Listitem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [movie, setMovie] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get('/movies/find/' + item, {
          headers: {
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDgwZGUyMzYyOWMwOGFiODY5MWVjNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTgxMjUyMywiZXhwIjoxNjQyMjQ0NTIzfQ.Eevg8RX0VIBr5AeNhfaurthW9Lv4GP540P9ZI3q8e9c',
          },
        })
        setMovie(res.data)
        // console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMovie()
  }, [item])
  // Added by ikd
  const handleClick = (e) => {
    e.preventDefault()
     navigate("/watch", { state: { movie } })
  }
  // End
  return (
    // Added by ikd
    <Link to={{ pathname: "/watch"}}  onClick={handleClick}>
      {/* end */}
      <div
        className='listItem'
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt='' />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className='itemInfo'>
              <div className='icons'>
                <PlayArrow className='icon' />
                <Add className='icon' />
                <ThumbUpAltOutlined className='icon' />
                <ThumbDownOutlined className='icon' />
              </div>
              <div className='itemInfoTop'>
                <span>{movie.duration}</span>
                <span className='ageLimit'>+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className='desc'>{movie.desc}</div>
              <div className='genre'>{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default Listitem
