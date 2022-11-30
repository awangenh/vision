from sklearn.ensemble import RandomForestClassifier
from skimage import feature
import numpy as np
import joblib
import cv2
import os


def quantify_image(image):
    # compute the histogram of oriented gradients feature vector for
    # the input image
    features = feature.hog(image, orientations=9,
                           pixels_per_cell=(10, 10), cells_per_block=(2, 2),
                           transform_sqrt=True, block_norm="L1")

    # return the feature vector
    return features


def predict_image(img, mdl):
    # load the image and resize it
    image = cv2.imread(img)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    image = cv2.resize(image, (200, 200))
    image = cv2.threshold(image, 0, 255,
                          cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
    # quantify the image and make predictions based on the extracted features
    features = quantify_image(image)
    # load the saved model
    model = joblib.load(mdl)
    preds = model.predict([features])
    label = "Parkinsons" if preds[0] else "Healthy"
    return label
