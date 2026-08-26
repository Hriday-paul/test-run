import { useEffect, useReducer, useCallback } from "react";
import debounce from "lodash.debounce";

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 500;

type State<T> = {
    loading: boolean;
    currentPage: number;
    data: T[];
    hasMore: boolean;
};

type Action<T> =
    | {
        type: "set";
        payload: Partial<State<T>>;
    }
    | {
        type: "onGrabData";
        payload: {
            data: T[];
            hasMore: boolean;
        };
    };

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
        case "set": {
            return {
                ...state,
                ...action.payload,
            };
        }

        case "onGrabData": {
            return {
                ...state,
                loading: false,
                data: [...state.data, ...action.payload.data],
                currentPage: state.currentPage + 1,
                hasMore: action.payload.hasMore,
            };
        }

        default:
            return state;
    }
};

type GrabDataResult<T> = {
    data: T[];
    hasMore: boolean;
};

type UseLazyLoadProps<T> = {
    triggerRef: React.RefObject<HTMLElement | null>;
    onGrabData: (page: number) => Promise<GrabDataResult<T>>;
    options?: IntersectionObserverInit;
    initialData?: T[];
    initialPage?: number;
    initialHasMore?: boolean;
};

const useLazyLoad = <T,>({
    triggerRef,
    onGrabData,
    options,
    initialData = [],
    initialPage = 1,
    initialHasMore = true,
}: UseLazyLoadProps<T>) => {
    const [state, dispatch] = useReducer(
        reducer<T>,
        {
            loading: false,
            currentPage: initialPage,
            data: initialData,
            hasMore: initialHasMore,
        }
    );

    const _handleEntry = async (entry: IntersectionObserverEntry) => {
        const boundingRect = entry.boundingClientRect;
        const intersectionRect = entry.intersectionRect;

        if (
            !state.loading &&
            state.hasMore &&
            entry.isIntersecting &&
            intersectionRect.bottom - boundingRect.bottom <=
            INTERSECTION_THRESHOLD
        ) {
            dispatch({
                type: "set",
                payload: {
                    loading: true,
                },
            });

            const { data, hasMore } = await onGrabData(state.currentPage);

            dispatch({
                type: "onGrabData",
                payload: {
                    data,
                    hasMore,
                },
            });
        }
    };

    const handleEntry = debounce(_handleEntry, state.currentPage === 1 ? 0 : LOAD_DELAY_MS);

    const onIntersect = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            handleEntry(entries[0]);
        },
        [handleEntry]
    );

    useEffect(() => {
        // Stop observing entirely once there's nothing left to load
        if (!state.hasMore) {
            handleEntry.cancel();
            return;
        }

        if (triggerRef.current) {
            const container = triggerRef.current;

            const observer = new IntersectionObserver(
                onIntersect,
                options
            );

            observer.observe(container);

            return () => {
                observer.disconnect();
            };
        }
    }, [triggerRef, onIntersect, options, state.hasMore]);

    return state;
};

export default useLazyLoad;