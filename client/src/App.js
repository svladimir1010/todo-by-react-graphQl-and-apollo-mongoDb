import './App.css'

function App() {
    return (
        <div className="container">
            <form>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control" placeholder="Enter title"/>
                </div>
                <div className="mb-3">
                    <label>Detail</label>
                    <input type="text" className="form-control" placeholder="Enter detail"/>
                </div>
                <div className="mb-3">
                    <label>Date</label>
                    <input type="date" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default App
