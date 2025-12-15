const modal = document.getElementById("contactModal");
const btn = document.getElementById("contactBtn");
const close = document.querySelector(".close");

btn.onclick = () => modal.classList.add("show");
close.onclick = () => modal.classList.remove("show");

window.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
};
