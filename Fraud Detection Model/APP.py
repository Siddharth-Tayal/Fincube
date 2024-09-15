from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the trained model
with open('fraud_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Define the prediction function
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Print the raw request data for debugging
        print("Raw data received:", request.data)

        transaction = request.get_json(force=True)  # Use force=True to parse even if not set as application/json
        if not transaction:
            return jsonify({'error': 'No JSON data provided'}), 400

        # Debug: Print received JSON data
        print("Parsed JSON data:", transaction)

        # Ensure the columns match the model's expected features
        numerical_features = ['amount', 'oldbalanceOrg', 'newbalanceOrig', 'oldbalanceDest', 'newbalanceDest', 'hour',
                              'transactions_per_account', 'transactions_per_hour', 'avg_transaction_amount',
                              'is_new_account', 'transactions_per_destination', 'change_in_transaction_pattern']
        categorical_features = ['type']

        # Convert to DataFrame
        transaction_df = pd.DataFrame([transaction])

        # Check for missing features
        missing_numerical = [feature for feature in numerical_features if feature not in transaction_df.columns]
        missing_categorical = [feature for feature in categorical_features if feature not in transaction_df.columns]

        if missing_numerical or missing_categorical:
            return jsonify({'error': 'Missing features', 'missing_numerical': missing_numerical, 'missing_categorical': missing_categorical}), 400

        # Ensure correct data types
        transaction_df = transaction_df[numerical_features + categorical_features]

        # Predict using the model
        prediction = model.predict(transaction_df)

        # Return the result as a JSON response
        return jsonify({'fraud_prediction': bool(prediction[0])})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    return "Flask App is Running!"

if __name__ == '__main__':
    app.run(debug=True)
