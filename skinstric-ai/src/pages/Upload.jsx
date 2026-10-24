import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import "./Upload.css";

/* ==========================================
   CAMERA SHUTTER ICON
========================================== */

function CameraIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="upload-symbol"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="50"
        cy="50"
        r="39"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M50 22 L65 22 L76 41 L60 41 L52 28" />
        <path d="M76 41 L82 53 L71 72 L63 58 L69 46" />
        <path d="M71 72 L63 82 L41 82 L49 68 L63 68" />
        <path d="M41 82 L27 76 L17 58 L33 58 L41 72" />
        <path d="M17 58 L18 44 L29 26 L37 40 L30 53" />
        <path d="M29 26 L41 19 L62 19 L54 33 L40 33" />
      </g>

      <path
        d="M42 37 L58 37 L67 50 L58 63 L42 63 L33 50 Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ==========================================
   GALLERY ICON
========================================== */

function GalleryIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="upload-symbol"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="50"
        cy="50"
        r="39"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle cx="61" cy="34" r="9" fill="currentColor" />

      <path
        d="M18 66 L32 49 Q37 44 42 49
           L55 61 Q60 65 66 60
           L82 47 L82 69
           Q70 84 50 84
           Q30 84 18 66 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ==========================================
   UPLOAD PAGE
========================================== */

export default function Upload() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const requestRef = useRef(0);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [showPermission, setShowPermission] = useState(false);

  /* STOP CAMERA */

  function stopCamera() {
    requestRef.current += 1;

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

  /* OPEN CAMERA */

  async function openCamera() {
    setShowPermission(false);
    setError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Your browser does not support camera access.");
      return;
    }

    stopCamera();

    const currentRequest = requestRef.current;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      if (currentRequest !== requestRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;
      setPhoto(null);
      setCameraOpen(true);
    } catch (err) {
      console.error("Camera error:", err);

      setError(
        "Unable to access your camera. Please check browser permissions.",
      );
    }
  }

  /* CONNECT CAMERA STREAM TO VIDEO */

  useEffect(() => {
    if (!cameraOpen || !videoRef.current || !streamRef.current) {
      return;
    }

    videoRef.current.srcObject = streamRef.current;

    videoRef.current.play().catch((err) => {
      console.error("Video playback error:", err);
    });
  }, [cameraOpen]);

  /* CLEAN UP CAMERA WHEN LEAVING PAGE */

  useEffect(() => {
    return () => {
      requestRef.current += 1;

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });

        streamRef.current = null;
      }
    };
  }, []);

  /* CAPTURE PHOTO */

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

    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const capturedPhoto = canvas.toDataURL("image/jpeg", 0.8);

    setPhoto(capturedPhoto);
    setCameraOpen(false);
    stopCamera();
    setError("");
  }

  /* SELECT PHOTO FROM GALLERY */

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    stopCamera();
    setCameraOpen(false);
    setShowPermission(false);
    setError("");

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhoto(reader.result);
      }
    };

    reader.onerror = () => {
      setError("Unable to load the selected photo.");
    };

    reader.readAsDataURL(file);
  }

  /* RETAKE PHOTO */

  function retakePhoto() {
    openCamera();
  }

  /* CHOOSE ANOTHER PHOTO */

  function chooseAnother() {
    setError("");
    fileInputRef.current?.click();
  }

  /* CONFIRM PHOTO AND CONTINUE */

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

      setError("Unable to save your photo. Try a smaller image.");
    }
  }

  /* CANCEL CAMERA */

  function cancelCamera() {
    stopCamera();
    setCameraOpen(false);
    setError("");
  }

  /* ==========================================
     PAGE JSX
  ========================================== */

  return (
    <div className="upload-page">
      {/* HEADER */}

      <header className="upload-header">
        <div className="upload-brand">
          <Link to="/">SKINSTRIC</Link>
          <span>[ INTRO ]</span>
        </div>

        <button className="upload-code" type="button">
          ENTER CODE
        </button>
      </header>

      {/* HIDDEN GALLERY INPUT */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      {/* INITIAL CAMERA / GALLERY SELECTION */}

      {!cameraOpen && !photo && (
        <>
          <div className="upload-heading">
            <p>TO START ANALYSIS</p>
          </div>

          <aside className="upload-small-preview">
            <span>Preview</span>
            <div className="upload-preview-placeholder" />
          </aside>

          <main className="upload-content">
            {/* CAMERA OPTION */}

            <div className="upload-choice upload-camera-choice">
              <div className="upload-diamond-stack" aria-hidden="true">
                <div className="upload-diamond diamond-one" />
                <div className="upload-diamond diamond-two" />
                <div className="upload-diamond diamond-three" />
              </div>

              <button
                type="button"
                className="upload-icon"
                onClick={() => setShowPermission(true)}
                aria-label="Open camera"
              >
                <CameraIcon />
              </button>

              <div className="upload-camera-label">
                <span className="upload-line" />

                <span>
                  ALLOW A.I.
                  <br />
                  TO SCAN YOUR FACE
                </span>
              </div>
            </div>

            {/* GALLERY OPTION */}

            <div className="upload-choice upload-gallery-choice">
              <div className="upload-diamond-stack" aria-hidden="true">
                <div className="upload-diamond diamond-one" />
                <div className="upload-diamond diamond-two" />
                <div className="upload-diamond diamond-three" />
              </div>

              <button
                type="button"
                className="upload-icon"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Choose image from gallery"
              >
                <GalleryIcon />
              </button>

              <div className="upload-gallery-label">
                <span className="upload-line" />

                <span>
                  ALLOW A.I.
                  <br />
                  ACCESS GALLERY
                </span>
              </div>
            </div>
          </main>
        </>
      )}

      {/* CAMERA PERMISSION MODAL */}

      {showPermission && !cameraOpen && !photo && (
        <div className="upload-modal-overlay">
          <div
            className="upload-permission-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-permission-title"
          >
            <h2 id="upload-permission-title">
              ALLOW A.I. TO ACCESS YOUR CAMERA
            </h2>

            <div className="upload-modal-actions">
              <button type="button" onClick={() => setShowPermission(false)}>
                DENY
              </button>

              <button type="button" onClick={openCamera}>
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIVE CAMERA */}

      {cameraOpen && (
        <main className="camera-section">
          <div className="camera-stage">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="camera-video"
            />

            <div className="camera-overlay">
              <p>POSITION YOUR FACE IN THE FRAME</p>

              <div className="camera-actions">
                <button type="button" onClick={cancelCamera}>
                  CANCEL
                </button>

                <button type="button" onClick={capturePhoto}>
                  <FaCamera />
                  CAPTURE PHOTO
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* PHOTO PREVIEW */}

      {photo && !cameraOpen && (
        <main className="camera-section upload-preview-section">
          <aside className="upload-small-preview">
            <span>Preview</span>

            <img src={photo} alt="Small selected photo preview" />
          </aside>

          <h2>PREVIEW YOUR PHOTO</h2>

          <img
            src={photo}
            alt="Selected photo preview"
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

      {/* BACK BUTTON */}

      <footer className="upload-footer">
        <Link to="/location" className="upload-back" onClick={stopCamera}>
          <span className="upload-arrow-diamond">
            <span className="upload-arrow-left" />
          </span>

          <span>BACK</span>
        </Link>
      </footer>
    </div>
  );
}
