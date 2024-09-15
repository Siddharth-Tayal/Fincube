#!/usr/bin/env python
# coding: utf-8

# In[2]:


import streamlit as st
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import IsolationForest

# App Title
st.title("AI-Powered Insider Trading Detection")

# Sidebar for user input
st.sidebar.header("Input Stock Ticker")

# User inputs
ticker = st.sidebar.text_input("Enter Stock Ticker", value="AAPL")
start_date = st.sidebar.date_input("Start Date", value=pd.to_datetime("2020-01-01"))
end_date = st.sidebar.date_input("End Date", value=pd.to_datetime("today"))

# Fetching stock data
def get_stock_data(ticker, start, end):
    data = yf.download(ticker, start=start, end=end)
    return data

# Display the stock data
st.subheader(f"Stock Data for {ticker} from {start_date} to {end_date}")
data = get_stock_data(ticker, start_date, end_date)
st.write(data.tail())

# Feature engineering: Calculate returns, moving averages, and volatility
data['Returns'] = data['Adj Close'].pct_change()
data['Moving_Avg'] = data['Adj Close'].rolling(window=20).mean()
data['Volatility'] = data['Adj Close'].rolling(window=20).std()

# Show stock price chart
st.subheader("Stock Price Over Time")
st.line_chart(data['Adj Close'])

# Build Isolation Forest model for anomaly detection
st.sidebar.header("Isolation Forest Parameters")
n_estimators = st.sidebar.slider("Number of Estimators", 50, 500, step=50, value=100)
contamination = st.sidebar.slider("Contamination (Anomaly Proportion)", 0.01, 0.1, step=0.01, value=0.05)

# Train the Isolation Forest model
def train_isolation_forest(data):
    # Select relevant features and drop rows with missing values
    features = data[['Returns', 'Moving_Avg', 'Volatility']].dropna()

    # Train the model on the features
    model = IsolationForest(n_estimators=n_estimators, contamination=contamination, random_state=42)
    model.fit(features)

    # Predict anomalies (-1 for anomaly, 1 for normal)
    predictions = model.predict(features)

    # Create a new column 'Anomaly' in the original dataframe and set all values to 'NaN'
    data['Anomaly'] = float('nan')

    # Align predictions back to the original dataframe
    data.loc[features.index, 'Anomaly'] = predictions

    return data


# Run anomaly detection
if st.button("Run Anomaly Detection"):
    result_data = train_isolation_forest(data)
    st.subheader("Anomaly Detection Results")
    st.write(result_data.tail())

    # Plot anomalies
    st.subheader("Anomalies in Stock Price")
    plt.figure(figsize=(10, 6))
    plt.plot(result_data.index, result_data['Adj Close'], label="Stock Price")
    anomalies = result_data[result_data['Anomaly'] == -1]
    plt.scatter(anomalies.index, anomalies['Adj Close'], color='red', label="Anomalies")
    plt.legend()
    st.pyplot(plt)

import streamlit as st

try:
    import yfinance as yf
    st.write("yfinance imported successfully!")
except ImportError as e:
    st.error(f"Error importing yfinance: {e}")



# In[ ]:




