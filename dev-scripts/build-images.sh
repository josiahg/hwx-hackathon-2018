#!/usr/bin/env bash
cd ../frontend
ng build --prod
docker image build -t josiahgoodson/hackathon-frontend:latest .

cd ../backend
docker image build -t josiahgoodson/hackathon-backend:latest .