function App() {
    return (
        <React.Fragment>
            <Header />
            <Meme />
        </React.Fragment>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
);