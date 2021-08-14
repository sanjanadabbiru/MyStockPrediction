from crontab import CronTab

cron = CronTab(crontab="""* * * * * command""")
job = cron.new(command='python3 Trial.py')
job.hour.every(24)
job.hour.also.on(1)
cron.write()
