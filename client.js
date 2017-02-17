(function () {
    const tfMorphs = document.querySelectorAll('[data-typeform]')

    [].forEach.call(tfMorphs, function(tfMorph) {
      const json = converter.getJson(tfMorph)

      fetch('http://172.20.12.32:8000/converter', {
          method: 'post',
          body: JSON.stringify(json)
      })
      .then(function (response) {
          tfMorph.innerHTML = response
      })
    })
})()
