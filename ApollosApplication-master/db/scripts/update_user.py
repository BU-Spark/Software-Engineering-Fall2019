#CITATION: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/dynamodb.html

import boto3
import boto3.dynamodb.types
from scripts import get_user, get_secret, create_encrypted_user

def add_token(user, token, table):
    awsCmkId = get_secret.get_secret()
    usertest = get_user.fetch_user(user, awsCmkId, table)
    username = usertest['USERNAME']
    password = usertest['PASSWORD']
    first_name = usertest['FIRST_NAME']
    middle_init = usertest['MIDDLE_INITIAL']
    last_name = usertest['LAST_NAME']
    dob = usertest['DOB']
    sex = usertest['SEX']
    height = usertest['HEIGHT']
    weight = usertest['WEIGHT']
    allergies = usertest['ALLERGIES']

    create_encrypted_user.encrypt_item(username, password, first_name, middle_init, last_name, dob, sex, height, weight, allergies, token, awsCmkId, table)
