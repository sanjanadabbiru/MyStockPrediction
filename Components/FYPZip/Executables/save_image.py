import os
import math
import pandas_datareader as web
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


def plot(data,training_data_len,filename):
    imgname = os.path.splittext(filename)[0]
    img = 'imgname.png'
    train = data[:training_data_len]
    valid = data[training_data_len:]
    valid['Open'] = predictions
    plt.figure(figsize=(6,3))                        
    plt.xlabel('Date', fontsize=18)
    plt.ylabel('Close Price USD ($)', fontsize=18)
    plt.plot(train['Close'])
    plt.plot(valid[['Close']])
    plt.legend(['Train', 'Val'], loc='lower right')
    plt.savefig(img,dpi=100)
    plt.show()

def save_img():
    files = ["A.csv", "B.csv", "C.csv","D.csv","E.csv"]
    for i in files:
        filename = i 
        if(os.path.exists(filename)): 
            df = pd.read_csv('filename')
            data = df.filter(['Close'])
            dataset = data.values
            training_data_len = math.ceil( len(dataset) *.8)
            plot(data,training_data_len,filename)
      