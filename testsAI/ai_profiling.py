# ai_profiling.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import LabelEncoder
from datetime import datetime


def replace_missing_values(df):
    """Replace null values with mean for numeric columns and mode for non-numeric columns."""
    numeric_cols = df.select_dtypes(include='number').columns
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())

    non_numeric_cols = df.select_dtypes(exclude='number').columns
    df[non_numeric_cols] = df[non_numeric_cols].apply(lambda x: x.fillna(x.mode()[0] if not x.mode().empty else "Unknown"))

    return df


def calculate_rfm_scores(df, combined_date_column, num_of_visits_column, total_spendings_column,
                         recency_weight=3, frequency_weight=2, monetary_weight=1):
    """Calculate RFM scores and categories."""
    current_date = datetime.now()
    df['Recency'] = (current_date - pd.to_datetime(df[combined_date_column])).dt.days
    df['Frequency'] = df[num_of_visits_column]
    df['Monetary'] = df[total_spendings_column]

    # Use pd.qcut as before but immediately convert to a standard numeric type
    recency_labels = range(1, len(pd.qcut(df['Recency'], 5, duplicates='drop', retbins=True)[1]))
    frequency_labels = range(1, len(pd.qcut(df['Frequency'], 5, duplicates='drop', retbins=True)[1]))
    monetary_labels = range(1, len(pd.qcut(df['Monetary'], 5, duplicates='drop', retbins=True)[1]))

    df['Recency_Score'] = pd.qcut(df['Recency'], q=5, labels=recency_labels, duplicates='drop').astype(float)
    df['Frequency_Score'] = pd.qcut(df['Frequency'], q=5, labels=frequency_labels, duplicates='drop').astype(float)
    df['Monetary_Score'] = pd.qcut(df['Monetary'], q=5, labels=monetary_labels, duplicates='drop').astype(float)

    # Now that they're floating-point, NaN filling with 0 should work without issue
    df['Recency_Score'] = df['Recency_Score'].fillna(0).astype(int)
    df['Frequency_Score'] = df['Frequency_Score'].fillna(0).astype(int)
    df['Monetary_Score'] = df['Monetary_Score'].fillna(0).astype(int)

    # Continue with RFM score calculation
    df['RFM_Score'] = (
        recency_weight * df['Recency_Score'] +
        frequency_weight * df['Frequency_Score'] +
        monetary_weight * df['Monetary_Score']
    )

    # Define RFM levels based on RFM score
    max_rfm_score = df['RFM_Score'].max()
    bins = [0, max_rfm_score * 0.2, max_rfm_score * 0.4, max_rfm_score * 0.6, max_rfm_score * 0.8, max_rfm_score]
    labels = ['1', '2', '3', '4', '5']
    df['RFM_Level'] = pd.cut(df['RFM_Score'], bins=bins, labels=labels, include_lowest=True)

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


def run_ai_profiling(df, combined_date_column, num_of_visits_column, total_spendings_column):
    """Run the AI profiling process using data from MongoDB."""

    df = replace_missing_values(df)

    # Encode categorical data
    df = encode(df)

    # Perform RFM analysis
    df = calculate_rfm_scores(df, combined_date_column, num_of_visits_column, total_spendings_column)

    # Train the RandomForestClassifier
    model, X_test, y_test, y_pred = train_random_forest_classifier(df, 'RFM_Level')

    # Evaluate model accuracy
    accuracy = evaluate_model_accuracy(y_test, y_pred)

    return {
        'message': 'AI profiling completed',
        'accuracy': accuracy
    }
