import os
import pandas as pd
import numpy as np
from pandas_datareader import data
import datetime

class DataColl:
	'''Import this to get access to functions that can Download new data set and also update the data set if it is not up to date.'''

	def ValidSymbols():
		tickers = data.get_nasdaq_symbols()
		tickers.reset_index(inplace=True, drop=False)
		symbols=[]
		date = (datetime.datetime.now() + datetime.timedelta(days=-100)).strftime("%Y-%m-%d")
		for i in tickers.index:
			if tickers['Listing Exchange'][i] == 'N':
				try:
					temp = data.DataReader(tickers['Symbol'][i], 'yahoo', date)
					symbols.append(tickers['Symbol'][i])
				except:
					pass
		head = ['Symbols']
		sym = pd.DataFrame(symbols)
		sym.to_csv('../DataSet/Valid.csv')


	def checkDataExists():
		if os.path.exists('../DataSet/Data'):
			print('DataSet exists.')
			DataColl.updateDataSet()
		else:
			if not os.path.exists('../DataSet'):
				os.mkdir('../DataSet')
				# DataColl.ValidSymbols()
			os.mkdir('../DataSet/Data')
			print('DataSet does not exist.')
			DataColl.createDataSet()

	def updateDataSet():
		'''Function to add trailing lines of data that is absent from current database.'''
		print('Starting DataSet updation.')
		# lines = f1.readlines()
  #       f1.close()
  #       temp = str(datetime.datetime.now().strftime("%Y-%m-%d"))
  #       start = time.time()
  #       for ind in range(len(lines)):
  #           if "Failed" in lines[ind]:
  #               continue
  #           else:
  #               line = lines[ind].split("--")
  #               name = str(line[3])
  #               if line[1] != str(datetime.datetime.now().strftime("%Y-%m-%d")):
  #                   print("Data of ", line[3] , " needs updating from ", end="")
  #                   START_DATE = DataSet.nextDate(line[1])
  #                   print(START_DATE)
  #                   try:
  #                       stockData = data.DataReader(name, 'yahoo', START_DATE)
  #                       stockData.reset_index(inplace=True,drop=False)
  #                       stockData = stockData[['Date','High','Low','Open','Close']]
  #                       if len(str(stockData['Date'][0])) > 11:
  #                           for i in stockData.index:
  #                               old = stockData['Date'][i]
  #                               new = str(old)[:10]
  #                               stockData['Date'] = stockData['Date'].replace(old,new)
  #                       df = pd.read_csv("./DataSet1/"+name+".csv")
  #                       df = df[['Date','High','Low','Open','Close']]
  #                       df1 = df.append(stockData)
  #                       df1 = df1[['Date','High','Low','Open','Close']]
  #                       df1.reset_index(drop=True, inplace=True)
  #                       prev = ''
  #                       for i in range(len(df1)-1,len(df)-2,-1):
  #                           if df1['Date'][i] == prev :
  #                               df1 = df1.drop(index = i)
  #                           else:
  #                               prev = df1['Date'][i]
  #                       df1.to_csv("./DataSet1/"+name+".csv")
  #                       line = str(line[0]) + " -- "+ str(df1['Date'][len(df1)-1])[:10] +" -- "+ 'Update' + " -- " + str(name) + " -- " + str(datetime.datetime.now().strftime("%H:%M:%S/%Y-%m-%d") + "\n")
  #                       f1 = open("DSUpdateLog.txt","a+")
  #                       f1.write(str(line))
  #                       f1.close()
  #                   except:
  #                   	pass




	def createDataSet():
		'''Function to create a new dataset.'''
		print('Starting to load DataSet.')
		START_DATE = "2000-01-01"
		tickers = data.get_nasdaq_symbols()
		tickers.reset_index(inplace=True, drop=False)
		symbols=[]
		counter=1
		for ind in tickers.index:
			if ind%100 == 0:
				print(ind)
			if tickers['Listing Exchange'][ind] == 'N':
				try:
					tickerName = tickers['Symbol'][ind]
					stockData = data.DataReader(tickerName, 'yahoo', START_DATE)
					stockData.reset_index(inplace=True, drop=False)
					if len(stockData)>100:
						print(tickerName)
						filename = '../DataSet/Data/' + str(tickerName) + '.csv'
						stockData.to_csv(filename, index=False)
						line = str(counter) + " -- "+ str(stockData['Date'][len(stockData)-1])[:10] +" -- " + "Admin" + " -- " + str(tickerName) + " -- " + str(datetime.datetime.now().strftime("%H:%M:%S/%Y-%m-%d") + "\n")
						f1 = open("../DataSet/Log.txt","a+")
						f1.write(str(line))
						f1.close()
						symbols.append(tickers['Symbol'][ind])
						counter+=1
				except:
					pass
		symbols = pd.DataFrame(symbols)
		symbols.columns = ['Symbols']
		symbols.to_csv('Valid.csv', index = False)


def main():
	DataColl.checkDataExists()
	# DataColl.ValidSymbols()

if __name__ == "__main__":
	main()





	