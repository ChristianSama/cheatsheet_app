sections =  [
  {
    "id": 5,
    "lines": [
      {
        "id": 3,
        "description": "Line description",
        "snippet": "line snippet",
        "section": 5
      },
      {
        "id": 4,
        "description": "Line description2",
        "snippet": "line snippet2",
        "section": 5
      }
    ],
    "title": "Section title",
    "description": "Section description",
    "cheatsheet": 21
  },
  {
    "id": 6,
    "lines": [
      {
        "id": 5,
        "description": "Line description",
        "snippet": "line snippet",
        "section": 5
      },
      {
        "id": 6,
        "description": "Line description2",
        "snippet": "line snippet2",
        "section": 5
      }
    ],
    "title": "Section title",
    "description": "Section description",
    "cheatsheet": 21
  }
]

let a = sections.reduce((acc, cur) => {
  return acc.concat(cur.lines)
}, []).find((line) => line.id === id)

console.log(a)