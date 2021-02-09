import React from "react"

const IndexRedirect = ({ pageContext: { baseURL, redirectPath } }) => (
  <div>
    <meta
      httpEquiv="refresh"
      content={`0; url=${baseURL + redirectPath}`}
    />
  </div>
)

export default IndexRedirect
