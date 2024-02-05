const API_URL = import.meta.env.VITE_API_URL

export async function PostPost(title, descr) {
  return await fetch(`${API_URL}/api/PostPost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      descr: descr
    })
  })
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((e) => {
      throw e
    })
}
