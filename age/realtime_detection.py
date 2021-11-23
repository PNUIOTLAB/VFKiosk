"""
Face detection
"""
import server
import cv2
import os
from time import sleep
import numpy as np
import argparse
from wide_resnet import WideResNet
from keras.utils.data_utils import get_file
from http.server import BaseHTTPRequestHandler, HTTPServer
import socket
import logging
import json
from sys import argv
from multiprocessing import Process, JoinableQueue, Queue, Manager

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
CASE_PATH = "./pretrained_models/haarcascade_frontalface_alt.xml"
WRN_WEIGHTS_PATH = "https://github.com/yu4u/age-gender-estimation/releases/download/v0.5/weights.28-3.73.hdf5"
face_cascade = cv2.CascadeClassifier(CASE_PATH)


def get_args():
    parser = argparse.ArgumentParser(description="This script detects faces from web cam input, "
                                                 "and estimates age and gender for the detected faces.",
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)

    parser.add_argument("--depth", type=int, default=16,
                        help="depth of network")
    parser.add_argument("--width", type=int, default=8,
                        help="width of network")
    arg = parser.parse_args()
    return arg


args = get_args()
DEPTH = args.depth
WIDTH = args.width
face_size = 64

model = WideResNet(face_size, depth=DEPTH, k=WIDTH)()
model_dir = os.path.join(os.getcwd(), "pretrained_models").replace("//", "\\")
fpath = get_file('weights.28-3.73.hdf5', WRN_WEIGHTS_PATH, cache_subdir=model_dir)
model.load_weights(fpath)

AGE = [[]]
GENDER = [[]]


# http.server를 사용하기 위한 준비
class S(BaseHTTPRequestHandler):
    # 잘 받았다는 응답
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        logging.info("GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
        self._set_response()
        # 여기서 받고 안면인식을 해야되지 않을까?
        self.wfile.write(json.dumps().encode('utf-8'))


class MyServer(HTTPServer):
    def serve_forever(self):
        check = True
        while check:
            self.handle_request()


def run(server_class=MyServer, handler_class=S, port=8080):
    logging.basicConfig(level=logging.INFO)
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    logging.info('Starting httpd...\n')
    # try:
    httpd.serve_forever()
    # except signal.SIGINT:
    # pass
    httpd.server_close()
    logging.info('Stopping httpd...\n')


# 얼굴을 중심으로 일정 범위 포함하여 자르기
def crop_face(imgarray, section, margin=40, size=64):
    """
    :param imgarray: full image
    :param section: face detected area (x, y, w, h)
    :param margin: add some margin to the face detected area to include a full head
    :param size: the result image resolution with be (size x size)
    :return: resized image in numpy array with shape (size x size x 3)
    """
    img_h, img_w, _ = imgarray.shape
    if section is None:
        section = [0, 0, img_w, img_h]
    (x, y, w, h) = section
    margin = int(min(w, h) * margin / 100)
    x_a = x - margin
    y_a = y - margin
    x_b = x + w + margin
    y_b = y + h + margin
    if x_a < 0:
        x_b = min(x_b - x_a, img_w - 1)
        x_a = 0
    if y_a < 0:
        y_b = min(y_b - y_a, img_h - 1)
        y_a = 0
    if x_b > img_w:
        x_a = max(x_a - (x_b - img_w), 0)
        x_b = img_w
    if y_b > img_h:
        y_a = max(y_a - (y_b - img_h), 0)
        y_b = img_h
    cropped = imgarray[y_a: y_b, x_a: x_b]
    resized_img = cv2.resize(cropped, (size, size), interpolation=cv2.INTER_AREA)
    resized_img = np.array(resized_img)
    return resized_img, (x_a, y_a, x_b - x_a, y_b - y_a)


def draw_label(image, point, label, font=cv2.FONT_HERSHEY_SIMPLEX,
               font_scale=1, thickness=2):
    size = cv2.getTextSize(label, font, font_scale, thickness)[0]
    x, y = point
    cv2.rectangle(image, (x, y - size[1]), (x + size[0], y), (255, 0, 0), cv2.FILLED)
    cv2.putText(image, label, point, font, font_scale, (255, 255, 255), thickness)


def detect_face(img):
    # infinite loop, break by key ESC
    # Capture frame-by-frame
    age_list = []
    gender_list = []

    frame = img
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.2,
        minNeighbors=1,
        minSize=(face_size, face_size)
    )
    for box in faces:
        x, y, w, h = box
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 255), thickness=2)
    # placeholder for cropped faces
    face_imgs = np.empty((len(faces), face_size, face_size, 3))
    for i, face in enumerate(faces):
        face_img, cropped = crop_face(frame, face, margin=20, size=face_size)
        (x, y, w, h) = cropped
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 200, 0), 2)
        face_imgs[i, :, :, :] = face_img
    if len(face_imgs) > 0:
        # predict ages and genders of the detected faces
        results = model.predict(face_imgs)
        predicted_genders = results[0]
        ages = np.arange(0, 101).reshape(101, 1)
        predicted_ages = results[1].dot(ages).flatten()

    # draw results
    for i, face in enumerate(faces):
        label = "{}, {}".format("F" if predicted_genders[i][0] > 0.5 else "M",
                                int(predicted_ages[i]))
        draw_label(frame, (face[0], face[1]), label)
        age_list.append(int(predicted_ages[i]))
        gender_list.append("F" if predicted_genders[i][0] > 0.5 else "M")

    """
    cv2.imshow('Keras Faces', frame)

    if cv2.waitKey(5) == 27:  # ESC key press
        cv2.destroyAllWindows()
    """
    return age_list, gender_list


# 처음 보낸 데이터 길이 추출
def recvall(sock, count):
    buf = b""
    while count:
        newbuf = sock.recv(count)
        if not newbuf:
            return None
        buf += newbuf
        count -= len(newbuf)
    return buf


def post_detect():
    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()


def main():
    length = recvall(conn, 16)
    string_data = recvall(conn, int(length))
    data = np.frombuffer(string_data, dtype="uint8")  # "uint8"
    print(data)

    decode_img = cv2.imdecode(data, 1)
    cv2.imshow("left", decode_img)
    age, gender = detect_face(decode_img)

    AGE[0] = age
    GENDER[0] = gender


if __name__ == "__main__":
    # p1 = Process(target=run)
    # httpserver
    # run()
    # 소켓 생성
    socket_server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # ip와 포트 묶기
    print("create socket")
    socket_server.bind(("164.125.234.98", 8000))
    socket_server.listen()
    print("listening")

    # jetson과 연결
    conn, addr = socket_server.accept()
    print("accept")
    main()

    server.BaseHTTPRequestHandler()
