# CITATIONS:
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/dynamodb.html

import boto3
from get_user import fetch_user

dynamodb = boto3.resource('dynamodb')

def delete_user(username, awsCmkId, table):
    item = fetch_user(username, awsCmkId, table)
    if(item == -1):
        # username does not exist in the database
        return

    table.delete_item(
        Key =
        {
            'USERNAME': username
        }
    )
    print(username + " was successfully deleted.")

