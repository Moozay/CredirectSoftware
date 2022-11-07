from multiprocessing import cpu_count



# Socket Path

bind = '0.0.0.0:8000'



# Worker Options

workers = cpu_count() + 1

worker_class = 'uvicorn.workers.UvicornWorker'



# Logging Options

loglevel = 'debug'

accesslog = '/home/credirect/Documents/CredirectSoftware/Backend/access_log'

errorlog =  '/home/credirect/Documents/CredirectSoftware/Backend/error_log'


