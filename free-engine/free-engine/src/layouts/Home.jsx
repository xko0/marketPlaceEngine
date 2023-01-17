import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Banner from '../components/banner/Banner'
import { SearchBar } from '../components/searchbar/Searchbar'
import { Cards } from '../components/cards/Cards'
import { Grid } from '@mui/material'

export default function Home() {
  return (
    <>
      <Navbar/>
      <Banner />
      <SearchBar />
      <Cards />
    </>
  )
}
