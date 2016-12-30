import falcon
import requests
import json
import config
import hashlib

from apiKeysRepository import ApiKeysRepository
from formHashRepository import FormHashRepository

from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

class Converter():
    def __init__(self):
        self.apiKeysRepository = ApiKeysRepository()
        self.formHashRepository = FormHashRepository()

    def prepareEmbed(self, formUid, formName):
        embedUrl = 'https://morphling1.typeform.com/to/' + formUid
        formName = formName
        formStyle =  'width:100%;height:500px;'
        embedCode = ('<!-- Change the width and height values to suit you best -->'
        '<div class="typeform-widget" data-url="__embed_url__" data-text="__form_name__" style="__style__"></div>'
        '<div style="font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px;">Powered by<a href="https://www.typeform.com/examples/forms/?utm_campaign=__form_uid__&amp;utm_source=typeform.com-5872961-Basic&amp;utm_medium=typeform&amp;utm_content=typeform-embedded-onlineform&amp;utm_term=EN" style="color: #999" target="_blank">Typeform</a></div>')

        embedCode = embedCode.replace('__form_uid__', formUid)
        embedCode = embedCode.replace('__embed_url__', embedUrl)
        embedCode = embedCode.replace('__form_name__', formName)
        embedCode = embedCode.replace('__style__', formStyle)

        return embedCode

    def getFormUidIfExist(self, json):
        hash = hashlib.sha1()
        hash.update(json)
        formHash = hash.hexdigest()
        formUid = self.formHashRepository.getFormByHash(formHash)
        return formUid if formUid else None

    def saveFormHash(self, json, uid):
        hash = hashlib.sha1()
        hash.update(json)
        formHash = hash.hexdigest()
        formUid = self.formHashRepository.setHashForForm(formHash, uid)
        return
        
    def on_post(self, req, resp):
        if req.content_length:
            content = json.load(req.stream)
            publicKey = req.headers['X-TYPEFORM-KEY']

            if publicKey is None:
                headers = {'X-Typeform-Key': config.TYPEFORM_API_KEY}
            else:
                originalApiKey = self.apiKeysRepository.getOriginalApiKey(publicKey)

                if originalApiKey:
                    headers = {'X-Typeform-Key': originalApiKey}
                else:
                    headers = {'X-Typeform-Key': config.TYPEFORM_API_KEY}

            formUid = self.getFormUidIfExist(json.dumps(content))
            if formUid:
                embed = self.prepareEmbed(formUid, 'Temp name')
                resp.status = falcon.HTTP_200
                resp.content_type = 'application/json'
                resp.body = embed
                return
            else:
                r = requests.post(config.TYPEFORM_API_CREATE_URL, headers = headers, data = json.dumps(content), verify=config.VERIFY_CREDENTIALS)
                #Link to typeform form
                # typeform_url = config.TYPEFORM_RENDER_BASE_URL + str(r.json()['id'])

                #Duplication link to land in the builder
                # typeform_duplicate_url = config.TYPEFORM_DUPLICATE_BASE_URL + str(r.json()['id']) + '?force_demo=true#landingPreview'

                dataFromApi = r.json()

                if 'id' in dataFromApi:
                    id = str(dataFromApi['id'])

                    embed = self.prepareEmbed(id, 'Form name should be here')
                    self.saveFormHash(json.dumps(content), id)
                    resp.status = falcon.HTTP_200
                    resp.content_type = 'application/json'
                    resp.body = embed
                else:
                    resp.status = falcon.HTTP_500
                    resp.content_type = 'application/json'
                    resp.body = json.dumps(dataFromApi)
        else:
            resp.status = falcon.HTTP_500
            resp.content_type = 'application/json'
            resp.body = '{Content has not been sent}'
