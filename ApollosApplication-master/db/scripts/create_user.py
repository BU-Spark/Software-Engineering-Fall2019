import datetime
import boto3
import boto3.dynamodb.types

# CITATIONS:
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/dynamodb.html

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('user-info')

#creates unencrypted user in the database
def create_user(USERNAME, PASSWORD, FIRST_NAME, MIDDLE_INITIAL, LAST_NAME, DOB, SEX, HEIGHT, WEIGHT, ALLERGIES,TOKEN):
    try:

        ALLERGIES_SPLIT = ALLERGIES.split(', ')
        allergy_set = {}
        allergy_set = set(allergy_set.keys())
        for allergy in ALLERGIES_SPLIT:
            allergy_set.add(allergy)

        table.put_item(
            Item={
                'USERNAME': USERNAME,
                'PASSWORD': PASSWORD,
                'FIRST_NAME': FIRST_NAME,
                'MIDDLE_INITIAL': MIDDLE_INITIAL,
                'LAST_NAME': LAST_NAME,
                'DOB': DOB,
                'SEX': SEX,
                'HEIGHT': HEIGHT,
                'WEIGHT': WEIGHT,
                'ALLERGIES': allergy_set,
                'AUTH_TOKEN': TOKEN
        }
    )
        print("Sucessfully added {}.".format(USERNAME))
        return True
    except Exception as e:
        print("Could not add {}. \n{}".format(USERNAME, e))

