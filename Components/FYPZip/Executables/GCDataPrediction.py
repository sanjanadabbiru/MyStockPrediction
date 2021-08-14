import math
import numpy as np
import pandas as pd
from pandas_datareader import data
from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler

class DataPred:
	def buildLSTM(df,header):
		data = df.filter([header])
		dataset = data.values
		training_data_len = math.ceil( len(dataset) *.8) 
		scaler = MinMaxScaler(feature_range=(0, 1)) 
		scaled_data = scaler.fit_transform(dataset)
		train_data = scaled_data[0:training_data_len  , : ]
		# train_data = dataset[0:training_data_len  , : ]
		#Split the data into x_train and y_train data sets
		x_train=[]
		y_train = []
		for i in range(30,len(train_data)):
			x_train.append(train_data[i-30:i,0])
			y_train.append(train_data[i,0]) 
		x_train, y_train = np.array(x_train), np.array(y_train)
		x_train = np.reshape(x_train, (x_train.shape[0],x_train.shape[1],1))
		model = Sequential()
		model.add(LSTM(units=50, return_sequences=True,input_shape=(x_train.shape[1],1)))
		model.add(LSTM(units=50, return_sequences=False))
		model.add(Dense(units=25))
		model.add(Dense(units=1))
		model.compile(optimizer='adam', loss='mean_squared_error')
		model.fit(x_train, y_train, batch_size=5, epochs=1)
		last_30_days=data[-30:].values
		last_30_days_scaled=scaler.transform(last_30_days)
		X_test=[]
		X_test.append(last_30_days_scaled)
		X_test=np.array(X_test)
		X_test=np.reshape(X_test,(X_test.shape[0],X_test.shape[1],1))
		pred_price=model.predict(X_test)
		pred_price=scaler.inverse_transform(pred_price)
		cur = ((data.iloc[len(data)-1]).values[0])
		pred = pred_price[0][0]
		perc = ((pred-cur)/cur)*100
		return cur,pred,perc

	def startLSTM(start,end):
		df1 = pd.read_csv('/content/Valid.csv')
		fullData= []
		d = ''
		for i in range(start,end):
		    # filename = '/Data/' + df1['Symbols'][i]+ '.csv'
		    arr=[]
		    arr.append(df1['Symbols'][i])
		    # df = pd.read_csv(filename)
		    df = data.DataReader(df1['Symbols'][i] , 'yahoo', '2000-01-01', '2021-06-16')
		    df.reset_index(inplace=True, drop=False)
		    d = str(df['Date'][len(df)-1])
		    openCur, openPred, openPerc = DataPred.buildLSTM(df,'Open')
		    arr.append(openCur)
		    arr.append(openPred)
		    arr.append(openPerc)
		    closeCur, closePred, closePerc = DataPred.buildLSTM(df,'Close')
		    arr.append(closeCur)
		    arr.append(closePred)
		    arr.append(closePerc)
		    highCur, highPred, highPerc= DataPred.buildLSTM(df,'High')
		    arr.append(highCur)
		    arr.append(highPred)
		    arr.append(highPerc)
		    lowCur, lowPred, lowPerc= DataPred.buildLSTM(df,'Low')
		    arr.append(lowCur)
		    arr.append(lowPred)
		    arr.append(lowPerc)
		    fullData.append(arr)
		df2 = pd.DataFrame(fullData)
		df2.columns = ['Symbols','OpenCur','OpenPred','OpenPerc','CloseCur','ClosePred','ClosePerc','HighCur','HighPred','HighPerc','LowCur','LowPred','LowPerc']
		predictions = 'LSTM'+ d[:10] + '.csv'
		if start == 0:
			df2.to_csv(predictions, mode='w', index=False)
		else:
			df2.to_csv(predictions, mode='a', header=False, index=False)

		
	def buildUA(df,header):
		data = df.filter([header])
		dataset = data.values
		training_data_len = math.ceil( len(dataset) *.8) 
		scaler = MinMaxScaler(feature_range=(0, 1)) 
		scaled_data = scaler.fit_transform(dataset)
		train_data = scaled_data[0:training_data_len  , : ]
		# train_data = dataset[0:training_data_len  , : ]
		#Split the data into x_train and y_train data sets
		x_train=[]
		y_train = []
		for i in range(30,len(train_data)):
			x_train.append(train_data[i-30:i,0])
			y_train.append(train_data[i,0]) 
		x_train, y_train = np.array(x_train), np.array(y_train)
		x_train = np.reshape(x_train, (x_train.shape[0],x_train.shape[1],1))
		regressor = Sequential()
		regressor.add(LSTM(units = 50, return_sequences = True, input_shape = (x_train.shape[1], 1)))
		regressor.add(Dropout(0.2))
		regressor.add(LSTM(units = 50, return_sequences = True))
		regressor.add(Dropout(0.2))
		regressor.add(LSTM(units = 50, return_sequences = True))
		regressor.add(Dropout(0.2))
		regressor.add(LSTM(units = 50))
		regressor.add(Dropout(0.2))
		regressor.add(Dense(units = 1))
		regressor.compile(optimizer = 'adam', loss = 'mean_squared_error')
		# print(regressor.summary())
		regressor.fit(x_train, y_train, epochs = 1, batch_size = 32)
		last_30_days=data[-30:].values
		last_30_days_scaled=scaler.transform(last_30_days)
		X_test=[]
		X_test.append(last_30_days_scaled)
		X_test=np.array(X_test)
		X_test=np.reshape(X_test,(X_test.shape[0],X_test.shape[1],1))
		pred_price=regressor.predict(X_test)
		pred_price=scaler.inverse_transform(pred_price)
		cur = ((data.iloc[len(data)-1]).values[0])
		pred = pred_price[0][0]
		perc = ((pred-cur)/cur)*100
		return cur,pred,perc

	def startUA(start,end):
		df1 = pd.read_csv('/content/Valid.csv')
		fullData= []
		d = ''
		for i in range(start,end):
		    arr=[]
		    arr.append(df1['Symbols'][i])
		    # df = pd.read_csv(filename)
		    df = data.DataReader(df1['Symbols'][i] , 'yahoo', '2000-01-01', '2021-06-16')
		    df.reset_index(inplace=True, drop=False)
		    d = str(df['Date'][len(df)-1])
		    openCur, openPred, openPerc = DataPred.buildUA(df,'Open')
		    arr.append(openCur)
		    arr.append(openPred)
		    arr.append(openPerc)
		    closeCur, closePred, closePerc = DataPred.buildUA(df,'Close')
		    arr.append(closeCur)
		    arr.append(closePred)
		    arr.append(closePerc)
		    highCur, highPred, highPerc= DataPred.buildUA(df,'High')
		    arr.append(highCur)
		    arr.append(highPred)
		    arr.append(highPerc)
		    lowCur, lowPred, lowPerc= DataPred.buildUA(df,'Low')
		    arr.append(lowCur)
		    arr.append(lowPred)
		    arr.append(lowPerc)
		    fullData.append(arr)
		df2 = pd.DataFrame(fullData)
		df2.columns = ['Symbols','OpenCur','OpenPred','OpenPerc','CloseCur','ClosePred','ClosePerc','HighCur','HighPred','HighPerc','LowCur','LowPred','LowPerc']
		predictions = 'UA' + d[:10] + '.csv'
		if start == 0:
			df2.to_csv(predictions, mode='w', index=False)
		else:
			df2.to_csv(predictions, mode='a', header=False, index=False)
		
	def main():
		df = pd.read_csv('/content/Valid.csv')
		# for i in range(len(df)//10):
		for i in range(2):
			print("-----------------------------------------------------------------------------")
			start = i*10
			end = start+10
			DataPred.startUA(start,end)
			DataPred.startLSTM(start,end)
			print("-----------------------------------------------------------------------------")



if __name__ == "__main__":
	DataPred.main()