TOKEN=$(curl -k -iX POST -H "accept: application/x-www-form-urlencoded" -d 'credentials={"username":"pvidal@hortonworks.com","password":"HWseftw33#"}' "https://192.168.56.100/identity/oauth/authorize?response_type=token&client_id=cloudbreak_shell&scope.0=openid&source=login&redirect_uri=http://cloudbreak.shell" | grep location | cut -d'=' -f 3 | cut -d'&' -f 1)
echo $TOKEN

# curl -k -iX POST \
#   'https://192.168.56.100/identity/oauth/authorize?response_type=token&client_id=cloudbreak_shell&scope.0=openid&source=login&redirect_uri=http://cloudbreak.shell' \
#   -H 'Postman-Token: a5cb2096-8820-4524-9663-7ab85c5b0ee7' \
#   -H 'accept: application/x-www-form-urlencoded' \
#   -H 'cache-control: no-cache' \
#   -d 'credentials={"username":"pvidal@hortonworks.com","password":"HWseftw33#"}'

# ENCODED_BLUEPRINT=$(base64 /Users/pvidal/Documents/data-science-sme/cloudbreak-assets/hwx-data-science-workshop/data-science-sme-blueprint.json)

#   curl -X POST \
#   https://192.168.56.100/cb/api/v1/blueprints/user \
#   -H "Authorization: Bearer $TOKEN" \
#   -H 'Content-Type: application/json' \
#   -H 'cache-control: no-cache' \
#   -d " {
#         \"ambariBlueprint\": \"$ENCODED_BLUEPRINT\",
#         \"description\": \"Blueprint for HWX Data Science Uploaded\",
#         \"inputs\": [],
#         \"tags\": {},
#         \"name\": \"data-science-workshop-upload\",
#         \"hostGroupCount\": 1,
#         \"status\": \"USER_MANAGED\",
#         \"public\": true
#     }" \
#   -k