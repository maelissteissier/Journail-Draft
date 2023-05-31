# Launch frontend script
cd /Users/maelissteissier/PycharmProjects/jourNailing/journailing-frontend
/Users/maelissteissier/PycharmProjects/jourNailing/journailing-frontend/LOCAL_DEV_launch_frontend.sh &

# launch Backend
source /Users/maelissteissier/PycharmProjects/jourNailing/jourNailing_backend/venv/bin/activate
export PYTHONPATH=/Users/maelissteissier/PycharmProjects/jourNailing:/Users/maelissteissier/PycharmProjects/jourNailing/jourNailing_backend:$PYTHONPATH
export CORS_ORIGIN_LOCALHOST='http://localhost:3000'
export CORS_ORIGIN_LOCAL_IP='http://192.168.2.31:3000'
export FLASK_PORT='5000'
/usr/local/bin/python3.9 /Users/maelissteissier/PycharmProjects/jourNailing/jourNailing_backend/app.py

