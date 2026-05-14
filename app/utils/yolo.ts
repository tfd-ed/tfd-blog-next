/**
 * YOLO11 Utilities for Object Detection
 * Preprocessing and postprocessing functions for YOLO models
 */

export interface Detection {
    x: number
    y: number
    width: number
    height: number
    confidence: number
    classId: number
    className?: string
}

/**
 * Preprocess image for YOLO model input
 * Resizes and normalizes the image to match model requirements
 */
export function preprocessImage(
    image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    modelWidth: number = 640,
    modelHeight: number = 640
): { data: Float32Array; scale: number; offsetX: number; offsetY: number } {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.width = modelWidth
    canvas.height = modelHeight

    // Calculate scaling to maintain aspect ratio
    const scale = Math.min(modelWidth / image.width, modelHeight / image.height)
    const scaledWidth = image.width * scale
    const scaledHeight = image.height * scale

    // Center the image
    const offsetX = (modelWidth - scaledWidth) / 2
    const offsetY = (modelHeight - scaledHeight) / 2

    // Fill with gray background
    ctx.fillStyle = '#808080'
    ctx.fillRect(0, 0, modelWidth, modelHeight)

    // Draw scaled image
    ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight)

    // Get image data
    const imageData = ctx.getImageData(0, 0, modelWidth, modelHeight)
    const pixels = imageData.data

    // Convert to Float32Array and normalize [0-255] -> [0-1]
    const float32Data = new Float32Array(3 * modelWidth * modelHeight)

    // Convert RGBA to RGB and normalize to [0, 1], then organize as CHW (Channel, Height, Width)
    for (let i = 0; i < modelWidth * modelHeight; i++) {
        const pixelIndex = i * 4
        float32Data[i] = pixels[pixelIndex] / 255.0                           // R channel
        float32Data[modelWidth * modelHeight + i] = pixels[pixelIndex + 1] / 255.0     // G channel
        float32Data[2 * modelWidth * modelHeight + i] = pixels[pixelIndex + 2] / 255.0 // B channel
    }

    return {
        data: float32Data,
        scale,
        offsetX,
        offsetY
    }
}

/**
 * Postprocess YOLO model output
 * Converts raw model predictions to bounding boxes with NMS applied
 */
export function postprocessYOLO(
    output: Float32Array,
    imageWidth: number,
    imageHeight: number,
    modelWidth: number,
    modelHeight: number,
    confidenceThreshold: number = 0.5,
    iouThreshold: number = 0.45,
    classNames: string[]
): Detection[] {
    // YOLO output format is typically [batch, anchors, features]
    // Features: [x, y, w, h, objectness, class_scores...]
    const numClasses = classNames.length
    const numDetections = output.length / (5 + numClasses)

    const detections: Detection[] = []

    // Parse each detection
    for (let i = 0; i < numDetections; i++) {
        const offset = i * (5 + numClasses)

        const x = output[offset]
        const y = output[offset + 1]
        const w = output[offset + 2]
        const h = output[offset + 3]
        const objectness = output[offset + 4]

        // Get class scores
        let maxClassScore = 0
        let maxClassId = 0

        for (let j = 0; j < numClasses; j++) {
            const classScore = output[offset + 5 + j]
            if (classScore > maxClassScore) {
                maxClassScore = classScore
                maxClassId = j
            }
        }

        // Calculate final confidence
        const confidence = objectness * maxClassScore

        if (confidence > confidenceThreshold) {
            detections.push({
                x: x / modelWidth,
                y: y / modelHeight,
                width: w / modelWidth,
                height: h / modelHeight,
                confidence,
                classId: maxClassId,
                className: classNames[maxClassId]
            })
        }
    }

    // Apply Non-Maximum Suppression
    return nonMaximumSuppression(detections, iouThreshold)
}

/**
 * Calculate Intersection over Union (IoU) between two boxes
 */
export function calculateIoU(box1: Detection, box2: Detection): number {
    const x1_min = box1.x - box1.width / 2
    const y1_min = box1.y - box1.height / 2
    const x1_max = box1.x + box1.width / 2
    const y1_max = box1.y + box1.height / 2

    const x2_min = box2.x - box2.width / 2
    const y2_min = box2.y - box2.height / 2
    const x2_max = box2.x + box2.width / 2
    const y2_max = box2.y + box2.height / 2

    // Calculate intersection area
    const intersectionXMin = Math.max(x1_min, x2_min)
    const intersectionYMin = Math.max(y1_min, y2_min)
    const intersectionXMax = Math.min(x1_max, x2_max)
    const intersectionYMax = Math.min(y1_max, y2_max)

    const intersectionWidth = Math.max(0, intersectionXMax - intersectionXMin)
    const intersectionHeight = Math.max(0, intersectionYMax - intersectionYMin)
    const intersectionArea = intersectionWidth * intersectionHeight

    // Calculate union area
    const box1Area = box1.width * box1.height
    const box2Area = box2.width * box2.height
    const unionArea = box1Area + box2Area - intersectionArea

    return intersectionArea / unionArea
}

/**
 * Apply Non-Maximum Suppression to remove overlapping detections
 */
export function nonMaximumSuppression(
    detections: Detection[],
    iouThreshold: number = 0.45
): Detection[] {
    // Sort by confidence (descending)
    const sorted = [...detections].sort((a, b) => b.confidence - a.confidence)
    const selected: Detection[] = []

    while (sorted.length > 0) {
        // Take the detection with highest confidence
        const current = sorted.shift()!
        selected.push(current)

        // Remove overlapping detections
        for (let i = sorted.length - 1; i >= 0; i--) {
            if (sorted[i].classId === current.classId) {
                const iou = calculateIoU(current, sorted[i])
                if (iou > iouThreshold) {
                    sorted.splice(i, 1)
                }
            }
        }
    }

    return selected
}

/**
 * Draw bounding boxes on canvas
 */
export function drawBoundingBoxes(
    ctx: CanvasRenderingContext2D,
    detections: Detection[],
    canvasWidth: number,
    canvasHeight: number,
    colors: string[]
): void {
    detections.forEach((det) => {
        const x = (det.x - det.width / 2) * canvasWidth
        const y = (det.y - det.height / 2) * canvasHeight
        const width = det.width * canvasWidth
        const height = det.height * canvasHeight

        const color = colors[det.classId % colors.length]

        // Draw bounding box
        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.strokeRect(x, y, width, height)

        // Draw label background
        const label = `${det.className || 'Object'} ${(det.confidence * 100).toFixed(1)}%`
        ctx.font = 'bold 16px Arial'
        const textMetrics = ctx.measureText(label)
        const textWidth = textMetrics.width
        const textHeight = 20

        ctx.fillStyle = color
        ctx.fillRect(x, y - textHeight - 5, textWidth + 10, textHeight + 5)

        // Draw label text
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(label, x + 5, y - 8)
    })
}

/**
 * Generate random colors for bounding boxes
 */
export function generateColors(count: number): string[] {
    const colors: string[] = []
    for (let i = 0; i < count; i++) {
        const hue = (i * 137.508) % 360 // Golden angle approximation
        colors.push(`hsl(${hue}, 70%, 50%)`)
    }
    return colors
}
