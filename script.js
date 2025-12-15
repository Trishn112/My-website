window.onload = function() {
    var modal = document.getElementById("contactModal");
    var btn = document.getElementById("contactBtn");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.classList.add("show");
    }
    span.onclick = function() {
        modal.classList.remove("show");
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove("show");
        }
    }
};