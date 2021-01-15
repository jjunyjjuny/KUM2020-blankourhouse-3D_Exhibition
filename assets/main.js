AFRAME.registerComponent("hotspots", {
  init: function () {
    this.el.addEventListener("reloadspots", function (evt) {
      const cam = document.getElementById("cam");
      const newspotgroup = document.getElementById(evt.detail.newspots);
      newspotgroup.setAttribute("scale", "1 1 1");
      cam.setAttribute(
        "animation__reset",
        `startEvents: reset; property: position; to: 0 1.6 0; dur: 1;`
      );
      cam.emit("reset");
    });
  },
});
AFRAME.registerComponent("spot", {
  schema: {
    linkto: { type: "string", default: "" },
    spotgroup: { type: "string", default: "" },
  },
  init: function () {
    const data = this.data;
    this.el.setAttribute("src", `##movepoint`);
    // this.el.setAttribute("look-at", "#cam");
    this.el.setAttribute("rotation", "-90 0 0");

    this.el.addEventListener("click", function () {
      const sky = document.getElementById("skybox");
      const cam = document.getElementById("cam");
      if (data.linkto == "#point26") {
        cam.setAttribute("rotation", "-10 0 0");
      }
      cam.setAttribute(
        "animation__move",
        `startEvents: move; property: position; to: ${data.x * 200} 1.6 ${
          data.y * 200
        }; dur: ${calC(Math.abs(data.x * 200), Math.abs(data.y * 200)) / 4};`
      );

      const spotcomp = document.getElementById("spots");
      const currspots = this.parentElement.getAttribute("id");
      const currspotgroup = document.getElementById(currspots);
      currspotgroup.setAttribute("scale", "0 0 0");

      cam.emit("move");

      setTimeout(() => {
        sky.setAttribute("src", data.linkto);
        spotcomp.emit("reloadspots", {
          newspots: data.spotgroup,
          currspots: currspots,
        });
      }, calC(Math.abs(data.x * 200), Math.abs(data.y * 200)) / 4 - 50);
    });
  },
});
AFRAME.registerComponent("detail", {
  init: function () {
    const data = this.data;

    if (data.pop) {
      this.el.setAttribute("gltf-model", "#" + data.src);
      this.el.addEventListener("click", () => {
        popUp(data);
      });
    } else if (data.detail) {
      this.el.setAttribute("gltf-model", "#" + data.src);
      this.el.addEventListener("click", () => {
        window.open("http://www.naver.com", "_blank");
      });
    }
  },
});

function calC(a, b) {
  return Math.sqrt(a ** 2 + b ** 2);
}

function popUp(data) {
  const { count } = data;
  console.log("popup :", data);
  console.log("count :", count);
  const backgorund = document.getElementById("background");
  const popup = document.getElementById("popup");

  backgorund.classList.add("show");
  popup.classList.add("show");

  const container = document.getElementById("container");
  for (let i = 1; i < +count + 1; i++) {
    container.appendChild(createSlide(data, i));
  }

  const prev = document.createElement("a");
  prev.classList.add("prev");
  prev.innerHTML = `<img src="./images/detail/left.svg" />`;
  prev.addEventListener("click", () => {
    plusSlides(-1);
  });
  const next = document.createElement("a");
  next.classList.add("next");
  next.innerHTML = `<img src="./images/detail/right.svg" />`;

  next.addEventListener("click", () => {
    plusSlides(1);
  });
  const close = document.createElement("div");
  close.classList.add("close");
  close.innerHTML = `<img src="./images/detail/X.svg" />`;

  close.addEventListener("click", () => {
    closePopUp();
  });
  container.appendChild(prev);
  container.appendChild(next);
  container.appendChild(close);

  createDots();
}

function createSlide(data, i) {
  const { name, type } = data;
  console.log("name, type :", name, type);

  const slide = document.createElement("div");
  slide.classList.add("slide", "fade");
  const imgTag = document.createElement("img");
  imgTag.setAttribute("src", `./images/detail/${name}/${type}/${i}.jpg`);
  imgTag.style.width = "500px";
  imgTag.style.height = "500px";
  if (i !== 1) {
    slide.style.display = "none";
  }
  slide.appendChild(imgTag);
  return slide;
}
function createDots() {
  const dots = document.getElementById("dots");
  for (let i = 1; i < 6; i++) {
    const span = document.createElement("span");
    span.classList.add("dot");
    span.addEventListener("click", () => {
      currentSlide(i);
    });
    dots.appendChild(span);
  }
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  console.log(n);
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function closePopUp() {
  const container = document.getElementById("container");
  const dots = document.getElementById("dots");

  while (container.firstChild) {
    container.firstChild.remove();
  }
  while (dots.firstChild) {
    dots.firstChild.remove();
  }

  document.getElementById("background").classList.toggle("show");
  document.getElementById("popup").classList.toggle("show");
}
