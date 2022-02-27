set -euv

readonly CURRENT_DIR=$($(cd $(dirname $0)) && pwd)
readonly ZIP_FILE=$CURRENT_DIR/api-get-credentials.zip

cd $(dirname $0)/dist/apps/api/get-credentials/
zip $ZIP_FILE -r ./
aws lambda update-function-code --function-name digimon_card_app-lambda --zip-file fileb://$ZIP_FILE
