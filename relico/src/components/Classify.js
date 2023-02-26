import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";


function Classify() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const modelUrl = "https://teachablemachine.withgoogle.com/models/lWxuLPe-E/";
    const model = await tf.loadLayersModel(modelUrl + "model.json");

    const image = document.getElementById("uploadImage");
    const input = tf.browser.fromPixels(image);
    const resized = tf.image.resizeBilinear(input, [224, 224]);
    const expanded = resized.expandDims();
    const preprocessed = expanded.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));

    const classLabels = ["Temple", "Statue"];
    const predictedClassIndex = (await model.predict(preprocessed).argMax(1).data())[0];
    const predictedClassName = classLabels[predictedClassIndex];
    setPrediction(predictedClassName);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg px-6 py-8 w-1/2">
        <h1 className="text-3xl font-bold text-center mb-8">Image Classifier</h1>
        <div className="flex flex-col items-center mb-8">
          <label htmlFor="fileInput" className="block text-lg font-medium text-gray-700 mb-2">
            Choose an image:
          </label>
          <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded" onClick={() => document.getElementById("fileInput").click()}>
            Select
          </button>
        </div>
        <div className="flex justify-center mb-8">
          {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected" id="uploadImage" className="h-64 object-contain" />}
        </div>
        {prediction !== null && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-medium mb-2">Prediction:</h2>
            <p className="text-lg">{prediction}</p>
          </div>
        )}
        <div className="flex justify-center mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded" onClick={handleFileUpload}>
            Classify
          </button>
        </div>
      </div>
    </div>
  );
}

export default Classify;
