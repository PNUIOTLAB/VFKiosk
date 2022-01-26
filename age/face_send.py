import socket
import cv2
import numpy as np
from http.server import BaseHTTPRequestHandler, HTTPServer
import logging
from multiprocessing import Queue
import threading
import os

flag_que = Queue()
left_camera = None
right_camera = None
CNT = 0
LIMIT = 0
FLAG = 1

CASE_PATH = "./pretrained_models/haarcascade_frontalface_alt.xml"
WRN_WEIGHTS_PATH = "https://github.com/yu4u/age-gender-estimation/releases/download/v0.5/weights.28-3.73.hdf5"
face_cascade = cv2.CascadeClassifier(CASE_PATH)


class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        logging.info("GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
        print(self.headers)
        self._set_response()
        self.wfile.write("GET request for {}".format(self.path).encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])  # <--- Gets the size of data
        post_data = self.rfile.read(content_length)  # <--- Gets the data itself
        flag_que.put(post_data)
        logging.info("POST request,\nPath: %s\nHeaders:\n%s\n\nBody:\n%s\n",
                     str(self.path), str(self.headers), post_data.decode('utf-8'))

        self._set_response()
        self.wfile.write("POST request for {}".format(self.path).encode('utf-8'))


def run(server_class=HTTPServer, handler_class=S, port=5000):
    logging.basicConfig(level=logging.INFO)
    IP_ADDR = "http://192.168.0.11:5000/"
    server_address = ('0.0.0.0', port)
    httpd = server_class(server_address, handler_class)
    logging.info('Starting httpd...\n')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    logging.info('Stopping httpd...\n')


class CSI_Camera:

    def __init__(self):
        # Initialize instance variables
        # OpenCV video capture element
        self.video_capture = None
        # The last captured image from the camera
        self.frame = None
        self.grabbed = False
        # The thread where the video capture runs
        self.read_thread = None
        self.read_lock = threading.Lock()
        self.running = False

    def open(self, gstreamer_pipeline_string):
        try:
            self.video_capture = cv2.VideoCapture(
                gstreamer_pipeline_string, cv2.CAP_GSTREAMER
            )

        except RuntimeError:
            self.video_capture = None
            print("Unable to open camera")
            print("Pipeline: " + gstreamer_pipeline_string)
            return
        # Grab the first frame to start the video capturing
        self.grabbed, self.frame = self.video_capture.read()

    def start(self):
        if self.running:
            print('Video capturing is already running')
            return None
        # create a thread to read the camera image
        if self.video_capture != None:
            self.running = True
            self.read_thread = threading.Thread(target=self.updateCamera)
            self.read_thread.start()
        return self

    def stop(self):
        self.running = False
        self.read_thread.join()

    def updateCamera(self):
        # This is the thread to read images from the camera
        while self.running:
            try:
                grabbed, frame = self.video_capture.read()
                with self.read_lock:
                    self.grabbed = grabbed
                    self.frame = frame
            except RuntimeError:
                print("Could not read image from camera")
        # FIX ME - stop and cleanup thread
        # Something bad happened

    def read(self):
        with self.read_lock:
            frame = self.frame.copy()
            grabbed = self.grabbed
        return grabbed, frame

    def release(self):
        if self.video_capture != None:
            self.video_capture.release()
            self.video_capture = None
        # Now kill the thread
        if self.read_thread != None:
            self.read_thread.join()


# Currently there are setting frame rate on CSI Camera on Nano through gstreamer
# Here we directly select sensor_mode 3 (1280x720, 59.9999 fps)
def gstreamer_pipeline(
        sensor_id=0,
        sensor_mode=3,
        capture_width=1280,
        capture_height=720,
        display_width=1280,
        display_height=720,
        framerate=30,
        flip_method=2,
):
    return (
            "nvarguscamerasrc sensor-id=%d sensor-mode=%d ! "
            "video/x-raw(memory:NVMM), "
            "width=(int)%d, height=(int)%d, "
            "format=(string)NV12, framerate=(fraction)%d/1 ! "
            "nvvidconv flip-method=%d ! "
            "video/x-raw, width=(int)%d, height=(int)%d, format=(string)BGRx ! "
            "videoconvert ! "
            "video/x-raw, format=(string)BGR ! appsink"
            % (
                sensor_id,
                sensor_mode,
                capture_width,
                capture_height,
                framerate,
                flip_method,
                display_width,
                display_height,
            )
    )


def detect_face(img):
    face_size = 64
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.2,
        minNeighbors=1,
        minSize=(face_size, face_size)
    )

    if len(faces) > 0:
        return 1
    else:
        return 0


def send_img(img):
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
    _, encode = cv2.imencode('.jpg', img, encode_param)
    data = np.array(encode)
    string_data = data.tostring()

    client_socket.send(str(len(string_data)).encode().ljust(16))
    client_socket.send(string_data)


if __name__ == "__main__":
    HOST = "LAPTOP-2A450PIB"
    IP = "164.125.234.98"       # "192.168.0.2"
    PORT = 8000
    ADDR = (IP, PORT)
    flag = True

    left_camera = CSI_Camera()
    left_camera.open(
        gstreamer_pipeline(
            sensor_id=0,
            sensor_mode=3,
            flip_method=2,
            display_height=360,
            display_width=640,
        )
    )
    left_camera.start()

    right_camera = CSI_Camera()
    right_camera.open(
        gstreamer_pipeline(
            sensor_id=1,
            sensor_mode=3,
            flip_method=2,
            display_height=360,
            display_width=640,
        )
    )
    right_camera.start()

    if (
            not left_camera.video_capture.isOpened()
            or not right_camera.video_capture.isOpened()
    ):
        # Cameras did not open, or no camera attached

        print("Unable to open any cameras")
        # TODO: Proper Cleanup
        SystemExit(0)

    print("camera open")

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(ADDR)
    # run()

    while True:
        if flag_que.qsize() > 0:
            FLAG = flag_que.get()
            os.system("xrandr --output DP-0 --right-of HDMI-0")
        while FLAG:
            _, left_image = left_camera.read()
            _, right_image = right_camera.read()
            left = detect_face(left_image)
            right = detect_face(right_image)
            cv2.imshow("left", left_image)
            cv2.imshow("right", right_image)
            # rgb_small_frame = frame[:, :, ::-1]

            if left is 1:
                if CNT < 5:
                    CNT += 1
                    send_img(right_image)
                elif CNT is 5:
                    os.system("xrandr --output DP-0 --left-of HDMI-0")
                    CNT += 1
                    send_img(left_image)
                else:
                    send_img(left_image)
            else:
                if CNT < 3:
                    CNT = 0
                    send_img(right_image)
                else:
                    if LIMIT < 10:
                        LIMIT += 1
                        send_img(right_image)
                    else:
                        CNT = 0
                        LIMIT = 0
                        send_img(right_image)

            # flag 받아오기
            if flag_que.qsize() > 0:
                flag = flag_que.get()

        keyCode = cv2.waitKey(30) & 0xFF
        if keyCode == 27:
            break
    left_camera.stop()
    left_camera.release()
    right_camera.stop()
    right_camera.release()
    cv2.destroyAllWindows()
