import cv2

def capture_and_save_image():
    # Open a connection to the webcam (0 is usually the default camera)
    cap = cv2.VideoCapture(1)

    # Check if the webcam is opened correctly
    if not cap.isOpened():
        print("Error: Could not open webcam.")

        return

    cap.set (cv2.CAP_PROP_FRAME_WIDTH, 1920)
    cap.set (cv2.CAP_PROP_FRAME_HEIGHT, 1080)
    #cap.set(cv2.CAP_PROP_BRIGHTNESS, 200) #Change this as needed. 
    
    # Capture a single frame
    ret, frame = cap.read()
    
    cv2.waitKey(10)


    # Release the webcam
    cap.release()

    cv2.imshow('ImageWindow', frame)
    cv2.waitKey()
    # Save the captured frame to the desktop
    cv2.imwrite('Hardware/Test_Images/Test Image 1_linux.jpg', frame)
    print("Image saved to the desktop.")

if __name__ == "__main__":
    capture_and_save_image()