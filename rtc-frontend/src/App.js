
import './App.css';
// import flowers from './public/flowers.png';
// import flowers from './public/3px-tile.png';
import {useState,useEffect} from 'react'
import {colors} from './colors'


function App() {
  const dir=["row","column","row-reverse","column-reverse"]
  const [isSmall, setIsSmall] = useState(false);
  const [direction,setDirection]=useState(1);

  useEffect(() => {
    const checkWidth = () => {
      setIsSmall(window.innerWidth < 400);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  const [tile,setTile]=useState(1);
  const [flip,setFlip]=useState(false);
  useEffect(()=>{

  },[tile]);

  return (
    <div className="App" style={{
      flexDirection:dir[direction],
    }}>
      <h3 className='tileNo'>{isSmall ? "Tile":"Number of Tiles"}:{tile}</h3>
      <button className='add' onClick={()=>{setTile(tile+1)}}>+</button>
      <button className='sub' onClick={()=>{setTile(tile-1)}}>-</button>
      <button className='rotate' onClick={()=>{
        if (direction===4) {
          setDirection(1)
        }
        else{
          setDirection(direction+1)
        }
      }}>@</button>
      {Array.from({ length: tile }).map((_, index) => (
          <Tile key={index} color={colors[index]}></Tile>
      ))}
    </div>
  );
}


export default App;

function Tile({color,index}) {
  const [rotated, setRotated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRotated(true);
    }, 1); 

    return () => clearTimeout(timeout); 
  }, []);
   const atime = `all ${index * 0.2 + 0.3}s`;
  return(
    <div className='tile' style={{
      backgroundColor:color,
      transform: !rotated ? 'rotateX(180deg)' : 'rotateX(0deg)',
      transition: 'transform 1s ease',
    }}></div>
  )
}

