import Image from 'next/image';

const Pagetop = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return (
        <div className='py-8 md:py-10 lg:py-12 xl:py-16 w-full bg-zinc-100 relative'>
            <div className='container px-5 h-full text-center space-y-2'>
                {children}
                <h3 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-figtree font-bold text-black text-center">{title}</h3>
            </div>

        </div>
    );
};

export default Pagetop