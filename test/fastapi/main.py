import json
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "localhost",
    "localhost:8000"
]

app = FastAPI()

# origins에는 protocal, domain, port만 등록한다.
origins = [
    # "http://192.168.0.13:3000", # url을 등록해도 되고
    "*" # private 영역에서 사용한다면 *로 모든 접근을 허용할 수 있다.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # cookie 포함 여부를 설정한다. 기본은 False
    allow_methods=["*"],    # 허용할 method를 설정할 수 있으며, 기본값은 'GET'이다.
    allow_headers=["*"],	# 허용할 http header 목록을 설정할 수 있으며 Content-Type, Accept, Accept-Language, Content-Language은 항상 허용된다.
)

@app.get('/')
async def root():
    return {'message': 'hello, world!'}

@app.get('/weather')
async def weather(lat: str='37.5683', lon: str='126.9778'):
    weather_url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&lang=kr&units=metric&appid=d99a9cbb680b4e229b71185d0c2f7e0c'
    res = requests.get(weather_url)
    
    if res.status_code != 200:
        return {'result': 'error ' + res.status_code}

    res_json = json.loads(res.text)

    return res_json