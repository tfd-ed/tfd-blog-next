# Models Directory

This directory is for storing ONNX models for browser-based inference.

## Adding YOLO11 Model

### Option 1: Using the Export Script

```bash
# From the project root
python scripts/export_yolo.py --model yolo11n.pt --output ./public/models
```

### Option 2: Manual Export

```python
from ultralytics import YOLO

# Load YOLO11n model
model = YOLO('yolo11n.pt')

# Export to ONNX
model.export(
    format='onnx',
    imgsz=640,
    simplify=True,
    dynamic=False,
    opset=17
)

# Move yolo11n.onnx to this directory
```

### Option 3: Download Pre-exported Model

Download from:
- [Ultralytics GitHub Releases](https://github.com/ultralytics/ultralytics/releases)
- Official YOLO11 model repository

## Required File

Place your ONNX model here:
```
public/models/yolo11n.onnx
```

## Model Requirements

- **Format:** ONNX (Open Neural Network Exchange)
- **Input:** [1, 3, 640, 640] Float32 tensor
- **Output:** [1, 84, 8400] Float32 tensor
- **Size:** ~6MB for YOLO11n (recommended for browser)

## Testing Your Model

After placing the model here, test it:

1. **Standalone Test:**
   ```
   http://localhost:3000/test-yolo.html
   ```

2. **Full Integration:**
   ```
   http://localhost:3000/playrooms/object-detection
   ```

## .gitignore

Large model files should be excluded from git:
```
# Add to .gitignore
public/models/*.onnx
```

Keep the directory structure but not the large model files in version control.

## Model Variants

Different YOLO11 models you can use:

| File | Size | Speed | Accuracy | Browser? |
|------|------|-------|----------|----------|
| yolo11n.onnx | ~6MB | Fast | Good | ✅ Yes |
| yolo11s.onnx | ~22MB | Medium | Better | ⚠️ Maybe |
| yolo11m.onnx | ~49MB | Slow | Best | ❌ No |

**Recommendation:** Use YOLO11n for browser deployment.

## Notes

- Ensure the model file is accessible at `/models/yolo11n.onnx`
- The server must serve ONNX files with correct MIME type
- Large models may take time to download on slow connections
- Consider using a CDN for production deployment
