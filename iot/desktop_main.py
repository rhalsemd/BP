from fastapi import FastAPI
import requests
import json

app = FastAPI()

HOST = 'http://192.168.134.90:8000'
# HOST = 'http://192.168.137.13:8000'

@app.get('/')
async def root():
    response = requests.get(HOST)
    if response.status_code == 200:
        return json.loads(response.text)

@app.get('/open')
async def open(caseId: int, holderNum: int, action: str, depositeMoney: int=0, period: int=0, price: int=0, refundMoney: int=0):
    response = requests.get(f'{HOST}/open?caseId={caseId}&holderNum={holderNum}&action={action}&depositeMoney={depositeMoney}&period={period}&price={price}&refundMoney={refundMoney}')
    if response.status_code == 200:
        return json.loads(response.text)

@app.get('/open-all/{kioskId}')
async def open_all(kioskId):
    response = requests.get(f'{HOST}/open-all/{kioskId}')
    if response.status_code == 200:
        return json.loads(response.text)

@app.get('/close-all/{kioskId}')
async def close_all(kioskId):
    response = requests.get(f'{HOST}/close-all/{kioskId}')
    if response.status_code == 200:
        return json.loads(response.text)

@app.get('/current-weather')
async def current_weather(lat: float, lng: float):
    response = requests.get('{HOST}/current-weather')
    if response.status_code == 200:
        return json.loads(response.text)