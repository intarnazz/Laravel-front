const API_URL = import.meta.env.VITE_API_URL

export async function GetPosts() {
  return await fetch(`${API_URL}/api/GetPosts`)
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((e) => {
      throw e
    })
}
