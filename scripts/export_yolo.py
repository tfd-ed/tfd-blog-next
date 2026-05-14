#!/usr/bin/env python3
"""
YOLO11 to ONNX Converter
Exports YOLO11 models to ONNX format for browser deployment
"""

import argparse
from pathlib import Path

try:
    from ultralytics import YOLO
    import onnx
except ImportError:
    print("Error: Required packages not installed.")
    print("Please run: pip install ultralytics onnx")
    exit(1)


def export_yolo_to_onnx(
    model_name: str = "yolo11n.pt",
    output_dir: str = "./public/models",
    img_size: int = 640,
    simplify: bool = True,
    opset: int = 17
):
    """
    Export YOLO11 model to ONNX format
    
    Args:
        model_name: Name of the YOLO model (e.g., 'yolo11n.pt', 'yolo11s.pt')
        output_dir: Directory to save the ONNX model
        img_size: Input image size (default: 640)
        simplify: Whether to simplify the model (default: True)
        opset: ONNX opset version (default: 17)
    """
    print(f"Loading YOLO11 model: {model_name}")
    
    try:
        # Load model
        model = YOLO(model_name)
        
        print(f"Exporting to ONNX format...")
        print(f"  - Input size: {img_size}x{img_size}")
        print(f"  - ONNX opset: {opset}")
        print(f"  - Simplify: {simplify}")
        
        # Export to ONNX
        model.export(
            format='onnx',
            imgsz=img_size,
            simplify=simplify,
            dynamic=False,  # Static shape for better browser performance
            opset=opset
        )
        
        # Get the output filename
        model_path = Path(model_name)
        onnx_filename = model_path.stem + '.onnx'
        
        # Create output directory if it doesn't exist
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        # Move the ONNX file to the output directory
        import shutil
        onnx_file = Path(onnx_filename)
        if onnx_file.exists():
            destination = output_path / onnx_filename
            shutil.move(str(onnx_file), str(destination))
            print(f"\n✓ Model exported successfully!")
            print(f"  Location: {destination}")
            print(f"  Size: {destination.stat().st_size / 1024 / 1024:.2f} MB")
            
            # Validate the ONNX model
            print(f"\nValidating ONNX model...")
            onnx_model = onnx.load(str(destination))
            onnx.checker.check_model(onnx_model)
            print("✓ ONNX model is valid!")
            
            # Print model info
            print(f"\nModel Information:")
            print(f"  - IR Version: {onnx_model.ir_version}")
            print(f"  - Opset: {onnx_model.opset_import[0].version}")
            print(f"  - Inputs: {[i.name for i in onnx_model.graph.input]}")
            print(f"  - Outputs: {[o.name for o in onnx_model.graph.output]}")
            
            return str(destination)
        else:
            print(f"Error: ONNX file not found: {onnx_filename}")
            return None
            
    except Exception as e:
        print(f"Error during export: {e}")
        return None


def main():
    parser = argparse.ArgumentParser(
        description="Export YOLO11 model to ONNX format for browser deployment"
    )
    parser.add_argument(
        "--model",
        type=str,
        default="yolo11n.pt",
        help="YOLO model name (e.g., yolo11n.pt, yolo11s.pt, yolo11m.pt)"
    )
    parser.add_argument(
        "--output",
        type=str,
        default="./public/models",
        help="Output directory for ONNX model"
    )
    parser.add_argument(
        "--size",
        type=int,
        default=640,
        help="Input image size (default: 640)"
    )
    parser.add_argument(
        "--no-simplify",
        action="store_true",
        help="Don't simplify the model"
    )
    parser.add_argument(
        "--opset",
        type=int,
        default=17,
        help="ONNX opset version (default: 17)"
    )
    
    args = parser.parse_args()
    
    print("=" * 60)
    print("YOLO11 to ONNX Converter")
    print("=" * 60)
    
    export_yolo_to_onnx(
        model_name=args.model,
        output_dir=args.output,
        img_size=args.size,
        simplify=not args.no_simplify,
        opset=args.opset
    )
    
    print("\nNext steps:")
    print("1. Start the dev server: pnpm dev")
    print("2. Navigate to: http://localhost:3000/playrooms/object-detection")
    print("3. Test the model with your webcam or uploaded images")
    print("=" * 60)


if __name__ == "__main__":
    main()
