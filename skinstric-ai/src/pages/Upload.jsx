import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCamera, FaImage } from "react-icons/fa";
import "./Upload.css";

export default function Upload() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const photoUrlRef = useRef(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  // STOP WEBCAM
  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  // OPEN WEBCAM
  async function openCamera() {
    setError("");
    setPhoto(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Your browser does not support camera access.");
      return;
    }

    try {
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraOpen(true);
    } catch (err) {
      console.error("Camera error:", err);

      setError(
        "Unable to access your camera. Please check browser permissions.",
      );
    }
  }

  // CONNECT VIDEO TO WEBCAM
  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;

      videoRef.current.play().catch((err) => {
        console.error("Video playback error:", err);
      });
    }
  }, [cameraOpen]);

  // CLEAN UP WHEN LEAVING PAGE
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  // CAPTURE PHOTO
  function capturePhoto() {
    const video = videoRef.current;

    if (!video || !video.videoWidth) {
      setError("Camera is still loading. Please try again.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setError("Unable to capture photo.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const capturedImage = canvas.toDataURL("image/jpeg", 0.85);

    setPhoto(capturedImage);
    setCameraOpen(false);
    stopCamera();
    setError("");
  }

  // UPLOAD PHOTO FROM GALLERY
  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    stopCamera();
    setCameraOpen(false);
    setError("");

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.onerror = () => {
      setError("Unable to load selected photo.");
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  }

  // RETAKE PHOTO
  function retakePhoto() {
    setPhoto(null);
    openCamera();
  }

  // CHOOSE ANOTHER PHOTO
  function chooseAnother() {
    setPhoto(null);
    setError("");

    fileInputRef.current?.click();
  }

  // CONFIRM PHOTO AND NAVIGATE
  function confirmPhoto() {
    if (!photo) {
      setError("Please take or upload a photo first.");
      return;
    }

    try {
      sessionStorage.setItem("skinstricPhoto", photo);

      stopCamera();

      navigate("/analysis");
    } catch (err) {
      console.error("Photo confirmation error:", err);

      setError("Unable to save your photo. Please try again.");
    }
  }

  return (
    <div className="upload-page">
      {/* HEADER */}
      <header className="navbar">
        <div className="brand">
          <strong>SKINSTRIC</strong>
          <span>[ ANALYSIS ]</span>
        </div>

        <button className="code-btn" type="button">
          ENTER CODE
        </button>
      </header>

      {/* PAGE HEADING */}
      <div className="upload-heading">
        <p>TO START ANALYSIS</p>
      </div>

      {/* CAMERA AND GALLERY OPTIONS */}
      {!cameraOpen && !photo && (
        <main className="upload-content">
          {/* CAMERA OPTION */}
          <div className="upload-choice">
            <div className="upload-diamond">
              <button
                type="button"
                className="upload-icon"
                onClick={openCamera}
                aria-label="Open webcam"
              >
                <FaCamera />
              </button>
            </div>

            <p>ALLOW A.I. TO SCAN YOUR FACE</p>
          </div>

          {/* GALLERY OPTION */}
          <div className="upload-choice">
            <div className="upload-diamond">
              <button
                type="button"
                className="upload-icon"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                aria-label="Upload photo"
              >
                <FaImage />
              </button>
            </div>

            <p>ALLOW A.I. TO ACCESS GALLERY</p>
          </div>
        </main>
      )}

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      {/* LIVE CAMERA PREVIEW */}
      {cameraOpen && (
        <main className="camera-section">
          <h2>POSITION YOUR FACE IN THE FRAME</h2>

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-video"
          />

          <div className="camera-actions">
            <button
              type="button"
              onClick={() => {
                stopCamera();
                setCameraOpen(false);
              }}
            >
              CANCEL
            </button>

            <button type="button" onClick={capturePhoto}>
              <FaCamera />
              CAPTURE PHOTO
            </button>
          </div>
        </main>
      )}

      {/* CAPTURED PHOTO PREVIEW */}
      {photo && (
        <main className="camera-section">
          <h2>PREVIEW YOUR PHOTO</h2>

          <img
            src={photo}
            alt="Captured face preview"
            className="camera-preview"
          />

          <div className="camera-actions">
            <button type="button" onClick={retakePhoto}>
              RETAKE
            </button>

            <button type="button" onClick={chooseAnother}>
              CHOOSE ANOTHER
            </button>

            <button type="button" onClick={confirmPhoto}>
              CONFIRM PHOTO →
            </button>
          </div>
        </main>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <p className="camera-message" role="alert">
          {error}
        </p>
      )}

      {/* FOOTER */}
      <footer className="upload-footer">
        <Link to="/location" className="upload-back" onClick={stopCamera}>
          ← BACK
        </Link>

        <span>CHOOSE A PHOTO TO CONTINUE</span>
      </footer>
    </div>
  );
}
