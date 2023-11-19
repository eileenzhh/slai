from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['POST'])
def receive_image():
    data = request.json
    ciphertext = data['data']
    tag = data['tag']

    # Decrypt image (use the same encryption key)
    key = b'Sixteen byte key'
    cipher = AES.new(key, AES.MODE_EAX)
    plaintext = cipher.decrypt_and_verify(ciphertext, tag)

    # Save the image or further process as needed

    return 'Image received successfully'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
