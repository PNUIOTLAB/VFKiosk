import cv2
import numpy as np
from multiprocessing import Queue
import threading
import os

CNT = 0
LIMIT = 0

CASE_PATH = "./pretrained_models/haarcascade_frontalface_alt.xml"
WRN_WEIGHTS_PATH = "https://github.com/yu4u/age-gender-estimation/releases/download/v0.5/weights.28-3.73.hdf5"
face_cascade = cv2.CascadeClassifier(CASE_PATH)


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
        if self.video_capture is not None:
            self.video_capture.release()
            self.video_capture = None
        # Now kill the thread
        if self.read_thread is not None:
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


if __name__ == "__main__":
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

    while True:
        _, left_image = left_camera.read()
        _, right_image = right_camera.read()
        left = detect_face(left_image)
        right = detect_face(right_image)

        cv2.imshow("left", left_image)
        cv2.imshow("right", right_image)

        if left is 1:
            if CNT < 5:
                CNT += 1
                print("up")
            elif CNT is 5:
                os.system("xrandr --output DP-0 --left-of HDMI-0")
                CNT += 1
                print("down")
            else:
                print("down")
        else:
            if CNT < 3:
                CNT = 0
            else:
                if LIMIT < 10:
                    LIMIT += 1
                else:
                    CNT = 0
                    LIMIT = 0
            print("up")

        print(left, right)
        # if right is 1:
        #     os.system("xrandr --output DP-0 --left-of HDMI-0")
        # else:
        #     os.system("xrandr --output DP-0 --right-of HDMI-0")

        keyCode = cv2.waitKey(30) & 0xFF
        if keyCode == 27:
            break

    left_camera.stop()
    left_camera.release()
    right_camera.stop()
    right_camera.release()
