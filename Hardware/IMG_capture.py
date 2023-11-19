import cv2
from Crypto.Cipher import AES
import requests

# Capture image from webcam
cap = cv2.VideoCapture(0)
ret, frame = cap.read()
cap.release()

# Encrypt image (use a proper encryption key)
key = b'Sixteen byte key'
cipher = AES.new(key, AES.MODE_EAX)
ciphertext, tag = cipher.encrypt_and_digest(frame.tobytes())

# Send encrypted image to server
server_url = 'http://your_server_endpoint'
payload = {'data': ciphertext, 'tag': tag}
response = requests.post(server_url, json=payload)

print(response.text)