// https://fluentsite.z22.web.core.windows.net/quick-start

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
 return (
  <>
  <header></header>
  <div className="inputField" style={{backgroundColor: 'black', width: '100%', height: "300px"}}>
  <h1 style={{color: 'white'}}><u>Welcome to the message filtering system</u></h1>
  <p style={{color: 'white'}}>What are you looking</p>
  <input type="text" placeholder="Type something here" /><button>Submit</button>
  </div>
  <footer></footer>
  </>
 )
}
