import React from 'react'

const Book = ({people, deleteHandle}) => (
    <>
    {people.map(n => 
      <p>{n.name} {n.num} <button onClick={() => deleteHandle(n.id, n.name)}>delete</button></p>
    )}
    </>
)

export default Book