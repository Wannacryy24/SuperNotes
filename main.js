import "./style.css";
import Quill from "quill";

import "quill/dist/quill.snow.css";

import { fabric } from "fabric";

var notesArray = JSON.parse(localStorage.getItem("localArray")) || [
  {
    id: "1",
    date: "11 May 2022",
    title: "Adventures in Urban",
    content:
      'Adventures in Urban Have you ever felt like your city has become monotonous? You walk the same streets, visit the same cafes, and everything feels a little...beige. Well, fear not fellow adventurer! Today weare diving into the exciting world of urban exploring, uncovering the hidden gems that most people walk right past Urban exploring, or "urbex" for short, is all about discovering the forgotten corners of our cities. It could be an abandoned building, a hidden garden tucked away in a bustling district, or even a network of underground tunnels (with safety precautions, of course!). The key is to look beyond the obvious and embrace a sense of discovery.',
  },
  {
    id: "2",
    date: "12 May 2024",
    title: "The Power of Play",
    content:
      "In our fast-paced, technology-driven world, the concept of play often gets relegated to the realm of childhood. However, the power of play extends far beyond the sandbox. Play is a fundamental human need, a wellspring of creativity, innovation, and even deep learning. As we navigate the ever-evolving landscape of education in the digital age, its crucial to recognize the value of play and integrate it into learning experiences for all ages. Traditionally, education has focused on a rigid, information-centric model. Students are expected to passively absorb facts and figures, often through rote memorization and standardized tests. This approach stifles the natural curiosity and exploration that ignite a love for learning. In contrast, play allows individuals to engage with the world in an active, self-directed manner. It fosters a sense of agency and encourages exploration, experimentation, and problem-solving.Think back to your own childhood experiences. Learning to ride a bike, building a fort out of blankets, or losing yourself in a make-believe world – these were all forms of play. Yet, through these playful activities, you developed valuable cognitive and physical skills. You learned spatial reasoning, cause and effect, and the importance of collaboration. You honed your creativity and imagination, and most importantly, you discovered the joy of overcoming challenges and mastering new things.The benefits of play extend well beyond childhood. Studies have shown that playful activities in adults can enhance cognitive flexibility, improve memory, and boost problem-solving skills. It can also foster social bonds, reduce stress, and even contribute to emotional well-being.  In a world that demands constant productivity and focus, the ability to approach tasks with a playful and curious mindset is an invaluable asset.",
  },
  {
    id: "3",
    date: "13 May 2023",
    title: "The Symphony of the Senses",
    content:
      "Our world is a rich tapestry woven from the threads of our senses. Sight, sound, smell, taste, and touch – each plays a unique role in shaping our perception and enriching our experiences. However, in our daily lives, we often operate in a siloed sensory environment. This essay explores the power of multisensory experiences, where multiple senses are stimulated in concert, and argues for the importance of  integrating these into various aspects of our lives.Consider the experience of savoring a perfectly ripe peach. The vibrant orange color first entices your sight, followed by the sweet, fragrant aroma that awakens your sense of smell. The moment you take a bite, the juicy texture fills your mouth, and a burst of  flavor explodes on your tongue. This symphony of senses elevates the experience beyond a mere taste; it creates a memory that engages multiple facets of perception.The power of multisensory experiences extends far beyond the realm of food. Studies have shown that combining different sensory inputs can enhance learning and memory retention.  For instance, incorporating visuals into auditory learning  can improve information processing, especially for complex concepts.  Similarly, music paired with visual elements, such as dance performances or films with powerful soundtracks, creates a more immersive and emotionally resonant experience for the audience.Multisensory experiences are not just about enhancing learning and enjoyment; they can also be powerful tools for promoting well-being.  Sensory gardens, designed to stimulate touch, smell, and sight,  have been shown to reduce stress and anxiety.  Therapeutic music can evoke relaxation and positive emotions.  Even the simple act of enjoying a cup of tea, with its aroma and soothing warmth, can provide a sense of calm and mindfulness.",
  },
  {
    id: "4",
    date: "01 June 2024",
    title: "The Rise of Citizen Science",
    content:
      "Science has traditionally been viewed as the domain of professionals in laboratories and universities. However, a new era is dawning, driven by the rise of citizen science. This movement empowers ordinary people to participate in scientific research, contributing valuable data and fostering a deeper understanding of the world around us.Citizen science projects come in all shapes and sizes. From tracking bird migrations and monitoring air quality to classifying galaxies and identifying species in underwater photographs, these projects allow anyone with an internet connection and a curious mind to contribute.  The key here is the sheer scale of participation. By harnessing the collective power of citizen scientists, researchers can gather vast amounts of data that would be impossible to collect through traditional methods. Citizen science isnt just about data collection; its also about democratizing discovery.  By engaging directly in the scientific process, participants gain a deeper appreciation for the scientific method and the challenges and rewards of research. They develop critical thinking skills, learn to analyze data, and become more informed about the scientific issues impacting their communities.",
  },
];
var selectedNote = null;

