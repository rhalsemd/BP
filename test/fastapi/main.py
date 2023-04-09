from fastapi import FastAPI
import requests
import json

app = FastAPI()

@app.get('/')
async def root():
    response = requests.get('http://192.168.137.28:8000/')
    if response.status_code == 200:
        return json.loads(response.text)

@app.get('/open')
async def open(caseId: int, holderNum: int, action: str, depositeMoney: int=0, period: int=0, price: int=0, refundMoney: int=0):
    response = requests.get(f'http://192.168.137.28:8000/open?caseId={caseId}&holderNum={holderNum}&action={action}&depositeMoney={depositeMoney}&period={period}&price={price}&refundMoney={refundMoney}')
    if response.status_code == 200:
        return json.loads(response.text)

@app.get('/current-weather')
async def current_weather(lat: float, lng: float):
    response = requests.get('http://192.168.137.28:8000/current-weather')
    if response.status_code == 200:
        return json.loads(response.text)