const DEFAULT_TXT = 'nodata';
const text = process.env.REACT_WORDLE ?? DEFAULT_TXT;

function Wordle() {
    return (
        <div>
            <p>{text}</p>
        </div>
    );
}

export default Wordle;