import React from 'react'
import Maccontainer from './maccontainer'
import {Canvas} from '@react-three/fiber'
import "../css/laptop.css"
import {Environment, OrbitControls, ScrollControls} from '@react-three/drei'

const laptop = () => {
  return (
    <div className='w-full h-screen bg-white'>
        <div className="absolute flex flex-col items-center  text-black top-32 left-1/2 -translate-x-1/2 font-['Helvetica_Now_Display']">
             <h2 className=' masked text-7xl tracking-tighter font-[700] '>Task Hive.</h2>
             <h5>oh start your project !!</h5>
             <p className='text-center w-3/4'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, deserunt sequi labore nesciunt quas veritatis incidunt similique eos voluptatibus necessitatibus expedita natus nemo nulla eum animi, repudiandae, repellendus at maiores!</p>
        </div>
    <Canvas  camera={{fov: 10 , position: [0 , -10 , 220]}}>
       <OrbitControls/>
       <Environment files={['https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/studio_small_09_4k.exr']}/>
       <ScrollControls pages={3}>
       <Maccontainer/>
       </ScrollControls>
    </Canvas>
    </div>
  )
}

export default laptop