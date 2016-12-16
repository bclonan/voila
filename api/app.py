import falcon

import converter

api = application = falcon.API()

converter = converter.Converter()
api.add_route('/converter', converter)
