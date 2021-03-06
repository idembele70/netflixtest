import { ArrowBackOutlined } from '@material-ui/icons'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './watch.scss'

const Watch = () => {
  const location = useLocation()
  /* Added by ikd */
  const movie = location.state.movie
  /* end */
  return (
    <div className='watch'>
      <Link to='/'>
        <div className='back'>
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className='video'
        autoPlay
        progress='true'
        controls
        // src='http://techslides.com/demos/sample-videos/small.webm'
        src={movie.video}
      />
    </div>
  )
}

export default Watch

