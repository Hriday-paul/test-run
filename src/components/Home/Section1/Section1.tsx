import HeroTitle from './HeroTitle'

function Section1() {
    return (
        <div className='h-72 md:h-96 lg:h-screen relative bg-[url("/hero.png")] bg-no-repeat bg-cover bg-center'>
            <div className='h-full bg-black/60 z-50'>
                <div className='container flex items-center h-full'>
                    <HeroTitle line1='Buy, Sell & Services —' />
                </div>
            </div>
        </div>
    )
}

export default Section1