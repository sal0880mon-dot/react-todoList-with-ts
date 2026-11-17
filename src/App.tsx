import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import GetData from './components/GetData'

export type User = {
  id: number
  name: string
}

const api = 'https://6ace4295f338359cf1c358b1.mockapi.io/1234'

function App() {
  const [data, setData] = useState<User[]>([])

  const getData = async () => {
    try {
      const { data } = await axios.get(api)
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${api}/${id}`)
      setData(prev => prev.filter(el => el.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const addUser=async (name:string) => {
    try {
      await axios.post(api,{name:name})
      getData()
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <h1>Users</h1>

      <GetData
        data={data}
        deleteUser={deleteUser}
      />
    </>
  )
}

export default App