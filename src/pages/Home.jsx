import { Canvas } from '@react-three/fiber'
import Experience from '../Experience.jsx'
import { Scroll, ScrollControls } from '@react-three/drei'
import Interface from '../Interface.jsx'


function Home() {
    return (
        <Canvas
        camera={ {
            fov: 35,
            near: 0.1,
            far: 100,
            position: [ 3, 5, 10 ]
        } }
        shadows
    >
        <ScrollControls pages={0} damping={0.1}>
        <Experience />
        <Scroll className="main-scroll" html>
            <Interface />
        </Scroll>
        </ScrollControls>
    </Canvas>
    )
}

export default Home;