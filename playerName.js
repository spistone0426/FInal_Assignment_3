
function userName() {
    var input = document.getElementById('userInput').value='';
    vanishSubmit();
    var form = document.getElementById('vanish');
    form.style.display = 'none';
    input.style.visibility = 'none';
}

var hideForm = function () {
    var form = document.getElementById('vanish');
    form.style.display = 'none';
};
