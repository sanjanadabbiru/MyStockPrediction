import datetime
import pandas as pd


def getStocksInPort(username):
	a = {}
	df = pd.read_csv('../FrontEnd/Display/Users/' + username + '.csv')
	df.sort_values("Status", ascending=True, inplace=True)
	for ind in df.index:
		#sell
		if df['Status'][ind] == 'sell':
			if not df["Ticker"][ind] in a:
				print("Error! {username} is trying to sell {df['Ticker'][ind]} which he doesn't own.")
			else:
				a[df['Ticker'][ind]] -= df['Quantity'][ind]
		if df['Status'][ind] == 'buy':
			if not df['Ticker'][ind] in a:
				a[df["Ticker"][ind]] = df['Quantity'][ind]
			else:
				a[df["Ticker"][ind]] += df['Quantity'][ind]				
	return a


print(getStocksInPort('Shar'))
print(getStocksInPort('Sanj'))