function saveArraytoStorage() {
  var jsonArray = JSON.stringify(notesArray);
  localStorage.setItem("localArray", jsonArray);
}

var containerDiv = document.createElement("div");
containerDiv.setAttribute("id", "containerDiv");
document.body.appendChild(containerDiv);

function leftSideDiv() {
  var div1 = document.createElement("div");
  div1.setAttribute("id", "sideDiv");
  containerDiv.appendChild(div1);
  var addDiv = document.createElement("button");
  addDiv.id = "plusButton";
  addDiv.innerHTML = `<i class="fa-solid fa-plus"></i>`;
  div1.appendChild(addDiv);
  addDiv.addEventListener("click", function (event) {
    creatAndAppendNewBox(event);
  });

  var penButton = document.createElement("button");
  div1.appendChild(penButton);
  penButton.id = "penButton";
  penButton.innerHTML = `<i class="fa-solid fa-pencil"></i>`;

  penButton.addEventListener("click", function () {
    var date = new Date();
    var day = date.getDate();
    var month = date.toLocaleString("en-US", {
      month: "long",
    });
    var year = date.getFullYear();
    var fulldate = `${day} ${month} ${year}`;

    var newObj = {
      id: (notesArray.length + 1).toString(),
      date: fulldate,
      title: "Drawing Title",
      content: "",
      typeof: "drawing",
    };

    notesArray.unshift(newObj);

    renderDataInMiddle(notesArray);
    saveArraytoStorage();
    renderInRight(newObj);
  });

  var toDoButton = document.createElement("button");
  div1.appendChild(toDoButton);
  toDoButton.id = "addressButton";
  toDoButton.innerHTML = `<i class="fa-solid fa-list"></i>`;
  toDoButton.addEventListener("click", function (event) {
    var date = new Date();
    var day = date.getDate();
    var month = date.toLocaleString("en-US", {
      month: "long",
    });
    var year = date.getFullYear();
    var fulldate = `${day} ${month} ${year}`;

    var newObj = {
      id: (notesArray.length + 1).toString(),
      date: fulldate,
      title: "Add Title",
      content: "<ul><li></li></ul>",
    };
    notesArray.unshift(newObj);
    renderDataInMiddle(notesArray);
    saveArraytoStorage();
    renderInRight(newObj);
  });

  var locationButton = document.createElement("button");
  div1.appendChild(locationButton);
  locationButton.id = "locationButton";
  locationButton.innerHTML = `<i class="fa-solid fa-location-dot"></i>`;
  locationButton.addEventListener("click", function () {
    getLocationLatitudeAndLongitude();
  });
}
leftSideDiv();

//Middle Div
function middleDiv() {
  var objMainDiv = document.createElement("div");
  objMainDiv.id = "objMainDiv";
  containerDiv.appendChild(objMainDiv);
}
middleDiv();

//Right Div
function rightDivCreated() {
  var rightDiv = document.createElement("div");
  containerDiv.appendChild(rightDiv);
  rightDiv.id = "rightDiv";
}
rightDivCreated();

