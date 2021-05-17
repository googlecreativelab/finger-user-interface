// TinyML Trainer Example. Version: v003
// Your settings from the TinyML Trainer website has been included in this file
// along with your model (model.h).

#include <Arduino_LSM9DS1.h>
#include <TensorFlowLite.h>
#include <tensorflow/lite/micro/all_ops_resolver.h>
#include <tensorflow/lite/micro/micro_error_reporter.h>
#include <tensorflow/lite/micro/micro_interpreter.h>
#include <tensorflow/lite/schema/schema_generated.h>
#include <tensorflow/lite/version.h>

#include "model.h"

const float accelerationThreshold = 0.181; // threshold of significant in G's
const int numSamples = 25;

int samplesRead = numSamples;


// global variables used for TensorFlow Lite (Micro)
tflite::MicroErrorReporter tflErrorReporter;

// pull in all the TFLM ops, you can remove this line and
// only pull in the TFLM ops you need, if would like to reduce
// the compiled size of the sketch.
tflite::AllOpsResolver tflOpsResolver;

const tflite::Model* tflModel = nullptr;
tflite::MicroInterpreter* tflInterpreter = nullptr;
TfLiteTensor* tflInputTensor = nullptr;
TfLiteTensor* tflOutputTensor = nullptr;

// Create a static memory buffer for TFLM, the size may need to
// be adjusted based on the model you are using
constexpr int tensorArenaSize = 8 * 1024;
byte tensorArena[tensorArenaSize];

// array to map gesture index to a name
const char* GESTURES[] = {
    "left", "right", "poke", "twirl", "pluck"
};

#define NUM_GESTURES (sizeof(GESTURES) / sizeof(GESTURES[0]))

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
        
  Serial.begin(9600);
  while (!Serial);

  // initialize the IMU
  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }

  // print out the samples rates of the IMUs
  Serial.print("Accelerometer sample rate = ");
  Serial.print(IMU.accelerationSampleRate());
  Serial.println(" Hz");
  Serial.print("Gyroscope sample rate = ");
  Serial.print(IMU.gyroscopeSampleRate());
  Serial.println(" Hz");

  Serial.println();

  // get the TFL representation of the model byte array
  tflModel = tflite::GetModel(model);
  if (tflModel->version() != TFLITE_SCHEMA_VERSION) {
    Serial.println("Model schema mismatch!");
    while (1);
  }

  // Create an interpreter to run the model
  tflInterpreter = new tflite::MicroInterpreter(tflModel, tflOpsResolver, tensorArena, tensorArenaSize, &tflErrorReporter);

  // Allocate memory for the model's input and output tensors
  tflInterpreter->AllocateTensors();

  // Get pointers for the model's input and output tensors
  tflInputTensor = tflInterpreter->input(0);
  tflOutputTensor = tflInterpreter->output(0);

}

void loop() {  
  float aX, aY, aZ, gX, gY, gZ;

  // wait for significant motion
  while (samplesRead == numSamples) {
    if (IMU.accelerationAvailable() && IMU.gyroscopeAvailable()) {
      // read the acceleration data
      IMU.readAcceleration(aX, aY, aZ);
      IMU.readGyroscope(gX, gY, gZ);

      // sum up the absolutes
      float average = fabs(aX / 4.0) + fabs(aY / 4.0) + fabs(aZ / 4.0) + fabs(gX / 2000.0) + fabs(gY / 2000.0) + fabs(gZ / 2000.0);
      average /= 6.;

      // check if it's above the threshold
      if (aSum >= accelerationThreshold) {
        // reset the sample read count
        samplesRead = 0;
        break;
      }
    }
  }

  // check if the all the required samples have been read since
  // the last time the significant motion was detected
  while (samplesRead < numSamples) {
    // check if new acceleration AND gyroscope data is available
    if (IMU.accelerationAvailable() && IMU.gyroscopeAvailable()) {
      // read the acceleration and gyroscope data
      IMU.readAcceleration(aX, aY, aZ);
      IMU.readGyroscope(gX, gY, gZ);

      // normalize the IMU data between 0 to 1 and store in the model's
      // input tensor
      tflInputTensor->data.f[samplesRead * 6 + 0] = aX / 4.0;
      tflInputTensor->data.f[samplesRead * 6 + 1] = aY / 4.0;
      tflInputTensor->data.f[samplesRead * 6 + 2] = aZ / 4.0;
      tflInputTensor->data.f[samplesRead * 6 + 3] = gX / 2000.0;
      tflInputTensor->data.f[samplesRead * 6 + 4] = gY / 2000.0;
      tflInputTensor->data.f[samplesRead * 6 + 5] = gZ / 2000.0;

      samplesRead++;

      if (samplesRead == numSamples) {
        // Run inferencing
        TfLiteStatus invokeStatus = tflInterpreter->Invoke();
        if (invokeStatus != kTfLiteOk) {
          Serial.println("Invoke failed!");
          while (1);
          return;
        }

        // Loop through the output tensor values from the model
        int max_index = 0;
        float max_value = 0;
        for (int i = 0; i < NUM_GESTURES; i++) {
          float _value = tflOutputTensor->data.f[i];
          if(_value > max_value){
            max_value = _value;
            max_index = i;
          }
          Serial.print(GESTURES[i]);
          Serial.print(": ");
          Serial.println(tflOutputTensor->data.f[i], 6);
        }
        
        Serial.print("Winner: ");
        Serial.print(GESTURES[max_index]);
        
        Serial.println();
        delay(30);
      }
    }
  }
}