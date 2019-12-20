import boto3

# Get the service resource.
dynamodb = boto3.resource('dynamodb')
tablename = input("Name the table you want to create: ")

# Create the DynamoDB table.
table = dynamodb.create_table(
    TableName=tablename,
    KeySchema=[
        {
            'AttributeName': 'USERNAME',
            'KeyType': 'HASH'
        },
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'USERNAME',
            'AttributeType': 'S'
        },
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,
        'WriteCapacityUnits': 5
    }
)

# Wait until the table exists.
table.meta.client.get_waiter('table_exists').wait(TableName=tablename)

# Print out some data about the table.
print(table.item_count)
