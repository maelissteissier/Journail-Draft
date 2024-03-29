# Launch frontend script
cd /Users/maelissteissier/JournailingApp/jourNailing/journailing-frontend
/Users/maelissteissier/JournailingApp/jourNailing/journailing-frontend/LOCAL_PROD_launch_frontend.sh &

# launch Backend
source /Users/maelissteissier/PycharmProjects/jourNailing/jourNailing_backend/venv/bin/activate
export PYTHONPATH=/Users/maelissteissier/JournailingApp/jourNailing:/Users/maelissteissier/PycharmProjects/jourNailing/jourNailing_backend:$PYTHONPATH
export CORS_ORIGIN_LOCALHOST='http://localhost:9875'
export CORS_ORIGIN_LOCALHOST_ANGULAR='http://localhost:4875'
export CORS_ORIGIN_LOCAL_IP='http://192.168.2.31:9875'
export CORS_ORIGIN_LOCAL_IP_ANGULAR='http://192.168.2.31:4875'
export SQLALCHEMY_DATABASE_URI='sqlite:///journailing_local_prod.db'
export FLASK_PORT='9876'
/usr/local/bin/python3.9 /Users/maelissteissier/JournailingApp/jourNailing/jourNailing_backend/app.py



