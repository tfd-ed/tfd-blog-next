<template>
    <div class="container mx-auto px-4 py-12 max-w-7xl">
        <!-- Header -->
        <div class="mb-8">
            <NuxtLink to="/playrooms" class="inline-flex items-center text-tfd hover:text-tfd/80 mb-4">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Playrooms
            </NuxtLink>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {{ $t('od') }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                {{ $t('od_description') }}
            </p>
        </div>

        <!-- Interactive Demo Section -->
        <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Live Detection Demo</h2>

            <!-- Controls -->
            <div class="flex flex-wrap gap-4 mb-6">
                <button @click="startWebcam" :disabled="isDetecting"
                    class="px-6 py-3 bg-tfd text-white rounded-lg font-semibold hover:bg-tfd/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    {{ isDetecting ? 'Running...' : 'Start Webcam' }}
                </button>
                <button @click="stopDetection" :disabled="!isDetecting"
                    class="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    Stop
                </button>
                <label
                    class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer transition-all">
                    Upload Image
                    <input type="file" @change="handleImageUpload" accept="image/*" class="hidden">
                </label>
            </div>

            <!-- Model Loading Status -->
            <div v-if="modelLoading" class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="flex items-center">
                    <svg class="animate-spin h-5 w-5 mr-3 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span class="text-blue-900 dark:text-blue-200">Loading YOLO11 model... This may take a
                        moment.</span>
                </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage"
                class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p class="text-red-800 dark:text-red-200">{{ errorMessage }}</p>
            </div>

            <!-- Canvas Container -->
            <div class="relative bg-black rounded-lg overflow-hidden" style="min-height: 400px;">
                <video ref="videoElement" class="absolute inset-0 w-full h-full object-contain" autoplay playsinline
                    style="display: none;"></video>
                <canvas ref="canvasElement" class="absolute inset-0 w-full h-full object-contain"></canvas>

                <!-- Placeholder when not active -->
                <div v-if="!isDetecting && !selectedImage" class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center text-gray-400">
                        <svg class="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p class="text-lg">Start webcam or upload an image to begin detection</p>
                    </div>
                </div>
            </div>

            <!-- Detection Stats -->
            <div v-if="detectionStats.fps > 0" class="mt-4 grid grid-cols-3 gap-4">
                <div class="bg-gray-50 dark:bg-neutral-900 rounded-lg p-4">
                    <div class="text-sm text-gray-600 dark:text-gray-400">FPS</div>
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ detectionStats.fps.toFixed(1) }}
                    </div>
                </div>
                <div class="bg-gray-50 dark:bg-neutral-900 rounded-lg p-4">
                    <div class="text-sm text-gray-600 dark:text-gray-400">Objects Detected</div>
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ detectionStats.objectCount }}</div>
                </div>
                <div class="bg-gray-50 dark:bg-neutral-900 rounded-lg p-4">
                    <div class="text-sm text-gray-600 dark:text-gray-400">Inference Time</div>
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">{{
                        detectionStats.inferenceTime.toFixed(0) }}ms</div>
                </div>
            </div>
        </div>

        <!-- Educational Content -->
        <div class="prose prose-lg dark:prose-invert max-w-4xl mx-auto px-12 md:px-16 lg:px-24 py-12">
            <ContentRenderer v-if="content" :value="content" />
            <div v-else class="text-gray-600 dark:text-gray-400">Educational content not found</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as ort from 'onnxruntime-web'

const { data: content } = await useAsyncData(() =>
    queryCollection('content').path('/playrooms/object-detection-theory').first()
)

useSeoMeta({
    title: content.value?.title || 'Object Detection - AI Playrooms',
    description: content.value?.description || 'Real-time object detection using YOLO11 with ONNX Runtime in the browser.'
})

const videoElement = ref<HTMLVideoElement | null>(null)
const canvasElement = ref<HTMLCanvasElement | null>(null)
const isDetecting = ref(false)
const modelLoading = ref(false)
const errorMessage = ref('')
const selectedImage = ref<HTMLImageElement | null>(null)

const detectionStats = ref({
    fps: 0,
    objectCount: 0,
    inferenceTime: 0
})

let session: ort.InferenceSession | null = null
let animationFrameId: number | null = null
let stream: MediaStream | null = null

// COCO class names (80 classes)
const classNames = [
    'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light',
    'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
    'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard',
    'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
    'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
    'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard',
    'cell phone', 'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase',
    'scissors', 'teddy bear', 'hair drier', 'toothbrush'
]

// Colors for bounding boxes
const colors = [
    '#FF3838', '#FF9D97', '#FF701F', '#FFB21D', '#CFD231', '#48F90A', '#92CC17', '#3DDB86', '#1A9334', '#00D4BB',
    '#2C99A8', '#00C2FF', '#344593', '#6473FF', '#0018EC', '#8438FF', '#520085', '#CB38FF', '#FF95C8', '#FF37C7'
]

onMounted(async () => {
    await loadModel()
})

onBeforeUnmount(() => {
    stopDetection()
})

