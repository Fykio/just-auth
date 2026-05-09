import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from db import init_db, create_user, authenticate_user, get_user_by_id
from auth import get_current_user_id, set_auth_cookie, clear_auth_cookie

app = Flask(__name__)
CORS(app, origins=os.environ.get('CORS_ORIGIN', 'http://localhost:8888'), supports_credentials=True)

init_db()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"message": "Backend is up and running!"}), 200

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    user_id = create_user(email, password)
    if not user_id:
        return jsonify({'error': 'Email already exists'}), 409
    resp = jsonify({'message': 'User created', 'user_id': user_id})
    return set_auth_cookie(resp, user_id)

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user_id = authenticate_user(email, password)
    if not user_id:
        return jsonify({'error': 'Invalid credentials'}), 401
    resp = jsonify({'message': 'Signed in'})
    return set_auth_cookie(resp, user_id)

@app.route('/api/signout', methods=['POST'])
def signout():
    resp = jsonify({'message': 'Signed out'})
    return clear_auth_cookie(resp)

@app.route('/api/me', methods=['GET'])
def me():
    user_id = get_current_user_id()
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    user = get_user_by_id(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'id': user['id'], 'email': user['email'], 'created_at': user['created_at']})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7777, debug=False)
