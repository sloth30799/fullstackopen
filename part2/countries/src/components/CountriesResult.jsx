import React from "react"

const CountriesResult = ({ result, handleClick }) => {
  console.log(result)
  return (
    <div>
      {result.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        result.map((c) => {
          return (
            <p key={c.area}>
              {c.name.common}{" "}
              <button onClick={() => handleClick(c.name.common)}>show</button>
            </p>
          )
        })
      )}
    </div>
  )
}

export default CountriesResult
