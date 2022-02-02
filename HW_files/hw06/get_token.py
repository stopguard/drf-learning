import requests

api_ip = '192.168.0.103'  # set your IP-address

token_response = requests.post(f'http://{api_ip}:8000/api-token-auth/',
                               data={'username': 'django',
                                     'password': 'geekshop'})

jwt_response = requests.post(f'http://{api_ip}:8000/api-jwt/',
                             data={'username': 'django',
                                   'password': 'geekshop'})

print('standard token:\n', token_response.json())
print('\njwt token:\n', jwt_response.json())

token_response = requests.post(f'http://{api_ip}:8000/api-jwt/',
                               data={'username': 'username07',
                                     'password': 'passwordusername07@mail.ru'})

token = token_response.json()['access']

data = requests.get(
    f'http://{api_ip}:8000/api/todo/',
    headers={
        "Content-Type": "application/json;charset=utf-8",
        "X-Requested-With": "XMLHttpRequest",
        'Authorization': f'Bearer {token}'
    }
)

print('data:\n', data.json())
