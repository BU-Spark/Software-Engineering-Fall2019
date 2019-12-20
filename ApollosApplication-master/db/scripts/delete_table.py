# CITATIONS:
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/dynamodb.html

import boto3

dynamodb = boto3.client('dynamodb')

table = input("Put table to delete: ")

#deletes specified table
try:
    dynamodb.delete_table(TableName=table)
    print("Table deleted successfully.")
except Exception as e:
    print("Could not delete table. Please try again in a moment. Error:")
    print(e)
