import Classify from "./Classify";
import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Map from "./Map";


const listOfPlaces = {
    "temple": "Temples are religious structures that have played a significant role in many cultures throughout history. They serve as places of worship, meditation, and community gathering for people who follow various faiths. Temples are designed with intricate architectural styles, unique symbolism, and decorative elements that represent the beliefs and customs of the people who built them. They are often located in scenic or peaceful settings, such as atop a hill or by a river, to create a serene atmosphere that enhances the spiritual experience. \nTemples serve as important cultural and historical landmarks in many parts of the world. They provide a glimpse into the religious and cultural practices of a particular region, and their architecture and design reflect the cultural influences of the time they were built. Temples often serve as centers for religious festivals, ceremonies, and celebrations, which further strengthens their role in cultural identity. \nTemples also serve as a place of education, where people can learn about their faith, history, and traditions. Many temples have libraries, archives, and schools attached to them, where people can learn about their religion, language, and customs. In addition to their cultural significance, temples also have an economic impact. They attract tourists from all over the world, who come to see the beauty and architectural marvels of these structures. The economic benefits of tourism help support local businesses and create employment opportunities for people living near these temples.\n In summary, temples are much more than just religious structures. They are symbols of cultural identity, architectural marvels, and economic engines. Their significance is felt not only by their followers but also by people from all walks of life who appreciate the beauty, history, and traditions they represent.",
   
    "statue": "Statues have been used as a means of cultural expression for centuries, and they continue to play an important role in today's society. These sculptures represent different cultures, beliefs, values, and historical figures. They have the power to inspire and evoke emotions in people, as well as to educate and inform about a particular culture or event.One of the most significant aspects of statues is their ability to capture the essence of a culture. Statues have been used throughout history to represent the cultural values and beliefs of a society. For example, the statues of ancient Egypt were created to reflect the religious beliefs of the people, with many statues of gods and goddesses. Similarly, the statues of Greece and Rome were created to honor and immortalize their gods and goddesses, as well as famous political and military leaders.Statues are often erected to commemorate significant events or people. They serve as a physical reminder of history and are meant to educate and inform future generations. For example, the Statue of Liberty in New York City was erected as a symbol of freedom and democracy, and it has become an iconic representation of America's values. The Lincoln Memorial in Washington, D.C. serves as a reminder of the country's struggle with slavery and the leadership of President Abraham Lincoln. Statues can also serve as a form of propaganda, particularly in authoritarian regimes. For example, statues of dictators such as Joseph Stalin and Saddam Hussein were erected in their respective countries to promote their cult of personality and reinforce their authority. In contrast, the destruction of these statues during political upheavals is often seen as a symbolic rejection of these regimes. Statues can also be controversial, particularly when they represent historical figures with complex legacies. The debate over Confederate statues in the United States is a prime example of this. While some argue that these statues represent a significant part of American history and should be preserved, others argue that they represent a painful reminder of a dark period of American history and should be removed. In conclusion, statues have played a significant role in cultures throughout history, serving as symbols of cultural values, commemorating significant events and people, and promoting political propaganda. While their significance may vary, statues will continue to shape our cultural landscape for generations to come.",
   
    "parlimentary buildings": "Parliamentary buildings are an important part of a nation's architecture and cultural heritage. These buildings serve as the seat of government and symbolize the sovereignty of the state. They are often designed to reflect the values and aspirations of the nation, and they hold great significance for the people. The architecture and design of parliamentary buildings vary greatly across the world. Some buildings are grand and imposing, while others are more modest and understated. Many are designed to reflect the traditions and culture of the country, while others are more modern and forward-looking. Regardless of their design, parliamentary buildings serve as important landmarks in the cities where they are located. Parliamentary buildings are more than just buildings; they are also symbols of democracy and freedom. These buildings represent the power of the people and the importance of representation. They are where elected officials come together to make decisions that affect the lives of their constituents. The parliamentary system of government is designed to ensure that all voices are heard, and that the needs and desires of the people are taken into account when making decisions. In addition to their political significance, parliamentary buildings also have cultural and historical significance. Many of these buildings are centuries old, and they have witnessed significant events in the nation's history. They are often visited by tourists who want to learn more about the country's past and present. Parliamentary buildings also serve as venues for important ceremonies and events. For example, the Houses of Parliament in the United Kingdom are the site of the State Opening of Parliament, a grand ceremony attended by the monarch and other dignitaries. In many countries, parliamentary buildings are also used for state dinners, receptions, and other official events. Overall, parliamentary buildings are an important part of a nation's cultural heritage. They serve as symbols of democracy and freedom, and they reflect the values and aspirations of the people. They are more than just buildings; they are an integral part of a country's history and identity.",

    "monuments": ""
}

function Demo() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [places, setPlaces] = useState(null);
  
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
  
      const classLabels = ["Temple", "Statue", "Parlimentary Buildings", "Monuments"];
      const predictedClassIndex = (await model.predict(preprocessed).argMax(1).data())[0];
      const predictedClassName = classLabels[predictedClassIndex];
      setPrediction(predictedClassName);
    };


  return (
    <div className="bg-gray-200 min-h-screen">
      <nav className="bg-gray-900  text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Relico</h1>
            </div>
          </div>
        </div>
      </nav>


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow-lg rounded-lg p-6 align-middle h-auto" style={{minHeight: "550px"}}>
          {/* <Classify />
           */}

            <h1 className="text-3xl font-bold text-center mb-8">Relico</h1>
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
          <div className="flex flex-col items-center my-4">
            <h2 className="text-2xl font-bold mt-4 mb-2">Prediction:</h2>
            <p className="text-lg font-medium">{prediction}</p>
            <div className="w-5/6">
                <p className="text-sm mb-10 mt-3">{listOfPlaces[prediction.toLowerCase()]}</p>
            </div>
          </div>
          {/* <Map lat={40.7128} longitude={-74.006} zoom={13} /> */}
          
          <h1 className="text-3xl font-medium text-center mb-8">Places like such around you</h1>
          <Map place={prediction.toLowerCase()}/>
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
