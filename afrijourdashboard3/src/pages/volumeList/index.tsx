import { Layout } from '@/components/custom/layout'
import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../AuthContext'
import { BASE_URL } from '../../config'

const index = () => {
  return (
    <Layout>
      <h1>Volumes List</h1>
    </Layout>
  )
}

export default index
