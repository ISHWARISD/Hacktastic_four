document.addEventListener('DOMContentLoaded', () => {
    const kaggleListElement = document.getElementById('kaggleList');
  
    // Fetch Kaggle data from the server
    fetch('/kaggle-data')
      .then(response => response.json())
      .then(data => {
        // Process and display the data on the page
        data.forEach(entry => {
          const listItem = document.createElement('li');
          listItem.textContent = JSON.stringify(entry);
          kaggleListElement.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching Kaggle data:', error));
  });
  