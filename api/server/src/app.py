import falcon

import converter
import register

class CorsMiddleware(object):

    def process_request(self, request, response):
        origin = request.get_header('Origin')
        response.set_header('Access-Control-Allow-Origin', '*')
        response.set_header('Access-Control-Allow-Headers', 'X-Typeform-Key')

api = application = falcon.API(middleware=[CorsMiddleware()])

converter = converter.Converter()
api.add_route('/converter', converter)

register = register.Register()
api.add_route('/register', register)
