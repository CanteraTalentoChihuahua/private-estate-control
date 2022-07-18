import json
import sys
import requests
from pprint import pprint

regions = ['mx', 'us-ca']  # Change to your country

car = sys.stdin.readline()

car = car.replace("\n", "")

# change route to the one to the server and where the images will be stored
with open(r"C:/Users/almef/OneDrive/Escritorio/private-estate-control/api/public/car_plates/" + car, 'rb') as fp:
    response = requests.post(
        'https://api.platerecognizer.com/v1/plate-reader/',
        data=dict(regions=regions),  # Optional
        files=dict(upload=fp),
        headers={'Authorization': 'Token 1c95b2d69a848d94747bb6cc023ab8cd704940ce'})
pprint(response.json())
