# CITATION: https://aws.amazon.com/developers/getting-started/python/
# CITATION: https://docs.aws.amazon.com/code-samples/latest/catalog/python-secretsmanager-secrets_manager.py.html

import boto3
import base64
from botocore.exceptions import ClientError

# Securely get secret value
def get_secret():

    secret_name = "dynamoDB-keyID"
    region_name = "us-east-2"

    session = boto3.session.Session()
    client = session.client(
        service_name = 'secretsmanager',
        region_name = region_name
    )


    try:
        get_secret_value_response = client.get_secret_value(
            SecretId = secret_name
        )
    except ClientError as e:
        if e.response['Error']['Code'] == 'DecryptionFailureException':
            raise e
        elif e.response['Error']['Code'] == 'InternalServiceErrorException':
            raise e
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            raise e
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            raise e
        elif e.response['Error']['Code'] == 'ResourceNotFoundException':
            raise e
            
    else:
        secret = get_secret_value_response['SecretString']
        secretSplit = secret.split('"')
        return secretSplit[3]

       