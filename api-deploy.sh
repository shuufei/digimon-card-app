set -euv

readonly CURRENT_DIR=$($(cd $(dirname $0)) && pwd)
readonly ZIP_FILE=$CURRENT_DIR/api-get-credentials.zip

npx nx run api-get-credentials:build

cp $(dirname $0)/openssl ./dist/apps/api/get-credentials/
cd $(dirname $0)/dist/apps/api/get-credentials/
zip $ZIP_FILE -r ./
aws lambda update-function-code --function-name digimon_card_app-lambda --zip-file fileb://$ZIP_FILE
rm -f $ZIP_FILE
