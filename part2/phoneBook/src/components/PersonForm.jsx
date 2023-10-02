import React from "react"

const PersonForm = ({ handleNameChange, handleNumberChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input aria-label="name-input" onChange={handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input aria-label="number-input" onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
