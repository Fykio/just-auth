import jwt
import os
from datetime import datetime, timedelta, timezone
from flask import request, jsonify, make_response

JWT_SECRET = os.environ['JWT_SECRET']
JWT_COOKIE_NAME = os.environ['JWT_COOKIE_NAME']

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.now(timezone.utc) + timedelta(hours=24)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

def decode_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return payload['user_id']
    except jwt.InvalidTokenError:
        return None

def set_auth_cookie(response, user_id):
    token = generate_token(user_id)
    response.set_cookie(
        JWT_COOKIE_NAME,
        value=token,
        httponly=True,
        secure=False,   # set True in production with HTTPS
        samesite='Lax',
        max_age=86400,
        path='/'
    )
    return response

def clear_auth_cookie(response):
    response.set_cookie(JWT_COOKIE_NAME, value='', expires=0, path='/')
    return response

def get_current_user_id():
    token = request.cookies.get(JWT_COOKIE_NAME)
    if not token:
        return None
    return decode_token(token)
