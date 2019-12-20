# CITATIONS:
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/dynamodb.html

import boto3
from boto3.dynamodb.conditions import Key, Attr

from dynamodb_encryption_sdk.encrypted.table import EncryptedTable
from dynamodb_encryption_sdk.identifiers import CryptoAction
from dynamodb_encryption_sdk.material_providers.aws_kms import AwsKmsCryptographicMaterialsProvider
from dynamodb_encryption_sdk.structures import AttributeActions


dynamodb = boto3.resource('dynamodb')

#pulls specified data from user record in the database
def fetch_user_info(username, data, awsCmkId, table):
    kmsCmp = AwsKmsCryptographicMaterialsProvider(key_id=awsCmkId)
    actions = AttributeActions(
    default_action=CryptoAction.ENCRYPT_AND_SIGN
    )
    encrypted_table = EncryptedTable(table=table, materials_provider=kmsCmp, attribute_actions=actions)

    resp = encrypted_table.get_item(
        Key = {'USERNAME': username}
    )

    user = resp['Item']

    info = user[data]

    return info

