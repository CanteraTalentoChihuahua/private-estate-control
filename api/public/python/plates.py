import json
import sys
import requests
from pprint import pprint

regions = ['mx', 'us-ca']  # Change to your country
with open(sys.argv[1], 'rb') as fp:
    response = requests.post(
        'https://api.platerecognizer.com/v1/plate-reader/',
        data=dict(regions=regions),  # Optional
        files=dict(upload=fp),
        headers={'Authorization': 'Token 1c95b2d69a848d94747bb6cc023ab8cd704940ce'})
pprint(response.json())
