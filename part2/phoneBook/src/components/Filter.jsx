import React from "react"

const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown with:{" "}
      <input aria-label="filter-input" onChange={handleFilter} />
    </div>
  )
}

export default Filter
