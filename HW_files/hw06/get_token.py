import requests

api_ip = '192.168.0.103'   # set your IP-address

token_response = requests.post(f'http://{api_ip}:8000/api-token-auth/',
                               data={'username': 'django',
                                     'password': 'geekshop'})

jwt_response = requests.post(f'http://{api_ip}/api-jwt/',
                             data={'username': 'django',
                                   'password': 'geekshop'})

print('standard token:\n', token_response.json())
print('\njwt token:\n', jwt_response.json())
