from flask import Flask

app = Flask(__name__)

# Make sure that Flask knows where to find your templates folder.
app.template_folder = '../templates'

from app import routes
