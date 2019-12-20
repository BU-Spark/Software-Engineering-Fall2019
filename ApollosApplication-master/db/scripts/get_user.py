# CITATIONS:
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/dynamodb.html

import boto3
from dynamodb_encryption_sdk.encrypted.table import EncryptedTable
from dynamodb_encryption_sdk.identifiers import CryptoAction
from dynamodb_encryption_sdk.material_providers.aws_kms import AwsKmsCryptographicMaterialsProvider
from dynamodb_encryption_sdk.structures import AttributeActions


dynamodb = boto3.resource('dynamodb')

#fetches entire user record from the database
def fetch_user(username, awsCmkId, table):
    try:
        kmsCmp = AwsKmsCryptographicMaterialsProvider(key_id=awsCmkId)
        actions = AttributeActions(
        default_action=CryptoAction.ENCRYPT_AND_SIGN
        )

        encrypted_table = EncryptedTable(table=table, materials_provider=kmsCmp, attribute_actions=actions)

        #gets decrypted info from encrypted table
        response = encrypted_table.get_item(
        Key = {'USERNAME': username}
        )
        
        item = response['Item']
        return item

    except Exception as e:
        print("in get_user.py: Exception. Could not get user from database. " + str(e))
        return -1
        