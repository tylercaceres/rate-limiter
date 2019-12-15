import React from 'react'
import {useLocation} from 'react-router-dom'

const ErrorPage = (props) => {
  let location = useLocation();
  return (
    <div style={{margin:"0 auto"}}>
      The path "{location.pathname}" does not exist
    </div>
  )
}

export default ErrorPage;
