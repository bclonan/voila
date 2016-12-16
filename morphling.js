var formSchema = {
    title: 'DemoForm',
    fields: []
}
var fields = []
var types = {
    'INPUT': {
        'text': 'short_text'
    },
    'SELECT': {
        'select-one': 'multiple_choice'
    },
    'TEXTAREA': {
        'textarea': 'long_text'
    }
}

function _getJSON(formElements) {
    for (var key in formElements) {
        var item = formElements[key]
        if (!isNaN(key) && item.type !== 'button' && item.tagName !== undefined) {
            var element = {
                title: item.labels[0].textContent,
                type: types[item.tagName][item.type],
                properties: {},
                validations: {
                    required: false
                }
            }
            if (item.tagName === 'SELECT') {
                var choices = []
                for (var choiceKey in item.children) {
                    var label = item.children[choiceKey].innerText
                    if (label !== undefined) {
                        choices.push({label: label})
                    }
                }
                element.properties.choices = choices
                element.properties.allow_multiple_selection = false
                element.properties.randomize = false
                element.properties.vertical_alignment = false
                element.properties.allow_other_choice = false
            }
            fields.push(element)
        }
    }
    formSchema.fields = fields
    return formSchema
}

// <form data-typeform='askAwesomely'>
// </form>

(function () {
    const tfMorphs = document.querySelectorAll('[data-typeform]')

    for (const tfMorph of tfMorphs) {
        const json = _getJSON(tfMorph.elements)

        fetch('http://172.20.12.32:8000/converter', {
            method: 'post',
            body: JSON.stringify(json)
        }).then(function (response) {
            tfMorph.innerHTML = response
        })
    }
})()
