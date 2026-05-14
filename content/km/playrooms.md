---
title: 'How Object Detection Works'
description: 'Understanding the mathematics and theory behind object detection algorithms'
---

# How Object Detection Works: The Mathematics Behind YOLO

Object detection is one of the most exciting applications of deep learning, enabling computers to identify and locate objects within images. Let's dive into the mathematics and concepts that power modern object detection systems like YOLO (You Only Look Once).

## What is Object Detection?

Object detection combines two fundamental computer vision tasks:
1. **Classification**: What objects are in the image?
2. **Localization**: Where are those objects located?

The goal is to output both class labels and bounding box coordinates for each detected object.

## The YOLO Approach

YOLO treats object detection as a single regression problem, directly predicting bounding box coordinates and class probabilities from full images in one evaluation. This makes it extremely fast compared to region-based methods.

### Grid Division

YOLO divides the input image into an $S \times S$ grid. Each grid cell is responsible for detecting objects whose center falls within that cell.

$$
\text{Grid Cell}_{i,j} = \left\{\begin{array}{ll}
\text{responsible for object} & \text{if object center } \in \text{cell}_{i,j} \\
\text{no object} & \text{otherwise}
\end{array}\right.
$$

For YOLO11, typically $S = 20$ or higher, creating a fine-grained grid.

## Bounding Box Representation

Each bounding box is represented by 5 values: $(x, y, w, h, c)$

- $(x, y)$: Center coordinates of the box relative to the grid cell
- $w, h$: Width and height of the box relative to the whole image
- $c$: Confidence score

The confidence is defined as:

$$
c = P(\text{Object}) \times \text{IoU}_{\text{pred}}^{\text{truth}}
$$

Where:
- $P(\text{Object})$ is the probability that the cell contains an object
- $\text{IoU}$ is the Intersection over Union between predicted and ground truth boxes

## Intersection over Union (IoU)

IoU measures the overlap between two bounding boxes:

$$
\text{IoU} = \frac{\text{Area of Overlap}}{\text{Area of Union}} = \frac{A \cap B}{A \cup B}
$$

In this formula, $A$ denotes the predicted box, while $B$ denotes the ground truth box.

The IoU value ranges from 0 (no overlap) to 1 (perfect overlap).

Mathematically, for boxes defined by $(x_1, y_1, x_2, y_2)$:

$$
\text{Overlap Area} = \max(0, \min(x_2^A, x_2^B) - \max(x_1^A, x_1^B)) \times \max(0, \min(y_2^A, y_2^B) - \max(y_1^A, y_1^B))
$$

$$
\text{Union Area} = \text{Area}_A + \text{Area}_B - \text{Overlap Area}
$$

## Class Predictions

Each grid cell also predicts conditional class probabilities:

$$
P(\text{Class}_i | \text{Object})
$$

At test time, we multiply these with the confidence scores:

$$
P(\text{Class}_i | \text{Object}) \times P(\text{Object}) \times \text{IoU}_{\text{pred}}^{\text{truth}} = P(\text{Class}_i) \times \text{IoU}_{\text{pred}}^{\text{truth}}
$$

This gives us class-specific confidence scores for each box.

## The Loss Function

YOLO uses a multi-part loss function that balances localization, confidence, and classification errors:

$$
\mathcal{L} = \mathcal{L}_{\text{box}} + \mathcal{L}_{\text{obj}} + \mathcal{L}_{\text{cls}}
$$

### 1. Bounding Box Loss

For boxes containing objects:

$$
\mathcal{L}_{\text{box}} = \lambda_{\text{coord}} \sum_{i=0}^{S^2} \sum_{j=0}^{B} \mathbb{1}_{ij}^{\text{obj}} \left[(x_i - \hat{x}_i)^2 + (y_i - \hat{y}_i)^2 + (\sqrt{w_i} - \sqrt{\hat{w}_i})^2 + (\sqrt{h_i} - \sqrt{\hat{h}_i})^2\right]
$$

Where:
- $\mathbb{1}_{ij}^{\text{obj}}$ indicates if object appears in cell $i$, box $j$
- $\lambda_{\text{coord}}$ is a weight factor (typically 5)
- Square roots are used for width/height to reduce sensitivity to size

### 2. Objectness Loss

$$
\mathcal{L}_{\text{obj}} = \sum_{i=0}^{S^2} \sum_{j=0}^{B} \left[\mathbb{1}_{ij}^{\text{obj}}(C_i - \hat{C}_i)^2 + \lambda_{\text{noobj}}\mathbb{1}_{ij}^{\text{noobj}}(C_i - \hat{C}_i)^2\right]
$$

Where:
- $C_i$ is the confidence score
- $\lambda_{\text{noobj}}$ (typically 0.5) reduces the weight of no-object predictions

### 3. Classification Loss

$$
\mathcal{L}_{\text{cls}} = \sum_{i=0}^{S^2} \mathbb{1}_{i}^{\text{obj}} \sum_{c \in \text{classes}} (p_i(c) - \hat{p}_i(c))^2
$$

Where $p_i(c)$ is the conditional class probability for class $c$ in cell $i$.

## Non-Maximum Suppression (NMS)

YOLO predicts multiple bounding boxes per object. NMS removes duplicate detections:

**Algorithm:**
1. Sort all boxes by confidence score
2. Select the box with highest confidence
3. Remove all boxes with $\text{IoU} > \theta$ (typically $\theta = 0.5$)
4. Repeat until all boxes are processed

Mathematically, for each class $c$:

$$
\text{Keep box } B_i \text{ if } \forall j > i: \text{IoU}(B_i, B_j) < \theta \text{ or } c_i \neq c_j
$$

## Anchor Boxes

Modern YOLO variants use anchor boxes - predefined boxes with specific aspect ratios. Instead of predicting absolute coordinates, the network predicts offsets from these anchors:

$$
b_x = \sigma(t_x) + c_x
$$
$$
b_y = \sigma(t_y) + c_y
$$
$$
b_w = p_w e^{t_w}
$$
$$
b_h = p_h e^{t_h}
$$

Where:
- $(t_x, t_y, t_w, t_h)$ — network predictions
- $(c_x, c_y)$ — top-left corner of grid cell
- $(p_w, p_h)$ — anchor box dimensions
- $\sigma$ — sigmoid function

## Network Architecture

YOLO11 uses a Convolutional Neural Network (CNN) backbone:

$$
\text{Input Image} \xrightarrow{\text{CNN Backbone}} \text{Feature Maps} \xrightarrow{\text{Detection Head}} \text{Predictions}
$$

The network learns hierarchical features:
- **Early layers**: Basic features (edges, colors)
- **Middle layers**: Object parts (eyes, wheels)
- **Deep layers**: Complete objects (faces, cars)

Each convolutional layer applies:

$$
y_{i,j} = \sigma\left(\sum_{m}\sum_{n} w_{m,n} \cdot x_{i+m, j+n} + b\right)
$$

Where $w$ is the filter, $x$ is input, $b$ is bias, and $\sigma$ is the activation function (typically ReLU or SiLU).

## Performance Metrics

### Mean Average Precision (mAP)

The standard metric for object detection:

$$
\text{mAP} = \frac{1}{N} \sum_{i=1}^{N} \text{AP}_i
$$

Where $\text{AP}_i$ is the Average Precision for class $i$, computed as:

$$
\text{AP} = \int_{0}^{1} p(r) \, dr
$$

With $p(r)$ being the precision at recall $r$.

### Precision and Recall

$$
\text{Precision} = \frac{TP}{TP + FP} \quad \text{Recall} = \frac{TP}{TP + FN}
$$

Where:
- $TP$ = True Positives (correct detections)
- $FP$ = False Positives (incorrect detections)
- $FN$ = False Negatives (missed objects)

## Practical Considerations

### Input Preprocessing

Images are resized to a fixed size (e.g., 640×640) and normalized:

$$
x_{\text{normalized}} = \frac{x - \mu}{\sigma}
$$

Where $\mu$ and $\sigma$ are mean and standard deviation of the dataset.

### Data Augmentation

Training uses augmentation to improve robustness:
- Random scaling: $s \sim U(0.8, 1.2)$
- Random rotation: $\theta \sim U(-15°, 15°)$
- Color jittering: HSV adjustments

## Conclusion

Object detection combines classification and localization through:
1. **Grid-based prediction** for spatial organization
2. **IoU metrics** for box quality assessment
3. **Multi-task loss** for end-to-end training
4. **NMS** for duplicate removal
5. **Anchor boxes** for better localization

YOLO's single-shot approach makes it one of the fastest object detection algorithms, suitable for real-time applications while maintaining high accuracy.

---

## References

- Redmon, J., et al. (2016). "You Only Look Once: Unified, Real-Time Object Detection"
- Bochkovskiy, A., et al. (2020). "YOLOv4: Optimal Speed and Accuracy of Object Detection"
- Ultralytics YOLO11 Documentation

## Try It Yourself!

Use the interactive demo above to see these concepts in action. Watch how the model:
- Divides the image into a grid
- Predicts bounding boxes for each detected object
- Assigns confidence scores and class labels
- Runs in real-time in your browser using ONNX Runtime!
