
import {
    useKeenSlider,
    KeenSliderPlugin,
    KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MutableRefObject, useState } from "react";
import Image from "next/image";
import { placeHolderBlurImg } from "@/utils/config";

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
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
    });
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 10,
            },
        },
        [ThumbnailPlugin(instanceRef)],
    );

    return (
        <div>
            <div className="flex-1">
                {/* _________________________ Product Images Carousel __________________ */}

                <div className="flex-1">
                    <div
                        ref={sliderRef}
                        className="keen-slider mx-auto max-h-[600px] w-full rounded-lg"
                    >
                        {images.map((image, idx) => (
                            <Image
                                key={idx}
                                src={image?.url}
                                alt="product_image"
                                placeholder="blur"
                                blurDataURL={placeHolderBlurImg}
                                width={4000}
                                height={4000}
                                className="keen-slider__slide h-[150px] w-[200px] pl-0 md:h-96 md:w-[250px] object-cover"
                            ></Image>
                        ))}
                    </div>
                </div>

                {/* thumbnail  images  */}

                <div
                    ref={thumbnailRef}
                    className="thumbnail thumbnail-image mx-auto mt-2 flex overflow-x-auto w-full"
                >
                    {images?.slice(0, 4)?.map((image, idx) => (
                        <div key={idx} className="w-fit">
                            <Image
                                src={image?.url}
                                alt="product_image"
                                width={4000}
                                height={4000}
                                 placeholder="blur"
                                blurDataURL={placeHolderBlurImg}
                                className={`keen-slider__slide slider-image translate-0 ml-2 h-[80px] rounded border border-black/50 object-cover cursor-pointer`}
                            ></Image>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailsCarousel