import pandas as pd


def prepare_data_for_prediction(document):
    # Define the order of features as expected by the model
    feature_order = ['Tourist_ID', 'Income_USD', 'Num_of_Visits', 'Total_Spendings']

    # Convert the document to a DataFrame and select the features
    df = pd.DataFrame([document])
    df = df[feature_order]

    # Convert the DataFrame to a numpy array and flatten it
    features = df.values.flatten()

    return features
