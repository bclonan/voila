import redis

class FormHashRepository():
    def __init__(self):
        self.connection = redis.StrictRedis(host='redis', port=6379, db=0)

    def getFormByHash(self, hash):
        return self.connection.get('form_' + hash)

    def setHashForForm(self, hash, form):
        return self.connection.set('form_' + hash, form)