async function loadModel() {
    try {
        modelLoading.value = true
        errorMessage.value = ''

        // Configure ONNX Runtime
        ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.23.0/dist/'

        // Note: You'll need to add a YOLO11n model in ONNX format to your public folder
        // For now, this is a placeholder - you'll need to export YOLO11 to ONNX
        // const modelPath = '/models/yolo11n.onnx'

        // For demonstration, we'll show the error that model needs to be added
        throw new Error('YOLO11 model file needs to be added to /public/models/yolo11n.onnx. Please export YOLO11 to ONNX format and place it there.')

        // session = await ort.InferenceSession.create(modelPath, {
        //     executionProviders: ['wasm']
        // })

        modelLoading.value = false
    } catch (error) {
        modelLoading.value = false
        errorMessage.value = `Failed to load model: ${error.message}. Please ensure the YOLO11 ONNX model is available.`
        console.error('Model loading error:', error)
    }
}

async function startWebcam() {
    try {
        errorMessage.value = ''
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 640 }
            }
        })

        if (videoElement.value && canvasElement.value) {
            videoElement.value.srcObject = stream
            videoElement.value.style.display = 'block'
            isDetecting.value = true
            selectedImage.value = null

            videoElement.value.onloadedmetadata = () => {
                if (canvasElement.value && videoElement.value) {
                    canvasElement.value.width = videoElement.value.videoWidth
                    canvasElement.value.height = videoElement.value.videoHeight
                    detectFrame()
                }
            }
        }
    } catch (error) {
        errorMessage.value = `Failed to access webcam: ${error.message}`
        console.error('Webcam error:', error)
    }
}

function handleImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file && canvasElement.value) {
        const img = new Image()
        img.onload = () => {
            selectedImage.value = img
            if (canvasElement.value) {
                canvasElement.value.width = img.width
                canvasElement.value.height = img.height
                stopDetection()
                detectImage(img)
            }
        }
        img.src = URL.createObjectURL(file)
    }
}

async function detectFrame() {
    if (!isDetecting.value || !videoElement.value || !canvasElement.value) return

    const startTime = performance.now()

    // Draw current frame
    const ctx = canvasElement.value.getContext('2d')
    if (ctx && videoElement.value) {
        ctx.drawImage(videoElement.value, 0, 0, canvasElement.value.width, canvasElement.value.height)

        // Simulate detection (replace with actual ONNX inference)
        // This is a placeholder - actual detection would use the ONNX model
        const mockDetections = generateMockDetections()
        drawDetections(ctx, mockDetections)

        const endTime = performance.now()
        detectionStats.value.inferenceTime = endTime - startTime
        detectionStats.value.fps = 1000 / (endTime - startTime)
        detectionStats.value.objectCount = mockDetections.length
    }

    animationFrameId = requestAnimationFrame(detectFrame)
}

async function detectImage(img: HTMLImageElement) {
    if (!canvasElement.value) return

    const startTime = performance.now()
    const ctx = canvasElement.value.getContext('2d')

    if (ctx) {
        ctx.drawImage(img, 0, 0, canvasElement.value.width, canvasElement.value.height)

        // Simulate detection (replace with actual ONNX inference)
        const mockDetections = generateMockDetections()
        drawDetections(ctx, mockDetections)

        const endTime = performance.now()
        detectionStats.value.inferenceTime = endTime - startTime
        detectionStats.value.objectCount = mockDetections.length
    }
}

function generateMockDetections() {
    // This is a mock function - replace with actual YOLO11 inference
    // Returns random detections for demonstration
    const numDetections = Math.floor(Math.random() * 5) + 1
    return Array.from({ length: numDetections }, () => ({
        x: Math.random() * 0.7 + 0.15,
        y: Math.random() * 0.7 + 0.15,
        width: Math.random() * 0.2 + 0.1,
        height: Math.random() * 0.2 + 0.1,
        confidence: Math.random() * 0.3 + 0.7,
        classId: Math.floor(Math.random() * 20)
    }))
}

function drawDetections(ctx: CanvasRenderingContext2D, detections: any[]) {
    const canvas = canvasElement.value
    if (!canvas) return

    detections.forEach((det) => {
        const x = det.x * canvas.width
        const y = det.y * canvas.height
        const width = det.width * canvas.width
        const height = det.height * canvas.height

        const color = colors[det.classId % colors.length]

        // Draw bounding box
        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.strokeRect(x, y, width, height)

        // Draw label background
        const label = `${classNames[det.classId]} ${(det.confidence * 100).toFixed(1)}%`
        ctx.font = '16px Arial'
        const textWidth = ctx.measureText(label).width
        ctx.fillStyle = color
        ctx.fillRect(x, y - 25, textWidth + 10, 25)

        // Draw label text
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(label, x + 5, y - 7)
    })
}

function stopDetection() {
    isDetecting.value = false

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
    }

    if (stream) {
        stream.getTracks().forEach(track => track.stop())
        stream = null
    }

    if (videoElement.value) {
        videoElement.value.style.display = 'none'
        videoElement.value.srcObject = null
    }

    detectionStats.value = { fps: 0, objectCount: 0, inferenceTime: 0 }
}
</script>

<style scoped>
/* Custom styles for the detection canvas */
canvas {
    max-width: 100%;
    height: auto;
}

video {
    max-width: 100%;
    height: auto;
}
</style>
