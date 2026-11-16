import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

type User = {
  id: number
  name: string
}

function App() {

  const api = 'https://6ace4295f338359cf1c358b1.mockapi.io/1234'

  const [data, setData] = useState<User[]>([])

  const [name, setName] = useState('')

  const [editId, setEditId] = useState<number | null>(null)

  async function getData() {
    try {
      const { data } = await axios.get<User[]>(api)
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteUser(id: number) {
    try {
      await axios.delete(`${api}/${id}`)
      getData()
    } catch (error) {
      console.error(error);
    }
  }
  async function addUser() {
    const newUser = {
      name: name
    }

    try {
      await axios.post(api, newUser)
      getData()
      setName('')
    } catch (error) {
      console.error(error)
    }
  }


  async function updateUser() {
    try {
      await axios.put(`${api}/${editId}`, {
        name: name
      })

      setEditId(null)
      setName('')
      getData()

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <input type="text" placeholder="add name" value={name} className="inpAddName" onChange={el => setName(el.target.value)} />
      <button onClick={addUser}>add</button>
      <button onClick={updateUser}>update</button>

      <div>
        {data.map(el => {
          return (
            <div key={el.id}>
              <h1>{el.name}</h1>
              <button onClick={() => {
                setEditId(el.id), setName(el.name)
              }}>edit</button>
              <button onClick={() => deleteUser(el.id)}>delete</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App

// import { useState } from 'react'


// const App = () => {

//   const users = [
//     {
//       id: 1,
//       name: 'Salmon'
//     }
//   ]
//   const [data, setData] = useState(users)

//   const [name, setName] = useState('')

//   const [editId, setEditId] = useState<number | null>(null)

//   const handleDelete = (id: number) => {
//     setData(data.filter(prev => prev.id !== id))
//   }

//   const handleAdd = (value: string) => {
//     const newUser = {
//       id: Date.now(),
//       name: value
//     }
//     name.trim() !== '' ? setData([...data, newUser]) : alert('введите имя')
//     setName('')
//   }

//   const handleEdit = (id: number, name: string) => {
//     setEditId(id)
//     setName(name)
//   }

//   const handleUpdate=()=>{
//     setData(data.map(el=>el.id==editId?{...el,name:name}:el))
//   }

//   const handleSearch = (value: string) => {
//     setData(data.filter(el => el.name.toLowerCase().trim().includes(value.toLowerCase())))
//   }

//   return (
//     <div style={{ padding: '50px', boxShadow: '0 0px 10px gainsboro', borderRadius: '30px' }}>
//       <h1>Todo List</h1>
//       <input
//         type="text" placeholder='search'
//         style={{ margin: '10px' }}
//         onChange={() => handleSearch(name)}
//       />
//       <input
//         type="text"
//         placeholder='add name'
//         className='inpAddName'
//         value={name}
//         onChange={el => setName(el.target.value)}
//       />
//       <button onClick={() => handleAdd(name)} style={{ width: '80px', textAlign: 'center' }}>add</button>

//       <div style={{ padding: '50px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
//         {
//           data.map(el => {
//             return <div key={el.id} className='card'>
//               <h1>{el.name}</h1>
//               <button onClick={() => handleEdit(el.id, el.name)}>Edit</button>
//               <button onClick={() => handleDelete(el.id)}>Delete</button>
//             </div>
//           })
//         }
//       </div>
//     </div>
//   )
// }

