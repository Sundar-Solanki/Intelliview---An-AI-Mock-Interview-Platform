import whisper
import warnings
import sys

warnings.filterwarnings("ignore")

print("Loading model...")
try:
    model = whisper.load_model("base.en")
    print("Model loaded!")
    # Just try to process an empty audio file
    import tempfile, subprocess
    with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as f:
        pass
    print("Creating dummy webm...")
    subprocess.run(["ffmpeg", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", "1", "-c:a", "libopus", "-y", f.name], check=True, capture_output=True)
    
    print("Transcribing...")
    res = model.transcribe(f.name)
    print("Result:", res)
except Exception as e:
    import traceback
    traceback.print_exc()

