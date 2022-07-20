import React from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
display: flex;
flex-direction: column;
place-items: center;
height: 100%;
width: 100wh;
background-color: beige;
`   

export default function Loading() {
  return (
    <LoadingContainer>chờ....</LoadingContainer>
  )
}
