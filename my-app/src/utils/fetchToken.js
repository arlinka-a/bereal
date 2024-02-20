const fetchData =  async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
}

export default fetchData;