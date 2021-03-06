function calC(a, b) {
  return Math.sqrt(a ** 2 + b ** 2);
}

function popUp(data) {
  removeHeaderFixed();
  const { count } = data;
  const backgorund = document.getElementById("background");
  const popup = document.getElementById("popup");

  backgorund.classList.add("show");
  popup.classList.add("show");

  const container = document.getElementById("container");
  const title = document.createElement("div");
  title.classList.add("slideTitle");
  const title_img = document.createElement("img");
  title_img.setAttribute(
    "src",
    `./images/detail/${data.name}/keyring_info.svg`
  );
  title.appendChild(title_img);
  container.appendChild(title);
  for (let i = 1; i < +count + 1; i++) {
    container.appendChild(createSlide(data, i));
  }

  const prev = document.createElement("a");
  prev.classList.add("prev");
  prev.innerHTML = `<img src="./images/icon/left.svg" />`;
  prev.addEventListener("click", () => {
    plusSlides(-1);
  });
  const next = document.createElement("a");
  next.classList.add("next");
  next.innerHTML = `<img src="./images/icon/right.svg" />`;

  next.addEventListener("click", () => {
    plusSlides(1);
  });
  const close = document.createElement("div");
  close.classList.add("close");
  close.innerHTML = `<img src="./images/icon/X.svg" />`;

  close.addEventListener("click", () => {
    addHeaderFixed();
    closePopUp();
  });
  container.appendChild(prev);
  container.appendChild(next);
  container.appendChild(close);

  const dots = createDots(count);
  container.appendChild(dots);
}

function createSlide(data, i) {
  const { name, type } = data;

  const slide = document.createElement("div");
  slide.classList.add("slide", "fade");
  const imgTag = document.createElement("img");
  imgTag.setAttribute("src", `./images/detail/${name}/${type}/0${i}.jpg`);
  if (i !== 1) {
    slide.style.display = "none";
  }
  slide.appendChild(imgTag);
  return slide;
}
function createDots(count) {
  const dots = document.createElement("div");
  dots.setAttribute("id", "dots");
  for (let i = 1; i <= count; i++) {
    const span = document.createElement("span");

    span.classList.add("dot");
    if (i === 1) {
      span.classList.add("active");
    }
    span.addEventListener("click", () => {
      currentSlide(i);
    });
    dots.appendChild(span);
  }
  return dots;
}

var slideIndex = 1;

function plusSlides(n) {
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

function removeHeaderFixed() {
  const header = document.querySelector(".header");
  header.style.display = "none";
}
function addHeaderFixed() {
  const header = document.querySelector(".header");
  header.style.display = "flex";
}
