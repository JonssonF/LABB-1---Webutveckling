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

  function loadRepo() {
    const container = document.querySelector(".portfolio");
    const loading = document.getElementById("loading");
    const boxText = document.getElementById("boxText");

    boxText.classList.add("hidden");
    loading.classList.add("active");
    container.innerHTML = "";

    fetch("https://api.github.com/users/JonssonF/repos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not reach repos.");
        }
        return response.json();
      })
      .then((data) => {
        loading.classList.remove("active");

        if (data.length > 0) {
          boxText.classList.remove("hidden");

          data.forEach((repo) => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");

            projectDiv.innerHTML = `
          <h3>.::${repo.name}::.</h3>
            <p>${repo.description || "No description available."}</p>
            <a href="${repo.html_url}" target="_blank">Visit project</a>
            <br>
          `;

            container.appendChild(projectDiv);
          });
        } else {
          const noRepoMessage = document.createElement("p");
          noRepoMessage.textContent = "No repositories found.";
          container.appendChild(noRepoMessage);
        }
      })
      .catch((error) => {
        loading.classList.remove("active");
        loading.classList.remove("hidden");
        console.error("Error loading GitHub repositories.", error);
      });
  }
  loadRepo();
});