//Middle Div
function renderDataInMiddle(data) {
  var objMainDiv = document.getElementById("objMainDiv");
  objMainDiv.innerHTML = "";

  var contentHtml = data.map(function (item, index) {
      if (item.typeof === "drawing") {
        return `<div class="smallBoxOfObject" data-id="${item.id}">
                      <button class='delete-button' data-id='${item.id}'>x</button>
                      <li>${item.date}</li>
                      <h3>${item.title}</h3>
                      <img ${item.content}"></img>
                      </div>`;
      } else {
        return `<div class="smallBoxOfObject" data-id="${item.id}">
                      <button class='delete-button' data-id='${item.id}'>x</button>
                      <li>${item.date}</li>
                      <h3>${item.title}</h3>
                      <p>${item.content.slice(0, 350)}</p>
                      </div>`;
      }
    })
    .join("");

  objMainDiv.innerHTML = contentHtml;

  var smallBoxOfObjects = document.querySelectorAll(".smallBoxOfObject");
  smallBoxOfObjects.forEach(function (box) {
    box.addEventListener("click", function () {
      const id = box.getAttribute("data-id");
      const note = data.find(function (item) 
      {
        return item.id === id} 
      );
      console.log(note);
      renderInRight(note);
      saveArraytoStorage();
    });
  });
  var deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const id = button.getAttribute("data-id");
      
      deleteNoteById(id);
    });
  });
}
function renderInRight(note) {
  selectedNote = note;
  var rightDiv = document.getElementById("rightDiv");
  rightDiv.innerHTML = "";
  if (!note || Object.keys(note).length === 0) {
    rightDiv.innerHTML = "<p>Welcome to my website</p>";
    return;
  }
  var contentDiv = document.createElement("div");
  contentDiv.classList.add("contentDiv");
  contentDiv.setAttribute("id", "editor");
  rightDiv.appendChild(contentDiv);

  var date = document.createElement("li");
  date.textContent = note.date;
  date.setAttribute("class", "date");
  contentDiv.appendChild(date);

  var title = document.createElement("h3");
  title.classList.add("edit-title");
  title.textContent = note.title;
  title.setAttribute("contentEditable", "true");
  contentDiv.appendChild(title);
  title.addEventListener("input", function (event) {
    // contentEditable(event, note.id);
    note.title = title.textContent;
    note.date = new Date().toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    saveArraytoStorage();
    renderDataInMiddle(notesArray);
  });

  if (note.typeof === "drawing") {
    var drawingDiv = document.createElement("div");
    drawingDiv.classList.add("drawing-canvas");
    drawingDiv.innerHTML = `<canvas id="canvas" ></canvas>`;
    contentDiv.appendChild(drawingDiv);
    var canvas = new fabric.Canvas("canvas", {
      isDrawingMode: true,
    });

    if (note.content.includes("<img")) {
      var imgSrc = note.content.match(/src="([^"]+)"/)[1];
      fabric.Image.fromURL(imgSrc, function (img) {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }
    canvas.on("object:modified", function () {
      autoSaveDrawing(canvas, note);
    });
    canvas.on("path:created", function () {
      autoSaveDrawing(canvas, note);
    });

    function autoSaveDrawing(canvas, note) {
      var drawingData = canvas.toDataURL("image/png");
      note.content = `<img src="${drawingData}" />`;

      saveArraytoStorage();
      renderDataInMiddle(notesArray);
      renderInRight(note);
    }

    var eraseButton = document.createElement("button");
    eraseButton.classList.add("eraseButton");
    eraseButton.textContent = "Erase";
    contentDiv.appendChild(eraseButton);

    eraseButton.addEventListener("click", function () {
      canvas.clear();
      note.content = "";
      renderDataInMiddle(notesArray);
      saveArraytoStorage();
      renderInRight(note);
    });
  } else {
    var content = document.createElement("p");
    content.innerHTML = note.content;
    content.classList.add("edit-content");
    content.setAttribute("contentEditable", "true");
    contentDiv.appendChild(content);
    content.addEventListener("input", function (event) {
      contentEditable(event, note.id);
    });
    var quill = new Quill(".edit-content", {
      theme: "snow",
    });
    quill.on("text-change", function () {
      note.content = quill.root.innerHTML;
      saveArraytoStorage();
      renderDataInMiddle(notesArray);
    });
  }

  var smallBoxOfObjects = document.querySelectorAll(".smallBoxOfObject");
  smallBoxOfObjects.forEach(function (box, i) {
    if (box.getAttribute("data-id") == note.id) {
      box.classList.add("selected");
    } else {
      box.classList.remove("selected");
    }
  });
}



function findNoteByID(id){
  return notesArray.find(function(note){
    return note.id ===id
  })
}

function contentEditable(event, id) {
  event.stopPropagation();
  var note = findNoteByID(id);
  if(!note){
    console.log('not found');
    return
  }
  var editedElement = event.target;
  
  note.date = new Date().toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  var dateShowMore = document.querySelector(".date");
  dateShowMore.textContent = note.date;
  var editedTextContent = editedElement.textContent;

  if (editedElement.classList.contains("edit-title")) {
    note.title = editedTextContent;
  } else if (editedElement.classList.contains("edit-content")) {
    note.content = editedTextContent;
  }

  saveArraytoStorage();
  renderDataInMiddle(notesArray);
}

function creatAndAppendNewBox() {
  var date = new Date();
  var day = date.getDate();
  var month = date.toLocaleString("en-US", {month: "long",});
  var year = date.getFullYear();
  var fulldate = `${day} ${month} ${year}`;
  var newObj = {
    id: (notesArray.length + 1).toString(),
    date: fulldate,
    title: "Add Title",
    content: "Add Content",
  };
  notesArray.unshift(newObj);
  saveArraytoStorage();
  console.log(newObj);
  renderDataInMiddle(notesArray);
  renderInRight(newObj);
}

renderDataInMiddle(notesArray);
// renderInRight(notesArray, 0);

function getLocationLatitudeAndLongitude() {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    alert("Latitude: " + latitude + "\nLongitude: " + longitude);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
  getLocation();
}

function sortArrayByDate() {
  notesArray.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  console.log("sorting_Done");
}
sortArrayByDate();
renderDataInMiddle(notesArray);
selectedNote = notesArray[0];
renderDataInMiddle(notesArray);
renderInRight(selectedNote);

function deleteNoteById(id) {
  
  const noteIndex = notesArray.findIndex((note) => note.id === id);
  console.log(noteIndex);
  if (noteIndex !== -1) {
    notesArray.splice(noteIndex, 1);
    saveArraytoStorage();
    renderDataInMiddle(notesArray);
    if (selectedNote && selectedNote.id === id) {
      const newSelectedIndex = notesArray.findIndex((note) => note.id !== id);
      console.log(newSelectedIndex);
      selectedNote = notesArray[newSelectedIndex] || null;
      console.log(selectedNote);
      renderInRight(selectedNote);
    }
  } else {
    console.log( id, "not found");
  }
}