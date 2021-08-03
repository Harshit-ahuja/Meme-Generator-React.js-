class Meme extends React.Component {
    state = {
        fillColor : "black"
    };

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            this.setState(
                {
                    memesArray : json.data.memes,
                    memeIndex : 0,
                    myCanvas : new fabric.Canvas("Canvas")
                }
            );
        })
    }
    
    render() {
        let textColor = this.state.fillColor;
        return (
            <div className="meme">
                <div className = "options">
                <button 
                    className="gen-btn"
                    onClick={
                        () => {
                            let canvas = document.querySelector("#Canvas");
                            
                            let imageUrl = this.state.memesArray[this.state.memeIndex].url;
                            canvas.style.backgroundImage = `url(${imageUrl})`
                            canvas.style.backgroundSize = "520px 420px"
                            
                            if(this.state.memeIndex == 99) {
                                this.setState({
                                    memeIndex : 0
                                });
                            } else {
                                this.setState({
                                    memeIndex : this.state.memeIndex + 1
                                });
                            }
                        }
                    }> Generate
                </button>
                <button 
                    className = "text-btn"
                    onClick = {
                        () => {                    
                            let text = new fabric.Textbox('Enter Text Here', {
                                width: 200,
                                fill: this.state.fillColor,
                                fontFamily: 'Verdana',
                            });

                            this.state.myCanvas.add(text);       
                        }
                    }
                    >Add Text
                </button>
                <button 
                    className = "rmv-btn"
                    onClick = {
                        () => {
                            let activeObject = this.state.myCanvas.getActiveObject();
                            if (activeObject) {
                                if (confirm('Are you sure?')) {
                                    this.state.myCanvas.remove(activeObject);
                                }
                            }
                        }
                    }>Remove Text
                </button>
                <input 
                    type = "color" 
                    className = "text-color" 
                    onChange = {
                        () => {
                            let input = document.querySelector("input");
                            this.setState({fillColor : input.value});
                        }
                    }/>

                </div>
                <canvas id="Canvas" height = "420" width = "520"></canvas>
                <button 
                    className = "download-btn"
                    onClick = {
                        () => {
                            let c = document.createElement("canvas");
                            c.width = 520;
                            c.height = 420;

                            let canvas = document.querySelector("#Canvas");
                            let url = canvas.toDataURL();
                            let image1 = new Image();
                            image1.src = url;
                            image1.setAttribute("crossorigin", "anonymous");
                            image1.onload = () => {
                                let image2 = new Image();
                                image2.src = this.state.memesArray[this.state.memeIndex - 1].url;
                                image2.setAttribute("crossorigin", "anonymous");
                                image2.onload = () => {
                                    let context = c.getContext('2d');
                                    context.drawImage(image2, 0, 0, c.width, c.height);
                                    context.drawImage(image1, 0, 0, c.width, c.height);
                                    let a = document.createElement("a");
                                    let downloadURL = c.toDataURL();
                                    a.href = downloadURL;
                                    a.download = "meme.png";
                                    a.click();
                                    a.remove();
                                    c.remove();
                                }
                            }     
                        }
                    }>Save
                </button>
            </div>
        )
    }
}