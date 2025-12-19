
import {
    useKeenSlider,
    KeenSliderPlugin,
    KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MutableRefObject, useState } from "react";
import Image from "next/image";
import { placeHolderBlurImg } from "@/utils/config";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

import { BsArrowsFullscreen } from "react-icons/bs";

function ThumbnailPlugin(
    mainRef: MutableRefObject<KeenSliderInstance | null>,
): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active");
            });
        }
        function addActive(idx: number) {
            slider.slides[idx].classList.add("active");
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx);
                });
            });
        }

        slider.on("created", () => {
            if (!mainRef.current) return;
            addActive(slider.track.details.rel);
            addClickEvents();
            mainRef.current.on("animationStarted", (main) => {
                removeActive();
                const next = main.animator.targetIdx || 0;
                addActive(main.track.absToRel(next));
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
            });
        });
    };
}


function DetailsCarousel({ images }: { images: { key: string, url: string }[] }) {
    const [open, setOpen] = useState(false);
    
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
    });
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: "auto",
                spacing: 5,
            },
        },
        [ThumbnailPlugin(instanceRef)],
    );

    return (
        <div>
            <div className="flex-1">
                {/* _________________________ Product Images Carousel __________________ */}

                <div className="flex-1 w-full bg-white relative">
                    <div
                        ref={sliderRef}
                        className="keen-slider mx-auto relative h-72 md:h-96 lg:h-[450px] w-full rounded-lg"
                    >
                        {images.map((image, idx) => (
                            <div
                                key={idx}
                                className="keen-slider__slide relative "
                            >
                                <Image
                                    src={image.url}
                                    alt="product_image"
                                    fill
                                    placeholder="blur"
                                    blurDataURL={placeHolderBlurImg}
                                    className="object-contain h-auto w-auto"
                                // sizes="(max-width: 768px) 100vw, 1000px"
                                />
                            </div>
                        ))}
                    </div>

                    <button className="absolute top-0 right-0 text-white p-1.5 md:p-2 cursor-pointer bg-primary rounded-bl-md" onClick={()=>setOpen(true)}>
                        <BsArrowsFullscreen className="text-md md:text-lg lg:text-xl"/>
                    </button>

                </div>

                {/* thumbnail  images  */}

                <div
                    ref={thumbnailRef}
                    className="thumbnail thumbnail-image mx-auto mt-2 flex w-full flex-wrap"
                >
                    {images?.map((image, idx) => (
                        <div key={idx} className="h-14 md:h-16 lg:h-20 w-14 md:w-16 lg:w-20 relative keen-slider__slide slider-image m-0.5">
                            <Image
                                src={image?.url}
                                alt="product_image"
                                fill
                                placeholder="blur"
                                blurDataURL={placeHolderBlurImg}
                                className={`rounded border border-gray-200 object-contain cursor-pointer p-0.5`}
                            ></Image>
                        </div>
                    ))}

                </div>

                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={images?.map(i => ({src : i?.url}))}
                    plugins={[Fullscreen, Zoom]}
                    carousel={{ finite: true, }}
                    
                />

            </div>
        </div>
    )
}

export default DetailsCarousel