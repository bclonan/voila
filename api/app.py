import falcon

import converter

class CorsMiddleware(object):

    def process_request(self, request, response):
        origin = request.get_header('Origin')
        response.set_header('Access-Control-Allow-Origin', '*')

api = application = falcon.API(middleware=[CorsMiddleware()])

converter = converter.Converter()
api.add_route('/converter', converter)
