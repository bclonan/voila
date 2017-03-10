import Tree from './tree'

import ShortText from './blocks/short-text'

var formSchema = {
    title: 'DemoForm',
    fields: []
}
var types = {
    'INPUT': {
        'text': 'short_text',
        'email': 'email',
        'date': 'date',
        'url': 'website',
        'tel': 'short_text',
        'number': 'number',
        'range': 'opinion_scale'
    },
    'SELECT': {
        'select-one': 'multiple_choice'
    },
    'TEXTAREA': {
        'textarea': 'long_text'
    }
}

function _getJSON(form) {
    const formElements = form.elements

    const tree = new Tree()
    tree.fill(form)

    const parsedObject = tree.getFieldsWithLabels()
    const fields = []

    for (const pair in parsedObject) {
        const field = pair.field
        const label = pair.label.html

        const fieldType = getFieldType(field)
        switch (fieldType) {
            case 'SHORT_TEXT':
                const shortText = new ShortText(field, label)
                fields.push(shortText)
                break;

            default:
                break;
        }        
    }
    console.log('Result parsed object:', parsedObject)

    for (var key in formElements) {
        var item = formElements[key]
        if (!isNaN(key) && item.type !== 'button' && item.labels && item.labels.length > 0 && item.tagName !== undefined) {
            var element = {
                title: item.labels[0].textContent,
                type: types[item.tagName][item.type],
                properties: {},
                validations: {
                    required: false
                }
            }
            var max = parseInt(item.max)
            var min = parseInt(item.min)
            if (item.type === 'range') {
                element.properties.steps = (max <= 11) ? max : 11
                element.properties.start_at_one = min === 1
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
                if (choices.length > 8) {
                    element.type = 'dropdown'
                    element.properties.alphabetical_order = false
                } else {
                    element.properties.allow_multiple_selection = false
                    element.properties.randomize = false
                    element.properties.vertical_alignment = false
                    element.properties.allow_other_choice = false
                }
            }
            fields.push(element)
        }
    }
    formSchema.fields = fields
    return formSchema
}

function execTypeform () {
    (function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id="typeform" + Math.random().toString(36).substring(7),b="https://s3-eu-west-1.amazonaws.com/share.typeform.com/";if(!gi.call(d,id)){js=ce.call(d,"script");js.id=id;js.src=b+"widget.js";q=gt.call(d,"script")[0];q.parentNode.insertBefore(js,q)}})()
}

(function () {
    const tfMorphs = document.querySelectorAll('[data-typeform]')

    for (const tfMorph of tfMorphs) {
        tfMorph.style.visibility = 'hidden'
        const json = _getJSON(tfMorph)
        var customHeaders = new Headers({
            'X-Typeform-Key': tfMorph.getAttribute('data-typeform'),
            'Content-Type' : 'text/plain'
        })
        fetch('http://localhost:7000/converter', {
            headers: customHeaders,
            method: 'post',
            body: JSON.stringify(json)
        })
        .then(function (response) {
            response.text().then(function (text) {
                tfMorph.style.visibility = 'visible'
                tfMorph.innerHTML = text
                execTypeform()
            })
        })
    }
})()
