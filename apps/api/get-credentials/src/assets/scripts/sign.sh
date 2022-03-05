#!/bin/bash
set -eu

readonly CURRENT_DIR=$(pwd)
export PATH="$PATH:$CURRENT_DIR"

readonly DISTRIBUTION_ENDPOINT="https://d2399fwvfjwbi3.cloudfront.net"
# 1時間後に失効
readonly EXPIRED=$(($(date +%s) + 60*60*24))
readonly POLICY_STATEMENT="{\"Statement\":[{\"Resource\":\"${DISTRIBUTION_ENDPOINT}/*\",\"Condition\":{\"DateLessThan\":{\"AWS:EpochTime\":${EXPIRED}}}}]}"
readonly PRIVATE_KEY="$(dirname $0)/key-pair/private_key.pem"

readonly POLICY=$(echo $POLICY_STATEMENT | base64 | tr -- '+=/' '-_~')
readonly SIGNATURE=$(echo $POLICY_STATEMENT | openssl sha1 -sign $PRIVATE_KEY | openssl base64 -A | tr -- '+=/' '-_~')

readonly QUERY_STRINGS="Policy=${POLICY}&Signature=${SIGNATURE}&Key-Pair-Id=K3E7SLCXVOGN8A"

echo "${QUERY_STRINGS}"
