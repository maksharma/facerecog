import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class CameraComponent extends Component {
  state = {
    faceSquare: {}
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <Camera
          type={Camera.Constants.Type.front}
          style={{ flex: 1, width: "100%" }}
          onFacesDetected={res => {
            console.log(res);
            if (res.faces[0]) {
              console.log(res.faces[0])
              this.setState({
                faceSquare: {
                  width: res.faces[0].bounds.size.width,
                  height: res.faces[0].bounds.size.height,
                  marginLeft: res.faces[0].bounds.origin.x,
                  marginTop: res.faces[0].bounds.origin.y,
                  smillingProbability: res.faces[0].smilingProbability,
                  leftEyeOpenProbability: res.faces[0].leftEyeOpenProbability,
                  rightEyeOpenProbability: res.faces[0].rightEyeOpenProbability,
                  leftEye: res.faces[0].leftEyePosition,
                  rightEye: res.faces[0].rightEyePosition,
                  leftEar: res.faces[0].leftEarPosition,
                  rightEar: res.faces[0].rightEarPosition,
                  nose: res.faces[0].noseBasePosition,
                  mouth: res.faces[0].bottomMouthPosition,
                  leftMouth: res.faces[0].leftMouthPosition,
                }
              });
            }
            if (res.faces.length == 0) {
              this.setState({
                faceSquare: {}
              });
            }
            // else {
            //   this.setState({
            //     faceSquare: {}
            //   });
            // }
          }}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.all,
            runClassifications: FaceDetector.Constants.Classifications.all,
            minDetectionInterval: 100,
            tracking: true
          }}
        >
          {Object.keys(this.state.faceSquare) ? (
            <View>
            {this.state.faceSquare.leftEar &&
              <Image
                style={{
                  position: 'absolute',
                  marginLeft: this.state.faceSquare.leftEar.x-50, 
                  marginTop: this.state.faceSquare.leftEar.y-200
                }}
                source={require('./filters/dogs/left-ear.png')}
              />
            }

            {this.state.faceSquare.rightEar &&
              <Image
                style={{
                  position: 'absolute',
                  marginLeft: this.state.faceSquare.rightEar.x-50, 
                  marginTop: this.state.faceSquare.rightEar.y-200
                }}
                source={require('./filters/dogs/right-ear.png')}
              />
            }

            {this.state.faceSquare.nose &&
              <Image
                style={{
                  width: 80,
                  height: 50,
                  position: 'absolute',
                  marginLeft: this.state.faceSquare.nose.x-50, 
                  marginTop: this.state.faceSquare.nose.y-40
                }}
                source={require('./filters/dogs/nose.png')}
              />
            }

            {this.state.faceSquare.mouth && this.state.faceSquare.smillingProbability < 0.3 &&
              <Image
                style={{
                  position: 'absolute',
                  marginLeft: this.state.faceSquare.mouth.x-70, 
                  marginTop: this.state.faceSquare.mouth.y-30
                }}
                source={require('./filters/dogs/nice_tongue.png')}
              />
            }

            {this.state.faceSquare.mouth && this.state.faceSquare.smillingProbability > 0.5 &&
              <Image
                style={{
                  width: 150,
                  height: 100,
                  position: 'absolute',
                  marginLeft: this.state.faceSquare.leftMouth.x -35, 
                  marginTop: this.state.faceSquare.leftMouth.y - 40
                }}
                source={require('./filters/dogs/dog-smile.png')}
              />
            }

            {this.state.faceSquare.leftEyeOpenProbability < 0.7 && 
              this.state.faceSquare.rightEyeOpenProbability > 0.7 &&
              <Image
                style={{
                  width: 80,
                  height: 40,
                  position: 'absolute',
                  marginLeft: this.state.faceSquare.leftEye.x -40, 
                  marginTop: this.state.faceSquare.leftEye.y - 20
                }}
                source={require('./filters/dogs/eye.png')}
              />
            }

            {this.state.faceSquare.rightEyeOpenProbability < 0.7 && 
              this.state.faceSquare.leftEyeOpenProbability > 0.7 &&
              <Image
                style={{
                  width: 80,
                  height: 40,
                  position: 'absolute',
                  marginLeft: this.state.faceSquare.rightEye.x -40, 
                  marginTop: this.state.faceSquare.rightEye.y - 20
                }}
                source={require('./filters/dogs/eye.png')}
              />
            }
            <View style={{
              position: 'absolute',
              bottom:0,
              left: 0,
              width: '100%'
            }}>
              <View style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <TouchableOpacity><Text>Dog</Text></TouchableOpacity>
                <TouchableOpacity><Text>Pikachu</Text></TouchableOpacity>
                <TouchableOpacity><Text>Rabbit</Text></TouchableOpacity>
              </View>
            </View>
          </View> 
          ) : null}
        </Camera>
      </View>
    );
  }
}