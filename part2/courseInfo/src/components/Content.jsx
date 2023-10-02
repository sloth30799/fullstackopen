import React from "react"
import Part from "./Part"

const Content = ({ parts }) => {
  const total = parts.reduce((t, part) => (t += part.exercises), 0)
  return (
    <>
      {parts.length > 0 &&
        parts.map((part) => <Part part={part} key={part.id} />)}

      <h5>total of {total} exercises</h5>
    </>
  )
}

export default Content
