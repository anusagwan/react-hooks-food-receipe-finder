import './App.css';
import { useEffect,useState, useRef} from "react"

function App() {
  const [ingredientList, updateIngredientList] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null);

  const APP_ID = 'd87d7943'
  const APP_KEY = '62724578cb7361f2ff097b0681298997'

  const search = () => {
    searchForRecipe(inputRef.current.value)
    inputRef.current.value =""
  }
  const searchForRecipe = (q) => {
    setLoading(true)
  let url = `https://api.edamam.com/search?q=${q}&app_id=${APP_ID}&app_key=${APP_KEY}`;
      fetch(url).then(resp => {
        return resp.json()
      }).then(res => {
        console.log(res.hits)
        updateIngredientList(res.hits )
        setLoading(false)
      })
        .catch(err => {
        setLoading(false)
      })
  }

  useEffect(() => {
    searchForRecipe('chicken')
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <div className="InputWrapper">
          <input ref={inputRef} placeholder="Search for recipe" />
          <button onClick={search}>Search</button>
        </div>
        {loading &&
          <p>Loading...</p>}
        <div className="Wrapper">
          {ingredientList.map(({ recipe }) => {
            const {label,image,ingredientLines} = recipe
            return (
              <div className="Ingredient" key={recipe.label}>
                <span>{label}</span>
                <img src={image} alt="Food  Recipe"/>
                <div className="Steps">
                {ingredientLines.map((step,index) => {
                  return <p key={index}>{step}</p>
                })}
                  </div>
              </div>
            )
        })}
        </div>
      </header>
    </div>
  );
}

export default App;
