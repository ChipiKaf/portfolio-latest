import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Scroll, ScrollControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

function App() {
return (
    <Canvas
    camera={ {
        fov: 35,
        near: 0.1,
        far: 100,
        position: [ 3, 5, 15 ]
    } }
    shadows
>
    <ScrollControls pages={0} damping={0.1}>
    <Experience />
    <Scroll html>
        <h1>Hello world</h1>
    </Scroll>
    </ScrollControls>
</Canvas>
)
}

root.render(<App />)