document.addEventListener("DOMContentLoaded", function () {
  //  Easter Egg function 1 Theme switcher------------------------------------------------------------------------

  const easterButton = document.getElementById("theOne");
  const link = document.querySelector("link[rel='stylesheet']");
  const easterContainer1 = document.getElementById("easterContainer1");

  if (localStorage.getItem("theme") === "theOne") {
    link.setAttribute("href", "../CSS/easter.css");

    const faceContainer = document.createElement("div");
    faceContainer.id = "faceContainer";

    const faceImage = document.createElement("img");
    faceImage.src = "./IMG/face.jpg";
    faceImage.id = "selfie";
    faceContainer.appendChild(faceImage);

    const glassesImage = document.createElement("img");
    glassesImage.src = "./IMG/glasses.png";
    glassesImage.id = "glasses";
    faceContainer.appendChild(glassesImage);

    const pipeImage = document.createElement("img");
    pipeImage.src = "./IMG/pipa.png";
    pipeImage.id = "pipa";
    faceContainer.appendChild(pipeImage);

    document.body.appendChild(faceContainer);
  } else {
    link.setAttribute("href", "../CSS/styles.css");
  }

  easterContainer1.addEventListener("mouseenter", function () {
    easterButton.style.display = "block";
  });

  easterContainer1.addEventListener("mouseleave", function () {
    easterButton.style.display = "none";
  });

  easterButton.addEventListener("click", function () {
    console.log("Button clicked");
    if (link.getAttribute("href") === "../CSS/styles.css") {
      link.setAttribute("href", "../CSS/easter.css");
      localStorage.setItem("theme", "theOne");
    } else {
      link.setAttribute("href", "../CSS/styles.css");
      localStorage.setItem("theme", "org");
    }
  });
});
