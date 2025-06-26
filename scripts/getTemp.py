#!/usr/bin/env python3

import urllib.request
import json
from datetime import datetime, timedelta

def getTodayYymmdd():
    return datetime.now().strftime('%Y-%m-%d')

def getTomorrowYymmdd():
    return (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')

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

def getTemp():
    latitude, longitude = 60.220492, 24.806607
    api_url = f'https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m'
    response_json = make_http_request_urllib(api_url)
    if not response_json:
        print("nodata")
        return "nodata"
    timeArr = response_json['hourly']['time']
    tempArr = response_json['hourly']['temperature_2m']
    rows = [f'{d},{tempArr[i]}' for i, d in enumerate(timeArr) if d.startswith(getTodayYymmdd()) or d.startswith(getTomorrowYymmdd())]
    tempStr = ';'.join(rows)
    print(tempStr)
    return tempStr
    

getTemp()