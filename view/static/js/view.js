function openModal() {
    const modal = document.getElementsByClassName("modal")[0];
    const img = document.getElementsByClassName("diploma_img")[0];
    const modalImg = document.getElementsByClassName("modal_img")[0];
    modal.style.display = "block";
    modalImg.src = img.src;

    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal()
        }
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "none";
}
