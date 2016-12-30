FROM    python:2-onbuild

# Expose port
EXPOSE  8000

CMD     cd ./src && gunicorn -b 0.0.0.0:8000 app
