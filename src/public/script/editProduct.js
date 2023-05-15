const changeImgBtn = document.querySelector("#changeImgBtn");
const editImg = document.querySelector("#editImg");
const curImg = document.querySelector("#curImg");

// change image button
changeImgBtn.addEventListener("click", () => {
    editImg.style.display = "block";
    curImg.style.display = "none";
});
