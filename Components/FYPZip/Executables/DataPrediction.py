import time
import threading
import math
import numpy as np
import pandas as pd
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
		# print(model.summary())
		model.fit(x_train, y_train, batch_size=5, epochs=10)
		last_60_days=data[-30:].values # made change here from 60 to 30 cause the model is trained with shape(,30,1)
		last_60_days_scaled=scaler.transform(last_60_days)
		X_test=[]
		X_test.append(last_60_days_scaled)
		X_test=np.array(X_test)
		X_test=np.reshape(X_test,(X_test.shape[0],X_test.shape[1],1))
		pred_price=model.predict(X_test)
		pred_price=scaler.inverse_transform(pred_price)
		cur = ((data.iloc[len(data)-1]).values[0])
		pred = pred_price[0][0]
		perc = ((pred-cur)/cur)*100
		return cur,pred,perc

	def startLSTM(start,end):
		df1 = pd.read_csv('../DataSet/Valid.csv')
		fullData= []
		d = ''
		for i in range(start,end):
		    filename = '../DataSet/Data/' + df1['Symbols'][i]+ '.csv'
		    arr=[]
		    arr.append(df1['Symbols'][i])
		    df = pd.read_csv(filename)
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
		predictions = '../Predictions/LSTM/'+ d + '.csv'
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
		regressor.fit(x_train, y_train, epochs = 25, batch_size = 32)
		last_60_days=data[-30:].values # made change here from 60 to 30 cause the model is trained with shape(,30,1)
		last_60_days_scaled=scaler.transform(last_60_days)
		X_test=[]
		X_test.append(last_60_days_scaled)
		X_test=np.array(X_test)
		X_test=np.reshape(X_test,(X_test.shape[0],X_test.shape[1],1))
		pred_price=regressor.predict(X_test)
		pred_price=scaler.inverse_transform(pred_price)
		cur = ((data.iloc[len(data)-1]).values[0])
		pred = pred_price[0][0]
		perc = ((pred-cur)/cur)*100
		return cur,pred,perc

	def startUA(start,end):
		df1 = pd.read_csv('../DataSet/Valid.csv')
		fullData= []
		d = ''
		for i in range(start,end):
		    filename = '../DataSet/Data/' + df1['Symbols'][i]+ '.csv'
		    # print(filename)s
		    arr=[]
		    arr.append(df1['Symbols'][i])
		    df = pd.read_csv(filename)
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
		predictions = '../Predictions/UA/' + d + '.csv'
		if start == 0:
			df2.to_csv(predictions, mode='w', index=False)
		else:
			df2.to_csv(predictions, mode='a', header=False, index=False)
		
	def main():
		df = pd.read_csv('../DataSet/Valid.csv')
		# for i in range(len(df)//10):
		for i in range(1):
			print(i,"-----------------------------------------------------------------------------")
			start = i
			end = start+1
			DataPred.startLSTM(start,end)
			DataPred.startUA(start,end)
			print("-----------------------------------------------------------------------------")


if __name__ == "__main__":
	DataPred.main()