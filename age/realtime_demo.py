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
import logging
import threading
from multiprocessing import Queue, Process
import json

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
data_que = Queue()


# WideResNet을 이용한 안면인식
class FaceCV(object):
    """
    Singleton class for face recongnition task
    """
    CASE_PATH = "./pretrained_models/haarcascade_frontalface_alt.xml"
    WRN_WEIGHTS_PATH = "https://github.com/yu4u/age-gender-estimation/releases/download/v0.5/weights.28-3.73.hdf5"
    face_cascade = cv2.CascadeClassifier(CASE_PATH)

    def __new__(cls, weight_file=None, depth=16, width=8, face_size=64):
        if not hasattr(cls, 'instance'):
            cls.instance = super(FaceCV, cls).__new__(cls)
        return cls.instance

    def __init__(self, depth=16, width=8, face_size=64):
        self.face_size = face_size
        self.model = WideResNet(face_size, depth=depth, k=width)()
        model_dir = os.path.join(os.getcwd(), "pretrained_models").replace("//", "\\")
        fpath = get_file('weights.28-3.73.hdf5',
                         self.WRN_WEIGHTS_PATH,
                         cache_subdir=model_dir)
        self.model.load_weights(fpath)

    @classmethod
    def draw_label(cls, image, point, label, font=cv2.FONT_HERSHEY_SIMPLEX,
                   font_scale=1, thickness=2):
        size = cv2.getTextSize(label, font, font_scale, thickness)[0]
        x, y = point
        cv2.rectangle(image, (x, y - size[1]), (x + size[0], y), (255, 0, 0), cv2.FILLED)
        cv2.putText(image, label, point, font, font_scale, (255, 255, 255), thickness)

    # 얼굴을 중심으로 일정 범위 포함하여 자르기
    def crop_face(self, imgarray, section, margin=40, size=64):
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

    def detect_face(self):
        face_cascade = cv2.CascadeClassifier(self.CASE_PATH)

        # 0 means the default video capture device in OS
        video_capture = cv2.VideoCapture(0, cv2.CAP_DSHOW)
        face_list = []
        while not video_capture.isOpened():
            sleep(5)

        # infinite loop, break by key ESC
        while True:
            # Capture frame-by-frame
            ret, frame = video_capture.read()
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(
                gray,
                scaleFactor=1.2,
                minNeighbors=1,
                minSize=(self.face_size, self.face_size)
            )
            for box in faces:
                x, y, w, h = box
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 255), thickness=2)
            # placeholder for cropped faces
            face_imgs = np.empty((len(faces), self.face_size, self.face_size, 3))
            for i, face in enumerate(faces):
                face_img, cropped = self.crop_face(frame, face, margin=20, size=self.face_size)
                (x, y, w, h) = cropped
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 200, 0), 2)
                face_imgs[i, :, :, :] = face_img
            if len(face_imgs) > 0:
                # predict ages and genders of the detected faces
                results = self.model.predict(face_imgs)
                predicted_genders = results[0]
                ages = np.arange(0, 101).reshape(101, 1)
                predicted_ages = results[1].dot(ages).flatten()
            # draw results
            for i, face in enumerate(faces):
                label = "{}, {}".format("F" if predicted_genders[i][0] > 0.5 else "M",
                                        int(predicted_ages[i]))
                self.draw_label(frame, (face[0], face[1]), label)
                face_list.append({"gender": "F" if predicted_genders[i][0] > 0.5 else "M", "age": int(predicted_ages[i])})

            data_que.put(face_list)

            cv2.imshow('Keras Faces', frame)

            if cv2.waitKey(5) == 27:  # ESC key press
                break
        # When everything is done, release the capture
        # video_capture.release()
        cv2.destroyAllWindows()


def face_detect():
    args = get_args()
    depth = args.depth
    width = args.width

    face = FaceCV(depth=depth, width=width)
    face.detect_face()


class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        logging.info("GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
        self._set_response()
        face_data = data_que.get()
        print(face_data)
        self.wfile.write(json.dumps(face_data).encode('utf-8'))


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
    #    pass
    httpd.server_close()
    logging.info('Stopping httpd...\n')


def get_args():
    parser = argparse.ArgumentParser(description="This script detects faces from web cam input, "
                                                 "and estimates age and gender for the detected faces.",
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)

    parser.add_argument("--depth", type=int, default=16,
                        help="depth of network")
    parser.add_argument("--width", type=int, default=8,
                        help="width of network")
    args = parser.parse_args()
    return args


def main():
    face = threading.Thread(target=face_detect())
    th_server = threading.Thread(target=run())

    face.start()
    th_server.start()

    face.join()
    th_server.join()


"""
    from sys import argv
    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
"""

if __name__ == "__main__":
    main()
    server.BaseHTTPRequestHandler()
