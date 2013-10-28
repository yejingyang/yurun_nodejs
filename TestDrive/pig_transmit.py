__author__ = 'Administrator'

import httplib
import urllib
import random
import time


def update_temp(temp, humi):
    http_client = None
    try:
        params = '[{"devtype":"TH","devnum":"01","temp":"'+str(temp)+'","humi":"'+str(humi)+'"}]'
        param = urllib.urlencode({'name':'hgff','pwd':'yang'})
        headers = {'gatekey':'5678'}
        http_client = httplib.HTTPConnection('172.17.13.90', 1337, timeout=2000)
        http_client.request('POST', '/login', param, headers)
        response = http_client.getresponse()

        print('hhhh')
        print(response.status)
        print(response.reason)
        print(response.read())
        print(response.getheader())
    except Exception, e:
        print(e)
    finally:
        if http_client:
            http_client.close()

#
# for i in range(1, 100):
#     tem = random.uniform(23, 56)
#     update_temp(tem)
#     time.sleep(5)
#     print('start ' + str(i) + 's')
#

for i in range(1, 2):
    tem = random.uniform(23, 56)
    humi = random.uniform(34, 98)
    update_temp(tem, humi)
    print('it is ' + str(i) + 'times')
    time.sleep(10)