import React from 'react';
import NextTopLoader from "nextjs-toploader";

const NextJsTopLoader = () => {
    return (
        <div>
            <NextTopLoader
                color="#e12728" // #F8FAFC
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #65b545,0 0 5px #000"
            />
        </div>
    );
};

export default NextJsTopLoader;