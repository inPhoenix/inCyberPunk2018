import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import './App.css'

const app = new Clarifai.App({
  apiKey: '$secret'
});

const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    console.log('%c event', 'background:black;color:DarkSlateGray;', event.target.value)
    this.setState({
      input: event.target.value
    })
  }

  onButtonSubmit = () => {
    console.log('%c click', 'background:black;color:DarkSlateGray;')
    this.setState({
      imageUrl: this.state.input
    })

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {

        const data = response.outputs[0].data.regions[0].region_info
        console.log('%c response', 'background:black;color:DarkSlateGray;',data.bounding_box)
        // do something with response
      },
      function(err) {
        // there was an error
      }
    );

  }

  render () {
    const img = 'https://samples.clarifai.com/face-det.jpg'
    return (
      <div className="App">
        <Particles
          params={particlesOptions}
          className='particles'
        />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition
          imageUrl={this.state.imageUrl}
          img={img}
        />
      </div>
    )
  }
}

export default App
