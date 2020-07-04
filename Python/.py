import time
import threading

def longtime(): 
  time.sleep(1)
  print('I sleep 1')

t = threading.Thread(target=longtime, name='longtime_thread')
t.start()