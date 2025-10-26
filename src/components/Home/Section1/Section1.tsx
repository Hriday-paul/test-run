import React from 'react'
import heroImg from "../../../../public/hero.jpg"
import HeroTitle from './HeroTitle'

function Section1() {
    return (
        <div className='h-screen relative bg-[url("/hero.jpg")] bg-no-repeat bg-cover bg-center'>
            <div className='h-full bg-black/10 z-50'>
                <div className='container flex items-center h-full'>
                    <HeroTitle line1='Buy, Sell & Services —' />
                </div>
            </div>
        </div>
    )
}

export default Section1