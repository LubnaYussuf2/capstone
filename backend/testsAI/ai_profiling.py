import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import LabelEncoder

def replace_missing_values(df):
    """Replace null values with mean for numeric columns and mode for non-numeric columns."""
    numeric_cols = df.select_dtypes(include='number').columns
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())

    non_numeric_cols = df.select_dtypes(exclude='number').columns
    df[non_numeric_cols] = df[non_numeric_cols].apply(lambda x: x.fillna(x.mode()[0] if not x.mode().empty else "Unknown"))

    return df

def encode(df):
    """Encode non-numeric columns using LabelEncoder."""
    label_encoder = LabelEncoder()
    non_numeric_columns = df.select_dtypes(include=['object', 'category']).columns
    for col in non_numeric_columns:
        df[col] = label_encoder.fit_transform(df[col])
    return df

def train_random_forest_classifier(df, target_column):
    """Train a RandomForestClassifier on the provided data."""
    X = df.drop(target_column, axis=1)
    y = df[target_column].astype('int')  # Ensure target is integer for classification

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Define a pipeline to handle preprocessing and model training
    numeric_transformer = Pipeline(steps=[('imputer', SimpleImputer(strategy='median'))])
    preprocessor = ColumnTransformer(transformers=[('num', numeric_transformer, X.select_dtypes(include='number').columns)])

    pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                               ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))])

    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)

    return pipeline, X_test, y_test, y_pred

def evaluate_model_accuracy(y_true, y_pred):
    """Evaluate model accuracy."""
    accuracy = accuracy_score(y_true, y_pred)
    return accuracy

def run_ai_profiling(df, target_column):
    """Run the AI profiling process using data from MongoDB."""

    df = replace_missing_values(df)

    # Encode categorical data
    df = encode(df)

    # Train the RandomForestClassifier
    model, X_test, y_test, y_pred = train_random_forest_classifier(df, target_column)

    # Evaluate model accuracy
    accuracy = evaluate_model_accuracy(y_test, y_pred)

    return {
        'message': 'AI profiling completed',
        'accuracy': accuracy
    }
