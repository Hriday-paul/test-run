import { ImSpinner8 } from 'react-icons/im'

function Loader() {
    return (
        <div className='min-h-40 flex items-center justify-center'>
            <ImSpinner8 className="text-4xl text-primary animate-spin" />
        </div>
    )
}

export default Loader