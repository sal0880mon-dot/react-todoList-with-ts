import type { User } from '../App'
import DeleteData from './DeleteData'

type Props = {
  data: User[]
  deleteUser: (id: number) => void
}

const GetData = ({ data, deleteUser }: Props) => {
  return (
    <>
      {data.map(el => (
        <div key={el.id} className="card">
          <h2>{el.name}</h2>

          <DeleteData
            id={el.id}
            deleteUser={deleteUser}
          />
        </div>
      ))}
    </>
  )
}

export default GetData