import React from 'react'
import loading from './loading.gif'

const Spinner = () => {
    return (
      <div className='text-center my-5 '>
        <img src = {loading} alt="Loading..." style={{width: '3rem'}} />
      </div>
    )
}

export default Spinner;
