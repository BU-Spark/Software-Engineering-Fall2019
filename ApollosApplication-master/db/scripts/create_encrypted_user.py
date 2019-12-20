# CITATIONS:
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/dynamodb.html
# https://github.com/aws/aws-dynamodb-encryption-python

import boto3
import boto3.dynamodb.types

from dynamodb_encryption_sdk.encrypted.table import EncryptedTable
from dynamodb_encryption_sdk.identifiers import CryptoAction
from dynamodb_encryption_sdk.material_providers.aws_kms import AwsKmsCryptographicMaterialsProvider
from dynamodb_encryption_sdk.structures import AttributeActions


#Created encrypted user record in the database
def encrypt_item(USERNAME, PASSWORD, FIRST_NAME, MIDDLE_INITIAL, LAST_NAME, DOB, SEX, HEIGHT, WEIGHT, ALLERGIES, TOKEN, awsCmkId, table):
    
    kmsCmp = AwsKmsCryptographicMaterialsProvider(key_id=awsCmkId)
    actions = AttributeActions(
        default_action=CryptoAction.ENCRYPT_AND_SIGN
    )

    index_key = {}

    plaintext_item = {
        'USERNAME': USERNAME,
        'PASSWORD': PASSWORD,
        'FIRST_NAME': FIRST_NAME,
        'MIDDLE_INITIAL': MIDDLE_INITIAL,
        'LAST_NAME': LAST_NAME,
        'DOB': DOB,
        'SEX': SEX,
        'HEIGHT': HEIGHT,
        'WEIGHT': WEIGHT,
        'ALLERGIES': ALLERGIES,
        'AUTH_TOKEN': TOKEN
    }

    encrypted_attributes = set(plaintext_item.keys())
    
    unencrypted_attributes = set(index_key.keys())

    encrypted_table = EncryptedTable(table=table, materials_provider=kmsCmp, attribute_actions=actions)
    encrypted_table.put_item(Item=plaintext_item)

    encrypted_item = table.get_item(Key={'USERNAME': USERNAME})["Item"]
    decrypted_item = encrypted_table.get_item(Key={'USERNAME': USERNAME})["Item"]

    # Verify that all of the attributes are different in the encrypted item
    for name in encrypted_attributes:
        if name != 'USERNAME':
            assert encrypted_item[name] != plaintext_item[name]
            assert decrypted_item[name] == plaintext_item[name]

    # Verify that all of the attributes that should not be encrypted were not.
    for name in unencrypted_attributes:
        assert decrypted_item[name] == encrypted_item[name] == plaintext_item[name]

    # # Clean up the item
    # encrypted_table.delete_item(Key=index_key)

