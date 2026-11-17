type Props = {
  id: number
  deleteUser: (id: number) => void
}

const DeleteData = ({ id, deleteUser }: Props) => {
  return (
    <button onClick={() => deleteUser(id)}>
      Delete
    </button>
  )
}

export default DeleteData