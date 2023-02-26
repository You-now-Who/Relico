import Classify from "./Classify";
import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Map from "./Map";


function Demo() {

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
    <div className="bg-gray-200 h-screen">
      <nav className="bg-gray-900  text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Image Classifier</h1>
            </div>
          </div>
        </div>
      </nav>


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow-lg rounded-lg p-6 align-middle h-auto" style={{minHeight: "550px"}}>
          {/* <Classify />
           */}

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
          {/* {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected" id="uploadImage" className="h-64 object-contain" />} */}

          {selectedFile ? (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" id="uploadImage" className="h-64 object-contain rounded-xl" />
            ) : (
            <img src="https://www.customwallpaper.net.au/wp-content/themes/customwallpaper/images/uploadyourown.png" alt="Placeholder" className="h-64 object-contain rounded-xl" />
            )}
        </div>

        <div className="flex justify-center mt-3">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded" onClick={handleFileUpload}>
            Classify
          </button>
        </div>

        {prediction !== null && (
            <>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mt-4 mb-2">Prediction:</h2>
            <p className="text-lg">{prediction}</p>
          </div>
          <Map lat={40.7128} longitude={-74.006} zoom={13} />
            </>
          
        )}
        

        </div>
        

      </main>
      <footer className="bg-gray-300 text-black font-light text-center py-3 bottom-0">
        <p className="text-sm">&copy; 2023 Relico. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Demo;
