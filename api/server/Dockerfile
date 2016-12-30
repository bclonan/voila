FROM    python:2-onbuild

RUN     easy_install hashlib

# Expose port
EXPOSE  8000

CMD     cd ./src && gunicorn -b 0.0.0.0:8000 app
