// change image button
const changeImgBtn = document.querySelector("#changeImgBtn");
const editImg = document.querySelector("#editImg");
const curImg = document.querySelector("#curImg");
changeImgBtn.addEventListener("click", () => {
    editImg.style.display = "block";
    curImg.style.display = "none";
});
