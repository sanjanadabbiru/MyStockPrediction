import pandas as pd
import numpy as np
from os import listdir
import matplotlib.pyplot as plt
import os

class Consolidate:
	def cleanRows(df):
		# print('Remove invalid rows in Prediction rows.')
		df.drop_duplicates(keep='first', inplace=True)
		df.dropna()
		df_clean = pd.DataFrame()
		counter =0
		for i in range(len(df)):
			temp = df.iloc[i]
			C1 = (np.greater(np.array(temp['HighPred']), np.array(temp['ClosePred'])))
			C2 = (np.greater(np.array(temp['ClosePred']), np.array(temp['OpenPred'])))
			if C1 and C2:
				df_clean = df_clean.append(df.iloc[i])
		return df_clean

	def getTopBuy(df1,df2,filename):
		df_lstm = Consolidate.cleanRows(df1)
		df_ua = Consolidate.cleanRows(df2)
		df1 = df_lstm[['Symbols']]
		df2 = df_ua[['Symbols']]
		df3 = df1.merge(df2, how = 'inner' ,indicator=False)
		df4 = df3.merge(df_ua, how = 'left', indicator=False)
		df4.to_csv('../Predictions/Consolidated/'+filename, index=False)
		count = 0
		df5 = pd.DataFrame()
		for ind in df4.index:
			if df4['ClosePerc'][ind] > 2 and df4['ClosePerc'][ind] < 15:
				df5 = df5.append(df4.iloc[ind])
		df5.sort_values("ClosePerc", ascending=False, inplace=True)
		# df5.to_csv('../Predictions/Consolidated/'+filename, index=False)
		dfTop10 = df5.iloc[:10]
		# dfTop10.to_csv('../Predictions/Consolidated/'+filename, index=False)
		dfDisp = dfTop10[['Symbols','ClosePerc']]
		dfDisp.to_csv('../FrontEnd/Display/Buy/Daily/' + filename, index=False)


	def topBuyGraphs(filename):
		df = pd.read_csv('../FrontEnd/Display/Buy/Daily/'+filename)
		for ind in df.index:
			ticker = df['Symbols'][ind]
			df1 = pd.read_csv('../DataSet/Data/'+ticker+'.csv')
			dfClose = df1[['Close']]
			imgname = '../FrontEnd/Display/Buy/Images/'+str(ind)+'.png'
			plt.figure(figsize=(6,3))
			plt.plot(dfClose.iloc[-30:])
			plt.savefig(imgname, dpi = 100)


	def userSpecificPort(): 
		trans = pd.read_csv('../FrontEnd/Input/Orders.csv')
		users = pd.read_csv('../FrontEnd/Input/Users.csv')
		user = []
		for ind in users.index:
			user.append(str(users['id'][ind]))
			u = users['id'][ind]
			t =[]
			for i in trans.index:
				if trans['id'][i] == users['id'][ind]:
					temp = trans.iloc[i]
					t.append(temp)
			t = pd.DataFrame(t)
			t.to_csv('../FrontEnd/Display/Users/' + u + '.csv',index=False)


	def getStocksInPort(username): //checks whate all stocks are still there, what is the balance 
		a = {}
		df = pd.read_csv('../FrontEnd/Display/Users/' + username + '.csv')
		df.sort_values("Status", ascending=True, inplace=True)
		for ind in df.index:
			if df['Status'][ind] == 'sell':
				if not df['Ticker'][ind] in a:
					print("Error! {username} is trying to sell {df['Ticker'][ind]} which they doesn't own.")
				else:
					a[df['Ticker'][ind]] -= df['Quantity'][ind]
			if df['Status'][ind] == 'buy':
				if not df['Ticker'][ind] in a:
					a[df['Ticker'][ind]] = df['Quantity'][ind]
				else:
					a[df['Ticker'][ind]] += df['Quantity'][ind]			
		return a //sends to generateworth

	def generateWorth():
		users = listdir('../FrontEnd/Display/Users/')
		t =[]
		d = ''
		for user in users:
			nw = 0
			port = Consolidate.getStocksInPort(user[:-4]) 
			# print(port)
			for i in port: 
				if port[i] > 0: 
					df = pd.read_csv('../DataSet/Data/'+str(i)+'.csv')
					nw += df['Close'][len(df)-1] * port[i] //adding the value of each stock , //refers to the balance after sell/buy 
					d = df['Date'][len(df)-1]
			temp =[]
			temp.append(user[:4])
			temp.append(nw)
			t.append(temp)
		temp1 = pd.DataFrame(t)
		temp1.columns = ['User','Worth']
		print(temp1)
		temp1.to_csv('../FrontEnd/Display/NetWorth/'+str(d)+'.csv', index=False)

	def makeGraph(filename):
		df = pd.read_csv('../FrontEnd/Display/Performance/Last30Days/'+filename)
		for ind in df.index:
			dfUser = df.loc[ind]
			imgname = '../FrontEnd/Display/Performance/Images/'+ df['User'][ind]+'.png'
			plt.figure(figsize=(6,3))
			plt.plot(dfUser[-30:])
			plt.savefig(imgname, dpi = 100)


	def Performance():
		net = listdir('../FrontEnd/Display/NetWorth/')
		net.sort()
		filename = net[-1]
		count = len(net)
		zeroes = 30-count
		users = listdir('../FrontEnd/Display/Users/')
		d =[]
		for user in users:
			b =[]
			for n in net:
				df = pd.read_csv('../FrontEnd/Display/NetWorth/'+n)
				for ind in df.index:
					if df['User'][ind]==user[:-4]:
						b.append(df['Worth'][ind])
			c = [user[:-4]] + [0]*zeroes + b[::-1]
			d.append(c)
		e = pd.DataFrame(d)
		f = e.rename(columns={0 : 'User'})
		f.to_csv('../FrontEnd/Display/Performance/Last30Days/'+filename, index=False)
		Consolidate.makeGraph(filename)



	def SellOrHold():
		users = listdir('../FrontEnd/Display/Users/')
		t =[]
		d = ''
		ConsPreds = listdir('../Predictions/Consolidated/')
		filename = ConsPreds[-1]
		df = pd.read_csv('../Predictions/Consolidated/'+filename)
		for user in users:
			nw = 0
			port = Consolidate.getStocksInPort(user[:-4])
			arr = []
			for i in port:
				ind = df[df['Symbols']=='A'].index.values[0]
				temp =[i]
				if df['ClosePerc'][ind] < -2 :
					temp.append([df['ClosePerc'][ind]])
					temp.append('Sell')
					arr.append(temp)
					# arr[i].append([[df['ClosePerc'][ind]], 'Sell'])
				elif df['ClosePerc'][ind] > -2 :
					temp.append(df['ClosePerc'][ind])
					temp.append('Hold')
					arr.append(temp)
					# arr[i] = [[df['ClosePerc'][ind]], 'Hold']
			sob = pd.DataFrame(arr)
			sob.columns = ['Symbol', 'ClosePerc', 'Suggestion']
			sob.sort_values("Suggestion", ascending=False, inplace=True)
			sob.to_csv('../FrontEnd/Display/SellOrHold/'+user, index=False)


	def main():
		LSTMlist = listdir('../Predictions/LSTM/')
		UAlist = listdir('../Predictions/UA/')
		LSTMlist.sort()
		UAlist.sort()
		if LSTMlist[-1]==UAlist[-1]:
			df1 = pd.read_csv('../Predictions/LSTM/' + LSTMlist[-1])
			df2 = pd.read_csv('../Predictions/UA/'+LSTMlist[-1])
			Consolidate.getTopBuy(df1,df2,LSTMlist[-1]) 
			Consolidate.topBuyGraphs(LSTMlist[-1]) 
			Consolidate.userSpecificPort() 
			Consolidate.generateWorth() 
			Consolidate.Performance()
			Consolidate.SellOrHold()
		else:
			print('File dates are not matching.')



if __name__ == '__main__':
	Consolidate.main()
