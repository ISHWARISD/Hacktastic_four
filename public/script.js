document.addEventListener('DOMContentLoaded', () => {
  const jobListElement = document.getElementById('jobList');
  const filterForm = document.getElementById('filterForm');

  // Fetch Kaggle data from the server
  fetch('/job-data')
    .then(response => response.json())
    .then(data => {
      let displayedData = data; // Store all data initially

      // Function to filter and display data
      function displayData() {
        jobListElement.innerHTML = ''; // Clear existing content

        displayedData.forEach(entry => {
          const jobBox = document.createElement('div');
          jobBox.classList.add('job-box');

          const innerContainer = document.createElement('div');
          innerContainer.classList.add('inner-container');

          const jobTitle = document.createElement('div');
          jobTitle.classList.add('job-title');
          jobTitle.textContent = entry.internship_title;

          const companyName = document.createElement('div');
          companyName.classList.add('company-name');
          companyName.textContent = entry.company_name;

          const location = document.createElement('div');
          location.classList.add('job-info');
          location.textContent = `Location: ${entry.location}`;

          const startDate = document.createElement('div');
          startDate.classList.add('job-info');
          startDate.textContent = `Start Date: ${entry.start_date}`;

          const duration = document.createElement('div');
          duration.classList.add('job-info');
          duration.textContent = `Duration: ${entry.duration}`;

          const stipend = document.createElement('div');
          stipend.classList.add('job-info');
          stipend.textContent = `Stipend: ${entry.stipend}`;

          innerContainer.appendChild(jobTitle);
          innerContainer.appendChild(companyName);

          jobBox.appendChild(innerContainer);
          jobBox.appendChild(location);
          jobBox.appendChild(startDate);
          jobBox.appendChild(duration);
          jobBox.appendChild(stipend);

          jobListElement.appendChild(jobBox);
          const applyNowButton = document.createElement('button');
          applyNowButton.textContent = 'Apply Now';
          applyNowButton.classList.add('apply-now-button');

          // Add click event for the "Apply Now" button
          applyNowButton.addEventListener('click', () => {
            // Add logic for handling the "Apply Now" action
            // For example, you can redirect to an application page
            console.log(`Applying for ${entry.internship_title} at ${entry.company_name}`);
          });

          jobBox.appendChild(applyNowButton);

          jobListElement.appendChild(jobBox);
        });
      }

      // Apply filters based on user input
      function applyFilters() {
        const locationFilter = document.getElementById('locationFilter').value.toLowerCase();
        const domainFilter = document.getElementById('domainFilter').value.toLowerCase();
        const durationFilter = document.getElementById('durationFilter').value.toLowerCase();

        displayedData = data.filter(entry => (
          entry.location.toLowerCase().includes(locationFilter) &&
          entry.internship_title.toLowerCase().includes(domainFilter) &&
          entry.duration.toLowerCase().includes(durationFilter)
        ));

        displayData();
      }

      // Event listener for form submission
      filterForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior
        applyFilters();
      });

      // Event listener for the Apply Filters button
      document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);

      displayData(); // Initial display of all data
    })
    .catch(error => console.error('Error fetching job data:', error));
});
