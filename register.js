
function registerApiKey() {
    const apiKey = document.forms["register-tf-api-key"]["tf-api-key"].value

    fetch('http://localhost:7000/register', {
        method: 'post',
        body: JSON.stringify(apiKey)
    })
    .then(function (response) {
        response.text().then(function (text) {
            document.getElementById('registered-key').style.visibility = 'visible'
            document.getElementById('new-key').innerHTML = text
        })
    })
}
