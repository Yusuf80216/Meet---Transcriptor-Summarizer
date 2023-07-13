import React from 'react'

const ImageViewer = ({url}) => {
    console.log('NextPageURL',url);
  return (
    <>
        <img src={url} alt="" />
    </>
  )
}

export default ImageViewer