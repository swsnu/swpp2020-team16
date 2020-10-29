import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import re
import sys


pid = sys.argv[1]


option = webdriver.ChromeOptions()
option.add_argument('headless')
driver = webdriver.Chrome(
    '/Users/kwonsunbin/Downloads/chromedriver', options=option)


driver.get('http://judge.u-aizu.ac.jp/onlinejudge/solution.jsp?pid={}'.format(pid))


time.sleep(5)

# select by visible text

select = Select(driver.find_element_by_id('languageSelector'))
driver.implicitly_wait(5)
select.select_by_visible_text('Python3')
time.sleep(5)

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

link_list = []
re = re.compile
for i in soup.find_all('a'):
    if i.get("href").startswith("review"):
        link_list.append(i.get("href"))

driver.quit()

with open("links/pid{}_sol_links.txt".format(pid), "w") as f:
    for link in link_list:
        f.write(link+"\n")
