import numpy as np
from PIL import Image
from pose_engine import PoseEngine

pil_image = Image.open('couple.jpg')
pil_image.resize((641, 481), Image.NEAREST)

engine = PoseEngine('models/mobilenet/posenet_mobilenet_v1_075_481_641_quant_decoder_edgetpu.tflite')
poses, inference_time = engine.DetectPosesInImage(np.uint8(pil_image))
print('Inference time: %.fms'%inference_time)

for pose in poses:
    if pose.score < 0.4: continue
    print('\nPose Score: ', pose.score)
    for label, keypoint in pose.keypoints.items():
        print(' %-20s x=%-4d y=%-4d score=%.1f'%
              (label, keypoint.yx[1], keypoint.yx[0], keypoint.score))
