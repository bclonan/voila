import falcon
import requests
import json
import config
import hashlib

from apiKeysRepository import ApiKeysRepository

from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

class Register():
    def __init__(self):
        self.apiKeysRepository = ApiKeysRepository()

    def on_post(self, req, resp):
        if req.content_length:
            apiKey = json.load(req.stream)

            hash = hashlib.sha1()
            hash.update(apiKey)
            publicKey = hash.hexdigest()

            self.apiKeysRepository.setOriginalApiKey(publicKey, apiKey)

            resp.status = falcon.HTTP_200
            resp.content_type = 'application/json'
            resp.body = publicKey
        else:
            resp.status = falcon.HTTP_500
            resp.content_type = 'application/json'
            resp.body = '{Content has not been sent}'
