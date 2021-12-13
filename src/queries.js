module.exports.allConcept = (inScheme, languages) => `
  {
    allConcept(
      filter: {
        inScheme: {
          id: {
            eq: "${inScheme}"
          }
        }
      }
    ) {
      edges {
        node {
          id
          type
          followers
          inbox
          prefLabel {
            ${[...languages].join(' ')}
          }
          altLabel {
            ${[...languages].join(' ')}
          }
          definition {
            ${[...languages].join(' ')}
          }
          scopeNote {
            ${[...languages].join(' ')}
          }
          note {
            ${[...languages].join(' ')}
          }
          notation
          narrower {
            id
            prefLabel {
              ${[...languages].join(' ')}
            }
            altLabel {
              ${[...languages].join(' ')}
            }
          }
          narrowerTransitive {
            id
            prefLabel {
              ${[...languages].join(' ')}
            }
            altLabel {
              ${[...languages].join(' ')}
            }
          }
          broader {
            id
            prefLabel {
              ${[...languages].join(' ')}
            }
            altLabel {
              ${[...languages].join(' ')}
            }
          }
          broaderTransitive {
            id
            prefLabel {
              ${[...languages].join(' ')}
            }
            altLabel {
              ${[...languages].join(' ')}
            }
          }
          related {
            id
            prefLabel {
              ${[...languages].join(' ')}
            }
          }
          relatedMatch {
            id
          }
          broadMatch {
            id
          }
          narrowMatch {
            id
          }
          closeMatch {
            id
          }
          exactMatch {
            id
          }
          inScheme {
            id
            title {
              ${[...languages].join(' ')}
            }
          }
          topConceptOf {
            id
          }
          url
        }
      }
    }
  }
`

module.exports.allConceptScheme = (languages) => `
  {
    allConceptScheme {
      edges {
        node {
          id
          type
          title {
            ${[...languages].join(' ')}
          }
          description {
            ${[...languages].join(' ')}
          }
          hasTopConcept {
            ...ConceptFields
            narrower {
              ...ConceptFields
              narrower {
                ...ConceptFields
                narrower {
                  ...ConceptFields
                  narrower {
                    ...ConceptFields
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  fragment ConceptFields on Concept {
    id
    notation
    prefLabel {
      ${[...languages].join(' ')}
    }
    altLabel {
      ${[...languages].join(' ')}
    }
    relatedMatch {
      id
    }
    url
  }
`
