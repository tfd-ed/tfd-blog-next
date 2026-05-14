# YOLO11 Object Detection Setup Guide

This guide explains how to set up YOLO11 for browser-based object detection using ONNX Runtime Web.

## Prerequisites

- Node.js and pnpm installed
- Python 3.8+ (for model conversion)
- Git

## Step 1: Install Dependencies

The required packages are already installed:
```bash
pnpm add onnxruntime-web remark-math rehype-katex
```

## Step 2: Export YOLO11 to ONNX Format

You need to convert YOLO11 from PyTorch to ONNX format:

### Install Ultralytics

```bash
pip install ultralytics onnx
```

### Export the Model

```python
from ultralytics import YOLO

# Load YOLO11n (nano) model - the smallest and fastest
model = YOLO('yolo11n.pt')

# Export to ONNX format
model.export(
    format='onnx',
    imgsz=640,  # Input image size
    simplify=True,  # Simplify the model
    dynamic=False,  # Static input shape for better browser performance
    opset=17  # ONNX opset version
)
```

This will create a `yolo11n.onnx` file.

### Alternative: Use Pre-trained Models

Download pre-exported ONNX models from:
- [Ultralytics GitHub Releases](https://github.com/ultralytics/ultralytics/releases)
- [ONNX Model Zoo](https://github.com/onnx/models)

## Step 3: Place the Model File

Create a `public/models` directory and place your ONNX model:

```bash
mkdir -p public/models
mv yolo11n.onnx public/models/
```

Your file structure should look like:
```
public/
  models/
    yolo11n.onnx
```

## Step 4: Update the Detection Code

In `app/pages/playrooms/object-detection.vue`, update the model path:

```typescript
// Change this line:
const modelPath = '/models/yolo11n.onnx'

// Remove the error throw and uncomment:
session = await ort.InferenceSession.create(modelPath, {
    executionProviders: ['wasm']
})
```

## Step 5: Configure Model Input/Output

YOLO11 typically expects:
- **Input**: `[1, 3, 640, 640]` - NCHW format (Batch, Channels, Height, Width)
- **Output**: `[1, 84, 8400]` - Detections (Batch, Features, Anchors)

Features include: `[x, y, w, h, class_scores...]` (80 classes for COCO dataset)

## Model Variants

Different YOLO11 variants offer trade-offs between speed and accuracy:

| Model | Size | mAP | Speed (CPU) | Recommended Use |
|-------|------|-----|-------------|-----------------|
| YOLO11n | ~6MB | 39.5 | ~40ms | **Browser (Recommended)** |
| YOLO11s | ~22MB | 47.0 | ~80ms | Browser with good hardware |
| YOLO11m | ~49MB | 51.5 | ~150ms | Desktop applications |
| YOLO11l | ~86MB | 53.4 | ~250ms | Server-side |
| YOLO11x | ~137MB | 54.7 | ~400ms | Maximum accuracy |

For browser deployment, **YOLO11n (nano)** is highly recommended.

## Performance Optimization

### 1. Use WebAssembly with SIMD
```typescript
ort.env.wasm.numThreads = 4
ort.env.wasm.simd = true
```

### 2. Reduce Input Resolution
```typescript
// Use 416x416 or 320x320 for faster inference
const modelWidth = 416
const modelHeight = 416
```

### 3. Increase Confidence Threshold
```typescript
const confidenceThreshold = 0.6  // Higher = fewer but more confident detections
```

### 4. Optimize Canvas Rendering
```typescript
// Use requestAnimationFrame for smooth rendering
// Skip frames if inference is slower than display
```

## Troubleshooting

### Error: "Model file not found"
- Ensure the model is in `public/models/yolo11n.onnx`
- Check the file path in your code
- Verify the file is accessible at `http://localhost:3000/models/yolo11n.onnx`

### Error: "Invalid model format"
- Ensure you exported with ONNX opset 17 or compatible version
- Try simplifying the model during export
- Validate the ONNX file: `python -m onnx.tools.check_model yolo11n.onnx`

### Slow Performance
- Use YOLO11n instead of larger variants
- Reduce input resolution
- Check if WebAssembly SIMD is enabled
- Consider using fewer detection anchors

### Wrong Detections
- Check if preprocessing matches training (normalization, color space)
- Verify class names match the training dataset
- Adjust confidence and IoU thresholds

## Testing Your Setup

1. Start the development server:
```bash
pnpm dev
```

2. Navigate to: `http://localhost:3000/playrooms/object-detection`

3. Click "Start Webcam" or "Upload Image"

4. You should see bounding boxes around detected objects

## Advanced: Custom Model Training

To train on your own dataset:

```python
from ultralytics import YOLO

# Load a pre-trained model
model = YOLO('yolo11n.pt')

# Train on custom dataset
model.train(
    data='custom_dataset.yaml',
    epochs=100,
    imgsz=640,
    batch=16
)

# Export to ONNX
model.export(format='onnx', simplify=True)
```

Dataset YAML format:
```yaml
path: /path/to/dataset
train: images/train
val: images/val

names:
  0: class1
  1: class2
  2: class3
```

## Resources

- [Ultralytics YOLO Documentation](https://docs.ultralytics.com/)
- [ONNX Runtime Web](https://onnxruntime.ai/docs/tutorials/web/)
- [YOLO11 Paper](https://arxiv.org/abs/2304.00501)

## Notes

- The current implementation includes mock detections for demonstration
- Replace mock detections with actual ONNX inference once model is loaded
- Browser support: Chrome, Edge, Safari (WebAssembly required)
- HTTPS required for webcam access in production

## Next Steps

1. Export and add your YOLO11 model
2. Test with different confidence thresholds
3. Optimize for your specific use case
4. Deploy to production with proper model hosting
