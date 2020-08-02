import React from 'react'

const Field = ({tag, value, handle}) => (
    <div>
      {tag} <input value={value} onChange={handle} />
    </div>
)
  
const Form = ({handleSubmit, filter, handleFilter, newName, handleName, newNum, handleNum}) => (
    <>
    <form onSubmit={handleSubmit}>
      <Field tag="filter shown with " value={filter} handle={handleFilter} />
      <h2>add a new</h2>
      <Field tag="name: " value={newName} handle={handleName} />
      <Field tag="number: " value={newNum} handle={handleNum} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
)

export default Form