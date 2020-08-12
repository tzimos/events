#!/bin/bash

echo "Waiting Postgres to launch on 5432..."

while ! nc -z db_prod 5432; do
    sleep 0.1 # wait for 1/10 of the second before check again
  done

  echo "Postgres launched"