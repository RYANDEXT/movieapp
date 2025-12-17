import { IoClose } from 'react-icons/io5';
import useFetchDetail from '../hooks/useFetchDetail';

const VideoPlay = ({ data, close, media_type }) => {
    const { data: trailerData } = useFetchDetail(`/${media_type}/${data}/videos`);

    return (
        trailerData && (
            <section className="fixed bg-neutral-700/50 top-0 right-0 bottom-0 left-0 z-40 flex justify-center items-center">
                <div className="bg-black w-full max-h-[80vh] max-w-5xl aspect-video rounded relative">
                    <button
                        onClick={close}
                        className="absolute right-0 -top-8 text-3xl cursor-pointer bg-neutral-300 rounded-full">
                        <IoClose className="text-black" />
                    </button>

                    <iframe
                        src={`https://www.youtube.com/embed/${trailerData?.results[0]?.key}`}
                        className="w-full h-full"
                    />
                </div>
            </section>
        )
    );
};

export default VideoPlay;
