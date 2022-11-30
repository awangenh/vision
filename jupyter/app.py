# importing libraries
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
from predict_parkinsons import predict_image
import sys
import os

# paths to different models
spiralModel = os.path.join("models/", "random_forest_spiral_model.pkl")
waveModel = os.path.join("models/", "random_forest_wave_model.pkl")


class Window(QMainWindow):
    def __init__(self):
        super().__init__()

        # setting title
        self.setWindowTitle("parkinson's Detector")

        # setting geometry to main window
        self.setGeometry(256, 256, 800, 600)

        # creating image object
        self.image = QImage(self.size(), QImage.Format_RGB32)

        # making image color to white
        self.image.fill(Qt.white)

        # variables
        # drawing flag
        self.drawing = False
        # default brush size
        self.brushSize = 12
        # default color
        self.brushColor = Qt.black

        # QPoint object to tract the point
        self.lastPoint = QPoint()

        # creating menu bar
        mainMenu = self.menuBar()

        # creating file menu for save and clear action
        fileMenu = mainMenu.addMenu("File")

        # adding brush size to main menu
        b_size = mainMenu.addMenu("Brush Size")

        # adding detect option to main menu
        detect = mainMenu.addMenu("Detect")

        # creating save action
        saveAction = QAction("Save", self)
        saveAction.setShortcut("Ctrl + S")
        fileMenu.addAction(saveAction)
        saveAction.triggered.connect(self.save)

        # creating clear action
        clearAction = QAction("Clear", self)
        clearAction.setShortcut("Ctrl + C")
        fileMenu.addAction(clearAction)
        clearAction.triggered.connect(self.clear)

        # creating  action for detecting spiral
        spiralDetect = QAction('Spiral', self)
        spiralDetect.setShortcut('Ctrl + P')
        detect.addAction(spiralDetect)
        spiralDetect.triggered.connect(self.detect_spiral)

        # creating  action for detecting wave
        waveDetect = QAction('Wave', self)
        waveDetect.setShortcut('Ctrl + W')
        detect.addAction(waveDetect)
        waveDetect.triggered.connect(self.detect_wave)

        # options for output label
        self.label = QLabel()
        font = self.label.font()
        font.setPointSize(25)
        self.label.setFont(font)
        self.label.setAlignment(Qt.AlignHCenter)
        self.setCentralWidget(self.label)

        # creating options for brush sizes
        # creating action for selecting pixel of 4px
        pix_4 = QAction("4px", self)
        b_size.addAction(pix_4)
        pix_4.triggered.connect(self.Pixel_4)

        # repeat above steps for different sizes
        pix_7 = QAction("7px", self)
        b_size.addAction(pix_7)
        pix_7.triggered.connect(self.Pixel_7)

        pix_9 = QAction("9px", self)
        b_size.addAction(pix_9)
        pix_9.triggered.connect(self.Pixel_9)

        pix_12 = QAction("12px", self)
        b_size.addAction(pix_12)
        pix_12.triggered.connect(self.Pixel_12)

    # method for checking mouse clicks
    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            self.drawing = True
            self.lastPoint = event.pos()

    # method for tracking mouse activity
    def mouseMoveEvent(self, event):
        if (event.buttons() & Qt.LeftButton) & self.drawing:
            painter = QPainter(self.image)

            # set the pen of the painter
            painter.setPen(QPen(self.brushColor, self.brushSize,
                                Qt.SolidLine, Qt.RoundCap, Qt.RoundJoin))

            # draw line from the last point of cursor to the current point
            # this will draw only one step
            painter.drawLine(self.lastPoint, event.pos())

            # change the last point
            self.lastPoint = event.pos()
            # update
            self.update()

    # method for mouse left button release
    def mouseReleaseEvent(self, event):
        if event.button() == Qt.LeftButton:
            # make drawing flag false
            self.drawing = False

    # paint event
    def paintEvent(self, event):
        # create a canvas
        canvasPainter = QPainter(self)

        # draw rectangle  on the canvas
        canvasPainter.drawImage(self.rect(), self.image, self.image.rect())

    # method for saving canvas
    def save(self):
        filePath, _ = QFileDialog.getSaveFileName(self, "Save Image", "",
                                                  "PNG(*.png);;JPEG(*.jpg *.jpeg);;All Files(*.*) ")

        if filePath == "":
            return
        self.image.save(filePath)

    # method for clearing every thing on canvas
    def clear(self):
        self.image.fill(Qt.white)
        self.label.setText("")
        self.update()

    # methods for detecting image
    def detect_spiral(self):
        # save temporary image
        self.image.save('temp.png', 'png')
        # make predictions from image
        pred = predict_image('temp.png', spiralModel)
        # output predictions red for parkinson's green for healthy
        self.label.setText(pred)
        self.label.setStyleSheet(
            "color: green;") if pred == "Healthy" else self.label.setStyleSheet("color: red;")

    def detect_wave(self):
        # save temporary image
        self.image.save('temp.png', 'png')
        # make predictions from image
        pred = predict_image('temp.png', waveModel)
        # output predictions red for parkinson's green for
        self.label.setText(pred)
        self.label.setStyleSheet(
            "color: green;") if pred == "Healthy" else self.label.setStyleSheet("color: red;")

    # methods for changing pixel sizes
    def Pixel_4(self):
        self.brushSize = 4

    def Pixel_7(self):
        self.brushSize = 7

    def Pixel_9(self):
        self.brushSize = 9

    def Pixel_12(self):
        self.brushSize = 12


# create pyqt5 app
App = QApplication(sys.argv)
window = Window()
window.show()

# start the app
sys.exit(App.exec())
