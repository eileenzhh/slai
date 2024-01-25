from PIL import Image
import os
import numpy as np
import matplotlib.pyplot as plt

def calculate_contrast(image_path):
    # Open the image
    image = Image.open(image_path)

    # Convert the image to grayscale
    grayscale_image = image.convert("L")

    # Convert the image to a NumPy array
    img_array = np.array(grayscale_image)

    # Calculate the standard deviation of pixel intensities
    contrast = np.std(img_array)

    return contrast

def calculate_histogram(image_path):
    # Open the image
    image = Image.open(image_path)

    # Convert the image to a NumPy array
    img_array = np.array(image)

    # Calculate the histogram for each color channel
    histogram = [np.histogram(img_array[:, :, i], bins=256, range=[0, 256])[0] for i in range(img_array.shape[2])]

    return histogram

def process_images(folder_path):
    # Get a list of all files in the folder
    image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.JPG'))]

    # Process each image in the folder
    for image_file in image_files:
        image_path = os.path.join(folder_path, image_file)

        # Calculate contrast
        contrast = calculate_contrast(image_path)

        # Calculate color histogram
        histogram = calculate_histogram(image_path)

        # Output the result
        print(f"Image: {image_file}, Contrast: {contrast}")
        plot_histogram(histogram, image_file)

def plot_histogram(histogram, image_file):
    colors = ['red', 'green', 'blue']
    for i, color in enumerate(colors):
        plt.plot(histogram[i], color=color)
    plt.title(f"Color Histogram - {image_file}")
    plt.xlabel("Pixel Intensity")
    plt.ylabel("Frequency")
    plt.show()

if __name__ == "__main__":
    # Specify the folder containing images
    folder_path = "Hardware/Test_Images"

    # Check if the folder exists
    if os.path.exists(folder_path) and os.path.isdir(folder_path):
        process_images(folder_path)
    else:
        print(f"The folder '{folder_path}' does not exist.")
