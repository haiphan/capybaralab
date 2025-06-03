#!/usr/bin/env python3

import urllib.request
import json
from datetime import datetime

def getTodayYymmdd():
    return datetime.now().strftime('%Y-%m-%d')

def make_http_request_urllib(url):
    try:
        with urllib.request.urlopen(url) as response:
            data = response.read().decode('utf-8')
            json_data = json.loads(data)
            return json_data
    except urllib.error.URLError as e:
        print(f"Error making request: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None

def getRow(r):
    entryPerArea = r['entryPerArea']
    deliveryStart = r['deliveryStart']
    price = float(entryPerArea['FI']) / 10
    if price > 0:
        price *= 1.24
    price = round(price, 3)
    return f'{deliveryStart},{price}'

def getElectricityPrice():
    today = getTodayYymmdd()
    api_url = f'https://dataportal-api.nordpoolgroup.com/api/DayAheadPrices?date={today}&market=DayAhead&deliveryArea=FI&currency=EUR'
    response_json = make_http_request_urllib(api_url)
    if not response_json:
        print("nodata")
        return "nodata"
    rows = response_json['multiAreaEntries']
    rows = [getRow(r) for r in rows]
    dayPrices = ';'.join(rows)
    print(dayPrices)
    return dayPrices
    

getElectricityPrice()