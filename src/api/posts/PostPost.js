const API_URL = import.meta.env.VITE_API_URL

export async function PostPost(title, descr, file) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('descr', descr);
  formData.append('img', file);

  return await fetch(`${API_URL}/api/PostPost`, {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json
    })
    .catch((e) => {
      throw e
    })
}
