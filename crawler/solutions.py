import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import re
import os
import sys

pid = sys.argv[1]

if "problem{}".format(pid) not in os.listdir("solutions"):
    os.mkdir("solutions/problem{}".format(pid))

with open("links/pid{}_sol_links.txt".format(pid), "r") as f:
    link_list = f.read().split("\n")


for i in range(len(link_list)):
    driver = webdriver.Chrome('/Users/kwonsunbin/Downloads/chromedriver')
    driver.get(
        'http://judge.u-aizu.ac.jp/onlinejudge/{}'.format(link_list[i]))
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "code"))
    )
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    with open("solutions/problem{}/{}.txt".format(pid, i), "w") as f:
        f.write(soup.select("#code")[0].text)
    driver.quit()
