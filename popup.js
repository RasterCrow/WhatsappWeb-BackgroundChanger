

//type 0 : error, 1:success
function showAlert(type, hideAfter) {
    console.log("show alert")
    if (type === 0) {
        $('#success-alert').hide();
        $('#error-alert').show();
        $("#error-alert").removeClass("fadeout").addClass("fadein");
        if (hideAfter) {
            setTimeout(function () {
                $('#error-alert').hide();
                $("#error-alert").removeClass("fadein").addClass("fadeout");
            }, 3000);
        }
    } else if (type === 1) {
        $('#error-alert').hide();
        $('#success-alert').show();
        $("#success-alert").removeClass("fadeout").addClass("fadein");
        if (hideAfter) {
            setTimeout(function () {
                $('#success-alert').hide();
                $("#success-alert").removeClass("fadein").addClass("fadeout");
            }, 3000);
        }
    }
}

//translations

function loadTranslation() {
    $('#titoloPrincipale').text(chrome.i18n.getMessage("appName"))
    $('#urlFormText').text(chrome.i18n.getMessage("tutorialText"))
    $('#urlFormUrlText').text(chrome.i18n.getMessage("urlText"))
    $('#setBackground').text(chrome.i18n.getMessage("setButton"))
    $('#resetBackground').text(chrome.i18n.getMessage("resetButton"))
}
loadTranslation()
//check if url is img
function checkURL(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

//set background
let setBackground = document.getElementById('setBackground');
setBackground.onclick = function (element) {
    let newBackground = document.getElementById("bgImageUrl").value
    if (checkURL(newBackground)) {
        chrome.storage.sync.set({ backgroundImage: newBackground }, function () {
            console.log("image set to : " + newBackground)
            showAlert(1, true)
        });
    } else {
        showAlert(0, true)
    }

}

//set background
let resetBackground = document.getElementById('resetBackground');
resetBackground.onclick = function (element) {
    chrome.storage.sync.remove("backgroundImage", function () {
        console.log("image reset")
        showAlert(1, true)
    });
}



