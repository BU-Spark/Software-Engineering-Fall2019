import boto3
from get_user import fetch_user
from delete_user import delete_user
from get_user_info import fetch_user_info
from create_encrypted_user import encrypt_item
from get_secret import get_secret

awsCmkId = get_secret()
table = boto3.resource("dynamodb").Table('userInfo')
USERNAME = str(input("please enter your username: "))

def test_get_user(USERNAME,awsCmkId, table):
    # get_user test
    fetched = fetch_user(USERNAME, awsCmkId, table)
    print("testing get_user on " + str(USERNAME) + " returns: " + str(fetched))

def test_get_user_info(USERNAME, awsCmkId, table):
    # get_user_info test
    DATA = str(input("please enter specific data needed: "))
    info = fetch_user_info(USERNAME, DATA, awsCmkId, table)
    print("getting " + str(DATA) + " from " + str(USERNAME) + " returns: " + str(info))

def test_create_encrypted_user(USERNAME, awsCmkId, table):
    PASSWORD = str(input("please enter your password: "))
    FIRST_NAME = str(input("please enter your first name: "))
    MIDDLE_INITIAL = str(input("please enter your middle initial: "))
    LAST_NAME = str(input("please enter your last name: "))
    DOB = str(input("please enter your date of birth (mm/dd/yyyy): "))
    SEX = str(input("please enter your sex: "))
    HEIGHT = int(input("please enter your height in inches: "))
    WEIGHT = int(input("please enter your weight in pounds: "))
    ALLERGIES = str(input("please specify any allergies you may have (ex. dairy, nuts): "))

    # create_encrypted_user tests
    encrypt_item(USERNAME, PASSWORD, FIRST_NAME, MIDDLE_INITIAL, LAST_NAME, DOB, SEX, HEIGHT, WEIGHT, ALLERGIES, awsCmkId, table)
    print("check database to see if " + str(USERNAME) + " has been created and all information aside from username is encrypted.")

def test_delete_user(USERNAME, awsCmkId, table):
    # delete_user test
    delete_user(USERNAME, awsCmkId, table)
    print("check database to see if " + str(USERNAME) + " has been deleted.")

# # call test_create_encrypted_user
# test_create_encrypted_user(USERNAME, awsCmkId, table)

# # call test_get_user
# test_get_user(USERNAME, awsCmkId, table)

# # call test_get_user_info
# test_get_user_info(USERNAME, awsCmkId, table)

# # call test_delete_user (only after checking that user was encrypted)
# test_delete_user(USERNAME, awsCmkId, table)