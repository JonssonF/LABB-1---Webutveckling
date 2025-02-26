document.addEventListener("DOMContentLoaded", function () {
  // Funktion för att ladda CV-data
  function loadCV() {
    fetch("experiences.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const container = document.querySelector(".cv1");

        data.forEach((item) => {
          const projectDiv = document.createElement("div");
          projectDiv.classList.add("project");

          projectDiv.innerHTML = `
          <a href="#${item.id}">
            <img src="${item.image}" alt="${item.alt}" />
          </a>
          <div class="modal" id="${item.id}">
            <div class="modal-content">
              <a href="#" class="close-btn">&times;</a>
              <h4>${item.title}</h4>
              <p>${item.description}</p>
              <a href="${item.link}" target="_blank">Visit website</a>
            </div>
          </div>
        `;

          container.appendChild(projectDiv);
        });
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }

  loadCV();
});
