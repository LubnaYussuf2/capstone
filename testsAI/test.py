import pickle

try:
    # # Replace '/path/to/file/random_forest_model.pkl' with the actual path to your .pkl file
    # model_rf = pickle.load(open('random_forest_model.pkl', 'rb'))

    model_rf = pickle.load(open("C:/Users/nihni/OneDrive/Desktop/capstone/testsAI/random_forest_model.pkl", "rb"))

    print("Pickle file loaded successfully. The file seems to be intact.")
except FileNotFoundError:
    print("The file was not found. Check the file path.")
except Exception as e:
    print(f"An error occurred: {e}")
