import Tree from './tree'
import BlockTypeDetector from './blocks/blockTypeDetector'

import ShortText from './blocks/short-text'
import Constants from './constants'

var formSchema = {
    title: 'DemoForm',
    fields: []
}

class App { 
    _getJSON (form) {
        const formElements = form.elements
        let blockTypeDetector = new BlockTypeDetector()

        const tree = new Tree()
        tree.fill(form)

        const parsedObject = tree.getFieldsWithLabels()
        const parsedFields = []

        for (const pair of parsedObject) {
            const field = pair.field
            const label = pair.label.html
            const htmlElement = field.element

            const FieldProxy = blockTypeDetector.getFieldType(htmlElement)
            if (FieldProxy) {
                const fieldElement = new FieldProxy(field, label)
                parsedFields.push(fieldElement)
            } else {
                console.log('Has not been transfered', htmlElement)
            }
        }
        
        formSchema.fields = parsedFields
        return formSchema
    }

    _execTypeform () {
        (function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id="typeform" + Math.random().toString(36).substring(7),b="https://s3-eu-west-1.amazonaws.com/share.typeform.com/";if(!gi.call(d,id)){js=ce.call(d,"script");js.id=id;js.src=b+"widget.js";q=gt.call(d,"script")[0];q.parentNode.insertBefore(js,q)}})()
    }

    _addSignupBadge () {
        console.log('Not authorized')
    }

    voila () {
        const tfMorphs = document.querySelectorAll('[data-typeform]')

        for (const tfMorph of tfMorphs) {
            tfMorph.style.visibility = 'hidden'
            const json = this._getJSON(tfMorph)
            const accessKey = tfMorph.getAttribute('data-typeform')
            const isAuthorized = accessKey !== Constants.DEFAULT_APIKEY
            var customHeaders = new Headers({
                'X-Typeform-Key': accessKey,
                'Content-Type' : 'text/plain'
            })
            fetch('http://localhost:7000/converter', {
                headers: customHeaders,
                method: 'post',
                body: JSON.stringify(json)
            })
            .then(response => {
                response.text()
                .then(text => {
                    tfMorph.style.visibility = 'visible'
                    tfMorph.innerHTML = text

                    if (!isAuthorized) {
                        this._addSignupBadge()
                    }
                    this._execTypeform()
                })
            })
        }
    }
}

window.App = new App()
window.App.voila()