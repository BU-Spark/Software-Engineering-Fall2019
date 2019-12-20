## Apollos Health Mobile Application
### Description:
Mobile application that will allow patients to easily access their medical records.

### Installation Instructions:

## Mac OS

1. Install homebrew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2. Use brew to install necessary packages
```
brew install git
```
```
brew install python
```
```
brew install node
```
```
brew install watchman
```

3. If not done so already, download XCode from Apple's App Store

4. Make a directory to hold the github repo and cd into it.
```
mkdir ~/Apollos
```
```
cd ~/Apollos
```
5. Clone the repo
``` 
git clone https://github.com/rhodesrm/ApollosApplication.git
```
6. cd into the repo
```
cd ApollosApplication
```
7. cd into the db folder
```
cd db
```
8. pip install all the requirements
```
pip3 install -r requirements.txt
```

9. export default aws region and keys. Start by installing AWS CLI:
```
curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-macos.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws2 configure
```
When prompts come up, respond with the information from the .csv file. For Default output format, just press enter.
```
AWS Access Key ID: [access key from accessKeys.csv]
AWS Secret Access Key: [secret access key from accessKeys.csv]
Default region name: us-east-2
```
```
pip3 install Flask
pip3 install flask_bcrypt
pip3 install boto3
pip3 install --user dynamodb_encryption_sdk
pip3 install PyJWT
```

10. run app.py
```
python3 app.py
```
11. If any errors of the format "No module named <MODULE>" occur, pip install the module
  
```
pip3 install <MODULE>
```
```
run app.py
```
12. In a new terminal window, 
```
cd ~/Apollos/ApollosApplication/frontEnd
```
13. run "npm install"
```
npm install
```
14. cd ios
``` 
cd ios
```
15. run "pod install"
```
sudo gem install cocoapods
```
```
pod install
```
16. cd out of ios and run react-native run-ios
```
cd ..
```
```
react-native run-ios
```
If getting font error, run this line in frontEnd: 
```
npx react-native link react-native-vector-icons
```
If getting "xcrun unable to find simctl" error, follow instruction below:
```
Xcode > Preferences > Locations     And assign the Command Line Tools
```
## Note:
### Username must be at least 6 characters long
### Password must be at least 8 characters long

## To access the EC2 instance (not working. Use localhost that is set up when app.py is run):
```
ssh grant@18.217.163.109
```

When prompted for the password, use the AWS credentials.

### Requirements:
Frontend: The frontend requires React Native to be set up. See https://facebook.github.io/react-native/docs/getting-started for how to get started with react-native (using the React Native CLI quickstart). 

Backend: The requirements for the backend are outlined in the requirements.txt

### Running Tests:
``` 
cd ~/Apollos/ApollosApplication/db/scripts 
```
``` 
python test_scripts.py 
```

### Known Bugs:
- EC2 server does not fully work due to not having AWS credentials on the server
- Calendar is not fully functional
- Viewing a document causes a permission error
- User document list goes away after exiting list

### Feature Documentation:
- Patient registration
- Patient login
- JWT Authentication
- Profile page
- View Calendar
- Upload medical records to encrypted S3 bucket
- Permanently delete medical records from S3 bucket

### Future Expansions:
- Use LetsEncrypt for SSL cert
- Add provider login and interface
- Add communication between providers and patients
- More robust profile page that follows the wireframe
- Implement the "how do you feel today" feature 
- Add providers to documents
- Providers should have the ability to upload documents
- Add more robust error checking on the backend
- Allow users to view documents
