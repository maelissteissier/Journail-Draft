# Launch frontend script
cd /Users/maelissteissier/PycharmProjects/jourNailing/journailing-frontend
/Users/maelissteissier/PycharmProjects/jourNailing/journailing-frontend/LOCAL_DEV_launch_frontend.sh &

# launch Backend
source /Users/maelissteissier/PycharmProjects/jourNailing/jourNailing_backend/venv/bin/activate
export PYTHONPATH=/Users/maelissteissier/PycharmProjects/jourNailing:/Users/maelissteissier/PycharmProjects/jourNailing/jourNailing_backend:$PYTHONPATH
export CORS_ORIGIN_LOCALHOST='http://localhost:3000'
export CORS_ORIGIN_LOCALHOST_ANGULAR='http://localhost:4200'
export CORS_ORIGIN_LOCAL_IP='http://192.168.2.31:3000'
export CORS_ORIGIN_LOCAL_IP_ANGULAR='http://192.168.2.31:4200'
export FLASK_PORT='5000'
export SQLALCHEMY_DATABASE_URI='sqlite:///journailing_local_dev.db'
/usr/local/bin/python3.9 /Users/maelissteissier/PycharmProjects/jourNailing/jourNailing_backend/app.py

