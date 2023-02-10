from fastapi import FastAPI
import requests

import RPi.GPIO as GPIO
import time

import selenium                     # pip3 install selenium
from selenium import webdriver
from selenium.webdriver import ActionChains

from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager    # pip3 install webdriver-manager

from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait

import chromedriver_autoinstaller   # pip3 install chromedriver-autoinstaller

# sudo apt install chromium-chromedriver
# whereis chromedriver

from pyvirtualdisplay import Display
# sudo apt install xvfb
# sudo pip3 install pyvirtualdisplay

WINDOW_OPTION = True
KIOSK_ID = 1

KIOSK_HOST = 'http://localhost:85'
# KIOSK_HOST = 'http://bp.ssaverytime.kr:85'

# 크롬 드라이버 설정
print('[INFO] 크롬 드라이버 세팅')

# 가상 디스플레이 설정
# if WINDOW_OPTION == False:
    # display = Display(visible=0, size=(800, 600))
    # display.start()

try:
    if WINDOW_OPTION == True:   # 크롬 창 표시 True
        #driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        driver = webdriver.Chrome(service=Service('/usr/bin/chromedriver'))
    else:                       # 크롬 창 표시 False
        driver_options = webdriver.ChromeOptions()
        driver_options.add_argument("--headless")
        driver_options.add_argument("User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36")
        driver = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=driver_options)
        #driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=driver_options)
except:
    print('[INFO] 크롬 드라이버 다운로드중...')
    if WINDOW_OPTION == True:   # 크롬 창 표시 True
        chromedriver_autoinstaller.install(True)
        driver = webdriver.Chrome(service=Service('/usr/bin/chromedriver'))
    else:                       # 크롬 창 표시 True
        chromedriver_autoinstaller.install(True)
        driver_options = webdriver.ChromeOptions()
        driver_options.add_argument("--headless")
        driver_options.add_argument("User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36")
        driver = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=driver_options)

print('[INFO] 크롬 드라이버 세팅 종료')
driver.implicitly_wait(10)

# 로그인 URL 접속
print('[INFO] 키오스크 서비스를 시작합니다')
kiosk_url = f'{KIOSK_HOST}/kiosk/{KIOSK_ID}'
driver.get(url=kiosk_url)

app = FastAPI()

motor = {
    1: 21, 
    2: 20, 
    3: 26, 
    4: 19
}
proximity_sensor = {
    1: 18, 
    2: 17, 
    3: 27, 
    4: 22
}

@app.get('/')
async def root():
    return {'message': 'root directory'}

@app.get('/open')
async def open(caseId: int, holderNum: int, action: str, depositeMoney: int=0, period: int=0, price: int=0, refundMoney: int=0):
    if action == 'rent':        # 대여
        driver.get(url=f'{KIOSK_HOST}/kiosk/{caseId}/rent/guide/{holderNum}')
    elif action == 'return':    # 반납
        driver.get(url=f'{KIOSK_HOST}/kiosk/{caseId}/return/guide/{holderNum}')

    motor_pin = motor.get(holderNum)
    p_sensor_pin = proximity_sensor.get(holderNum)

    # GPIO 세팅
    GPIO.setmode(GPIO.BCM) 
    GPIO.setup(motor_pin, GPIO.OUT)
    GPIO.setup(p_sensor_pin, GPIO.IN)

    # holderid에 해당하는 motor_pin, p_sensor_pin에 대해 GPIO 명령어 전송
    pvm = GPIO.PWM(motor_pin, 50)
    pvm.start(0.0)

    pvm.ChangeDutyCycle(3.0)
    time.sleep(10.0)

    # 근접센서 결과
    # 0: 근접한 물체가 있음, 1: 근접한 물체가 없음
    p_sensor_result = GPIO.input(p_sensor_pin)
    brollyResult = not bool(p_sensor_result)

    pvm.ChangeDutyCycle(7.5)
    time.sleep(1.0)                     
    pvm.ChangeDutyCycle(0.0)
    time.sleep(1.0)

    # GPIO 통신 종료
    pvm.stop()
    GPIO.cleanup()

    if action == 'rent':        # 대여
        if brollyResult == False:
            driver.get(url=f'{KIOSK_HOST}/kiosk/{caseId}/rent/complete/{holderNum}/1')
        else:
            driver.get(url=f'{KIOSK_HOST}/kiosk/{caseId}/rent/complete/{holderNum}/0')
    elif action == 'return':    # 반납
        if brollyResult == True:
            driver.get(url=f'{KIOSK_HOST}/kiosk/{caseId}/return/complete/{holderNum}/1?depositeMoney={depositeMoney}&period={period}&price={price}&refundMoney={refundMoney}')
        else:
            driver.get(url=f'{KIOSK_HOST}/kiosk/{caseId}/return/complete/{holderNum}/0')

    return {
        'caseId': caseId
        ,'holderNum': holderNum
        ,'brollyResult': brollyResult
    }

@app.get('/current-weather')
async def current_weather(lat: float, lng: float):
    response = requests.get('http://bp.ssaverytime.kr:8080/api/weather/current-weather?lat={}&lng={}'.format(lat, lng))
    if response.status_code == 200:
        return {'result': response.text}
    
    return {'result': 'response error {}'.format(response.status_code)}