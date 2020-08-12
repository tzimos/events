FROM python:3.6
RUN apt update -y
RUN apt install netcat -y

ENV PYTHONUNBUFFERED 1

RUN mkdir /code

WORKDIR /code

COPY backend /code
COPY --chown=root docker/backend/wait-for-db.sh /code/wait-for-db.sh
RUN pip install --upgrade pip
RUN pip install -r /code/requirements.txt
