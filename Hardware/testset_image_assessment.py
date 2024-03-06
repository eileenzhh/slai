import Image_Quaility_Assessment
import os
import numpy as np

COLOURS =['red', 'green', 'blue']

def test_process_images(folder_path, limit):
    image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.JPG'))]

    for image_file in image_files[:limit]:
        image_path = os.path.join(folder_path, image_file)

        contrast = Image_Quaility_Assessment.calculate_contrast(image_path)
        histogram = Image_Quaility_Assessment.calculate_histogram(image_path)
        peaks = find_histogram_peaks(histogram)
        print(f"Image: {image_file}, Contrast: {contrast}, Peaks: {peaks}")

        # Image_Quaility_Assessment.plot_histogram(histogram, image_file)


def find_histogram_peaks(histogram_vals):
    results = []
    for i, color in enumerate(COLOURS):
        histogram = histogram_vals[i]
        max_peak_index = np.argmax(histogram)
        max_peak_value = histogram[max_peak_index]
        combine = (max_peak_index, max_peak_value)
        results.append({color: combine})
    return results

def get_contrast_values(folder_path):
    image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.JPG'))]
    contrast_values = []
    for image_file in image_files:
        image_path = os.path.join(folder_path, image_file)

        contrast = Image_Quaility_Assessment.calculate_contrast(image_path)
        contrast_values.append(contrast)
    # print(contrast_values)

    num_samples = len(contrast_values)
    average = np.mean(contrast_values)
    value_range = np.ptp(contrast_values)  # Peak-to-peak (range) value
    minimum = np.min(contrast_values)
    maximum = np.max(contrast_values)
    std_deviation = np.std(contrast_values)

    # Print the results
    print(f"Number of Images: {num_samples}")
    print(f"Average: {average}")
    print(f"Range: {value_range}")
    print(f"Minimum: {minimum}")
    print(f"Maximum: {maximum}")
    print(f"Standard Deviation: {std_deviation}")

testset_folder_path = 'Cancer-Net-SCa/ISIC-images'
testset_folder_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', testset_folder_path))

# test_process_images(testset_folder_dir, 10)

get_contrast_values(testset_folder_dir)

'''
first 10 images
Image: ISIC_7084553.JPG, Contrast: 40.159165509491615   , Peaks: [{'red': (230, 123844)},   {'green': (183, 109935)},       {'blue': (155, 107454)}]
Image: ISIC_9478930.JPG, Contrast: 46.75052404379547    , Peaks: [{'red': (239, 119796)},   {'green': (212, 93963)},        {'blue': (125, 87542)}]
Image: ISIC_8114263.JPG, Contrast: 11.018954528788683   , Peaks: [{'red': (184, 867810)},   {'green': (170, 1163373)},      {'blue': (173, 1105599)}]
Image: ISIC_2803072.JPG, Contrast: 37.83860285348297    , Peaks: [{'red': (224, 201732)},   {'green': (208, 130582)},       {'blue': (203, 122485)}]
Image: ISIC_0052212.JPG, Contrast: 21.498233599050074   , Peaks: [{'red': (206, 99417)},    {'green': (137, 85677)},        {'blue': (156, 85089)}]
Image: ISIC_7059484.JPG, Contrast: 10.773868998289734   , Peaks: [{'red': (172, 1033013)},  {'green': (159, 1124206)},      {'blue': (156, 1167349)}]
Image: ISIC_3424187.JPG, Contrast: 23.96776383170139    , Peaks: [{'red': (215, 18926)},    {'green': (169, 16002)},        {'blue': (143, 15929)}]
Image: ISIC_3582787.JPG, Contrast: 53.706050269447964   , Peaks: [{'red': (233, 505904)},   {'green': (189, 420425)},       {'blue': (164, 362459)}]
Image: ISIC_6950870.JPG, Contrast: 19.451116700889997   , Peaks: [{'red': (189, 266467)},   {'green': (134, 272775)},       {'blue': (119, 269869)}]
Image: ISIC_5158910.JPG, Contrast: 22.14894528672766    , Peaks: [{'red': (255, 1526202)},  {'green': (218, 669392)},       {'blue': (227, 801726)}]
'''