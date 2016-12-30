import falcon
import requests
import json
import config
import hashlib

from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

class Register():
    url = '/'

    def on_post(self, req, resp):
        if req.content_length:
            content = json.load(req.stream)

            hash = hashlib.sha1()
            publicKey = hash.update(content)

            resp.status = falcon.HTTP_200
            resp.content_type = 'application/json'
            resp.body = publicKey
        else:
            resp.status = falcon.HTTP_500
            resp.content_type = 'application/json'
            resp.body = '{Content has not been sent}'