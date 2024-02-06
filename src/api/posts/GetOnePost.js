const API_URL = import.meta.env.VITE_API_URL

export async function GetOnePost(id) {
  return await fetch(`${API_URL}/api/GetPost/${id}`)
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((e) => {
      throw e
    })
}
