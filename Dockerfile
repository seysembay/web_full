FROM python:3.10.12

RUN apt-get update \
&& apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev
RUN pip3 install --upgrade pip

COPY ./web_development/ ./

RUN pip3 install -r req.txt
RUN pip3 install gunicorn
