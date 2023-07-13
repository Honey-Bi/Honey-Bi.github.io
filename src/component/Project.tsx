import Header from './Header';
import '../css/project.css';
import { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';

function Project() {
    const [play, setPlay] = useState<boolean>(true);
    const [direction, setDirection] = useState<number>(0);
    const [count, setCount] = useState<number>(20);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
        slide[direction].classList.add('active');
        const round:HTMLElement = document.getElementById('round') as HTMLElement;
        const fill:HTMLElement = document.getElementById('fill') as HTMLElement;
        round.classList.remove('round');
        fill.classList.remove('fill');
        void round.offsetWidth; 
        void fill.offsetWidth; 
        round.classList.add('round');
        fill.classList.add('fill');
        setCount(20)
    },[direction]);

    useEffect(() => {
        if(count <= 0 ) {
            next()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    useEffect(() => {
        if(play) {
            timerRef.current = setInterval(elapsed, 500);
        } else {
            clearInterval(timerRef.current as NodeJS.Timer)
        }
        return () => clearInterval(timerRef.current as NodeJS.Timer);
    }, [play]);

    const elapsed = () => {
        setCount((prev) => prev-1);
    }
    const PP = () => {
        setPlay((prev) => !prev);
    }
    const next = () => {
        const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
        if (direction < slide.length-1) {
            slide[direction].classList.remove('active');
            setDirection((next) => next + 1);
        }
    }
    const prev = () => {
        if (direction > 0) {
            const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
            slide[direction].classList.remove('active');
            setDirection((prev) => prev - 1);
        }
    }

    function moveWheel(e: any): void {
        if (e.deltaY > 0) {
            next();
        } else if (e.deltaY < 0) {
            prev();
        }
    }

    return (
        <div id='main'>
            <Header/>
            <div id="down">
                <div className="wrap" onWheel={e => moveWheel(e)}>
                    <div className="slide" style={{
                        transform: `translateX(calc(12.5rem*${direction}*-2.45))`
                    }}>
                        <div className="slide-item">
                        {/* <Link to={'/Project/1'}> */}
                            <div className="album">
                                <span className="album-title">test1</span>
                            </div>
                        {/* </Link> */}
                            <div className="record" ></div>
                        </div>
                        <div className="slide-item">
                            <div className="album"></div>
                            <div className="record"></div>
                        </div>
                        <div className="slide-item">
                            <div className="album"></div>
                            <div className="record"></div>
                        </div>
                        <div className="slide-item">
                            <div className="album"></div>
                            <div className="record"></div>
                        </div>
                    </div>
                </div>
                <div className="controller">
                    <div className="btn-group">
                        <button onClick={prev}>
                            <i className="fa-solid fa-backward"></i>
                        </button>
                        <button className={play?'active':''} onClick={PP}>
                            <i className="fa-solid fa-pause"></i>
                            <i className="fa-solid fa-play"></i>
                        </button>
                        <button onClick={next}>
                            <i className="fa-solid fa-forward"></i>
                        </button>
                    </div>
                    <div className={play?'timer':'timer active'}>
                        <div id='round' className="round"></div>
                        <div id='fill' className="fill"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Project;