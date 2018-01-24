#by the binzy binz@binz.codes
if [ ! -d ./bin/kube/.generated ]; then mkdir ./bin/kube/.generated; fi;
export APP_NAME=$(jq -r '.name' package.json)
export APP_PATH=$(echo "/hosthome$(echo $PWD |  cut -c 6-)")
export APP_URL=$(jq -r '.url' package.json)
export APP_VERSION=$( cut -d '.' -f 1 <<< $(jq -r '.version' package.json) )
# change app
for f in ./bin/kube/tmpl/local/*.yaml; do envsubst < $f > ./bin/kube/.generated/$(basename $f); done;
echo "Done"