from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import json

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)


@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/project-details')
def get_all_project_details():
        return jsonify(project_details)

project_details = {
    "Ash_Flash_Browser": {
        "title": "Ash_Flash_Browser",
        "description": "A simple web browser built using Python and PyQt. It supports basic navigation and has a history management system."
      },
    "Scientific-Calculator": {
        "title": "Scientific-Calculator",
        "description": "A scientific calculator application developed with Python using the Tkinter library. It includes trigonometric, logarithmic, and arithmetic operations."
    },
      "Analog_Clock": {
        "title": "Analog_Clock",
        "description": "An analog clock application built using Python and Tkinter. It displays the current time using a graphical clock interface."
      },
      "Periodic-Table": {
           "title": "Periodic-Table",
            "description": "A graphical periodic table application developed with Python and Tkinter. It displays key element information."
      },
      "Pyhton-IDLE": {
           "title": "Pyhton-IDLE",
           "description": "A Python program that allows you to execute your python programs using the python IDLE."
        },
        "AshFlash": {
          "title": "AshFlash AI",
          "description": "Developed an AI assistant, AshFlash, using Python, with features similar to Google Assistant. Designed to perform various tasks such as voice commands, reminders, and automated functions. Incorporated natural language processing techniques for effective interaction and seamless task execution. Gained hands-on experience in integrating APIs and improving user interaction through Python."
        },
    "CRUD Application": {
         "title": "CRUD Application",
         "description": "Created a CRUD (Create, Read, Update, Delete) application using Python and MySQL for database management. Designed an intuitive user interface for managing records, providing efficient interaction with the MySQL database. Integrated Python's MySQL connector to ensure smooth communication between the application and the database. Strengthened skills in backend development and SQL queries, ensuring data integrity and security."
    },
    "Detection System": {
         "title": "Detection System (ARVIA)",
         "description": "Designed a remote-controlled IoT car equipped with advanced sensors and cameras for detecting underground elements. Proposed AR visualization and Google Street View integration for real-time detection and safety alerts. "
       }
}

@app.route('/project-details/<project_id>')
def get_project_details(project_id):
   details = project_details.get(project_id)
   if details:
      return jsonify(details)
   else:
      return jsonify({"error": "Project not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)